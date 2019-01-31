const {env} = process
module.exports = {
  app: {
    port: env.PORT
    requireHttps: true
  }
  database: {
    user: env.PGUSER,
    host: env.PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT,
  }
}

