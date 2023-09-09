import fs from 'fs';
import 'dotenv/config'
import config from "../config/index.js";
import csvParser from 'csv-parser';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'; // Import specific AWS services
import sqlDB from "../sqllayer/index.js";

// AWS S3 configuration
const s3Client = new S3Client({
      region: 'ap-south-1', // Use the region code, not the region name
      credentials: {
            accessKeyId: process.env.S3ACCESSKEYID,
            secretAccessKey: process.env.S3ACCESSKEY,
      },
});

/*
* Download Data from S3 bucket 
* Save the data into db in the form of chunks
* Run command node src/controller/s3.controller.js bucket=kalra-state-population-list key=state_population.csv
*/


async function downloadFromS3() {   
      // S3 bucket and object details

      // Iterate through the arguments to find 'bucket' and 'key' parameters
      const args = process.argv;
      let s3BucketName; // Replace with the S3 bucket ex:kalra-state-population-list
      let s3ObjectKey; // Replace with the S3 object key ex:state_population.csv
      for (const arg of args) {
            if (arg.startsWith('bucket=')) {
                  s3BucketName = (arg.split('=')[1]).trim();
            } else if (arg.startsWith('key=')) {
                  s3ObjectKey = (arg.split('=')[1]).trim();
            }
      }

      // Local file path to save the downloaded data
      const localFilePath = 'data.csv';
      const tempTableName = 'test12'

      try {
            // Download the file from S3
            const getObjectCommand = new GetObjectCommand({
            Bucket: s3BucketName,
            Key: s3ObjectKey,
            });

            // Create a write stream to save the data to the local file
            const fileStream = fs.createWriteStream(localFilePath);

            // Execute the GetObjectCommand to retrieve the S3 object data
            const response = await s3Client.send(getObjectCommand);

            // Pipe the S3 response data to the file stream
            response.Body.pipe(fileStream);

            console.log("data processing from s3 bucket ................")
            // Wait for the file stream to finish writing
            await new Promise((resolve, reject) => {
                  fileStream.on('finish', resolve);
                  fileStream.on('error', reject);
            });

            await saveDataIntoDb(tempTableName,localFilePath)
      } catch (error) {
        console.error('Error:', error);
      } finally {
        console.log("****Data save in db successfully.")
      }
}

async function saveDataIntoDb(tableName,filePath) {
      try {
            console.log("Start process to save data in db..............")
            const readStream = fs.createReadStream(filePath, 'utf-8');
            const csvStream = readStream.pipe(csvParser());
            let batch = [];
            let batchSize =1000
            let rowCount = 0;
            for await (const row of csvStream) {
                  batch.push(row);
                  if (batch.length >= batchSize) {
                       let rows = generateInsertValues(batch);
                       await sqlDB.insertBatch(tableName, rows);
                       rowCount += batch.length;
                       batch = [];
                       console.log(`Inserted ${rowCount} rows into the database`);
                  }
            }      
            return true
      } catch (error) {
        console.error('Error:', error);
      } 
}

function generateInsertValues(rows) {
      return rows
        .map(row => {
          return `('${Object.values(row).join("', '")}')`;
        })
        .join(',');
}


downloadFromS3();









