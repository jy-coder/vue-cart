import type { Knex } from "knex";

interface KnexConfig {
  [key: string]: object;
}

const defaults = {
  client: "postgresql",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "test",
    database: "cartdb",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

const knexConfig: KnexConfig = {
  development: {
    ...defaults,
  },

  production: {
    ...defaults,
  },
};

export default knexConfig;
