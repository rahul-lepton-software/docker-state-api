import pgPromise from 'pg-promise'; 
import config from '../config/index.js'
//console.log('SQL_DB_TYPE---', config.DB_CONFIG)
config.DB_CONFIG = {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DBNAME,
    user:process.env.DBUSER,
    password:process.env.DBPASSWORD
}
const db = pgPromise()(config.DB_CONFIG)


const getStateList = async () => {
      try {
          let query = `select id as state_id,state_name  from state_master`;
          const result = await db.result(query);
          return result.rows
      } catch (error) {
          throw error
      }
}

const getPeopleByStateId = async (stateID,limit,skip) => {
      try {
          let query = `select gid as id,name,age,state_id from population sp 
          where state_id = $1
          order by gid limit $2 offset $3`;
          const result = await db.result(query,[stateID,limit,skip]);
          return result.rows
      } catch (error) {
          throw error
      }
}



async function insertBatch(tableName, rows) {
    try {
        const query = `INSERT INTO ${tableName} VALUES ${rows};`;
        let result = await db.result(query);
        return result
    } catch (error) {
        throw error
    }
}




export default  {getStateList,getPeopleByStateId,insertBatch}