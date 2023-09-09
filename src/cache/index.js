import { createClient } from 'redis';
import config from "../config/index.js";

const redisUrl = `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`

// Create a Redis client and connect to your Redis server
const redisClient = createClient({
      url: redisUrl
});

redisClient.on('error', err => console.log('Redis Client Error', err));

// Function to store data in Redis
async function storeDataInRedis(key, data, ttlInSeconds) {
      try {
            await redisClient.connect()
            // Serialize data to JSON before storing it
            const serializedData = JSON.stringify(data);

            if (ttlInSeconds) {
                  // Store the data with a TTL (time-to-live) in seconds
                  await redisClient.set(key, serializedData, {
                        EX: ttlInSeconds,
                        NX: true
                  });
                  // await redisClient.set(key, serializedData, 'EX', ttlInSeconds);
            } else {
                  // Store the data without TTL
                  await redisClient.set(key, serializedData);
            }

      } catch (error) {
            console.error('Error storing data in Redis:', error);
      }  finally {
            await redisClient.disconnect();
      }
}
    
    
async function retrieveDataFromRedis(key) {
      try {
            await redisClient.connect()
            let serializedData = await redisClient.get(key);
            return JSON.parse(serializedData);
      } catch (error) {
            console.error('Error retrieving data from Redis:', error);
            callback(null);
      } finally {
            await redisClient.disconnect();
      }
}
    
    

export default {
      storeDataInRedis,
      retrieveDataFromRedis
}
