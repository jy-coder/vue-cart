import db from '../../database/db'
import {
  LoginDto,
  RegisterDto,
  Token,
  User,
  UserInfo
} from '../model/userModel'
import bcrypt from 'bcrypt'
import {
  issueAccessAndRefreshTokens,
  issueAccessToken,
  validateToken
} from '../utils/tokenIssuer'
import AuthRepository from '../repository/authRepository'
import axios from 'axios'
class AuthService {
  private authRepository: AuthRepository

  constructor() {
    this.authRepository = new AuthRepository()
  }

  async login(userData: LoginDto): Promise<UserInfo | null> {
    const { email, password } = userData
    const response = await axios.get(
      `http://localhost:8000/api/v1/user?email=${email}`
    )
    const user = response.data
    if (!user) {
      return null
    }

    const isPasswordValid = await bcrypt.compare(password, user.password || '')

    if (!isPasswordValid) {
      return null
    }

    const { data: roleResponse } = await axios.get(
      `http://localhost:8000/api/v1/role/user/${user.id}`
    )
    const roleIds = roleResponse.roleIds

    const tokens = issueAccessAndRefreshTokens(user)

    if (!tokens) {
      return null
    }
    const { refreshToken, accessToken } = tokens
    const newToken = {
      user_id: user.id ?? 0,
      access_token: accessToken,
      refresh_token: refreshToken
    }
    await this.authRepository.update(newToken)
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      roleIds,
      refreshToken,
      accessToken
    }
  }

  async register(userData: RegisterDto): Promise<User | null> {
    const { username, email, roleIds, password } = userData
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = { username, email, password: hashedPassword }

    const { data: userResponse } = await axios.post(
      'http://localhost:8000/api/v1/user',
      {
        ...newUser
      }
    )

    const { userId } = userResponse
    // const { id } = await this.userRepository.save(newUser)
    if (!userId) {
      return null
    }

    await axios.post('http://localhost:8000/api/v1/role', {
      userId: userId,
      roleIds: roleIds
    })
    // await this.roleRepository.update(id, roleIds)

    const user: User = {
      id: userId,
      username,
      email,
      roleIds
    }

    return user
  }

  async getAccessWithRefresh(token: string): Promise<Token | null> {
    const userId = validateToken(process.env.REFRESH_SECRET_KEY || '', token)
    if (!userId) {
      return null
    }
    const refresh_token = await this.authRepository.findByUserId(Number(userId))

    const response = await axios.get(
      `http://localhost:8000/api/v1/user/${userId}`
    )
    // const user = await this.userRepository.findById(Number(userId))

    const user = response.data

    if (!user) {
      return null
    }

    if (!refresh_token || refresh_token !== token) {
      return null
    }
    const accessToken = issueAccessToken(String(user.id))
    const newToken = {
      user_id: user.id ?? 0,
      access_token: accessToken,
      refresh_token: token
    }
    await this.authRepository.update(newToken)

    if (!accessToken) {
      return null
    }
    return { accessToken }
    // ...user,
  }
}

export default AuthService
