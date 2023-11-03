import db from '../database/db'
import { LoginDto, RegisterDto, User } from '../models/userModel'
import bcrypt from 'bcrypt'

class AuthService {
  async login(userData: LoginDto): Promise<null | User> {
    const { email, password } = userData
    const user = await db('users').where('email', email).first()

    if (!user) {
      return null
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return null
    }

    const roleRows = await db('user_roles')
      .where('user_id', user.id)
      .select('role_id')

    const roleIds = roleRows.map((row) => row.role_id)

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      roleIds
    }
  }

  async register(userData: RegisterDto): Promise<User | null> {
    const { username, email, password, roleIds } = userData
    const hashedPassword = await bcrypt.hash(password, 10)

    const [dbUser]: User[] = await db<User>('users')
      .returning('id')
      .insert({ username, email, password: hashedPassword })

    const { id } = dbUser
    for (const roleId of roleIds) {
      await db('user_roles').insert({ user_id: id, role_id: roleId })
    }

    const user: User = {
      id,
      username,
      email,
      roleIds
    }

    return user
  }
}

export default AuthService
