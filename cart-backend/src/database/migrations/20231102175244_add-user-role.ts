import { Knex } from 'knex'
import bcrypt from 'bcrypt'
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('roles', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
  })

  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('username').unique().notNullable()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
  })

  await knex.schema.createTable('user_roles', (table) => {
    table.increments('id').primary()
    table.integer('user_id').unsigned().references('id').inTable('users')
    table.integer('role_id').unsigned().references('id').inTable('roles')
  })

  const rolesData = [{ name: 'administrator' }, { name: 'contributor' }]

  await knex('roles').insert(rolesData)
  const hashedPassword = await bcrypt.hash('123456', 10)

  const usersData = [
    {
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword
    },
    {
      username: 'contributor',
      email: 'contributor@example.com',
      password: hashedPassword
    }
  ]

  // Insert users data
  await knex('users').insert(usersData)

  // // Associate users with roles in user_roles table
  const userRolesData = [
    { user_id: 1, role_id: 1 },
    { user_id: 2, role_id: 2 }
  ]

  await knex('user_roles').insert(userRolesData)
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_roles')
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('roles')
}
