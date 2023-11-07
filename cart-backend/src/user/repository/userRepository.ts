import db from '../../database/db'
import { User } from '../../auth/model/userModel'

class UserRepository {
  async findByEmail(email: string): Promise<User> {
    return await db('users').where('email', email).first()
  }

  async findById(id: number): Promise<User> {
    return await db('users').where('id', id).first()
  }

  async save(user: User): Promise<User> {
    const [dbUser]: User[] = await db<User>('users')
      .returning('id')
      .insert(user)
    return dbUser
  }
}

export default UserRepository
