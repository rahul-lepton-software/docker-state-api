import config from "../config/index.js";
import sqlDB from "../sqllayer/index.js";
import redisClient from "../cache/index.js";


async function getAllStates(req, res) {
      try {
        const states = await sqlDB.getStateList();
        res.status(200).send({status:200,data:states});
      } catch (error) {  
         console.log(error)   
         res.status(500).send({ message: 'Internal Server Error' });
      }
}



async function getPeopleByState(req, res) {
      let { stateId } = req.params;
      let { start = 1, limit = 10 } = req.query; // Default start and limit
     
      try {  
            limit = (limit>500) ? 500 : limit  
            let offset = (start - 1) * limit;

            const cacheKey = `individuals:${stateId}:${start}:${limit}`; // Define a unique cache key
            
            let catchData = await redisClient.retrieveDataFromRedis(cacheKey);

            if(catchData){
                  console.log("catch data available")
                  res.status(200).send({status:200,data:catchData});
            }else{
                  let individualsList =  await sqlDB.getPeopleByStateId(stateId,limit,offset);

                  // Store the data in the cache with a TTL (time-to-live) of 60 second
                  await redisClient.storeDataInRedis(cacheKey, individualsList, 60);

                  res.status(200).send({status:200,data:individualsList});
            }

      } catch (error) {
        console.log(error)    
        res.status(500).json({ message: 'Internal Server Error' });
      }
}


export default  {getAllStates,getPeopleByState}