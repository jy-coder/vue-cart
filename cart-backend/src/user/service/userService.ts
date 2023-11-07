import { User } from '../../auth/model/userModel'
import UserRepository from '../repository/userRepository'

class UserService {
  private userRepository: UserRepository
  constructor() {
    this.userRepository = new UserRepository()
  }

  async createUser(user: User) {
    return await this.userRepository.save(user)
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findByEmail(email)
  }

  async getUserById(id: number) {
    return await this.userRepository.findById(id)
  }
}

export default UserService
