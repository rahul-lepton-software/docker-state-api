
export default  {
      PORT: process.env.PORT,
      DB_CONFIG : {
            host: process.env.DBHOST,
            port: process.env.DBPORT,
            database: process.env.DBNAME,
            user:process.env.DBUSER,
            password:process.env.DBPASSWORD
      },
      REDIS_HOST :process.env.REDISHOST,
      REDIS_PORT :process.env.REDISPORT

}      