import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import  swaggerJSDoc from 'swagger-jsdoc'
import  swaggerUI from 'swagger-ui-express'
import 'dotenv/config'
// Helper imports
import config from './config/index.js';

import router from './routes/index.js'

// Express server & middleware setup
const app = express()



app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use('/api', router);

const swaggerOptions={
  definition:{
      openapi:'3.0.0',
      info:{
          title:'Population Analyst Api',
          version:'1.0.0',
          description:'Analyst Api for population',
      },
      servers:[{url:`http://localhost:${config.PORT}/`}]
  },
  apis: ['./src/routes/index.js'],
}
const swaggerDocs=swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

// Health status
app.get('/health-check', (req, res) => {
  res.status(200).send({ status: 'green' })
})

  // Server start
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}.`)
  })
