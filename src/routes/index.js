import express from 'express';
const router = express.Router();
import config from "../config/index.js";
import  swaggerJSDoc from 'swagger-jsdoc'
import  swaggerUI from 'swagger-ui-express'
import stateController from '../controller/stateController.js';

/**
 * @swagger
 * tags:
 *   name: States
 *   description: API operations related to states
 */

/**
 * @swagger
 * /api/state-list:
 *   get:
 *     summary: Get a list of all states
 *     description: Retrieve a list of all states.
 *     tags: [States]
 *     responses:
 *       '200':
 *         description: A list of states.
 *       '500':
 *         description: Internal server error.
 */
router.get('/state-list', stateController.getAllStates);


/**
 * @swagger
 * /api/state/{stateId}/individuals:
 *   get:
 *     summary: Get people living in a specific state
 *     description: Retrieve a list of people living in a specific state.
 *     tags: [States]
 *     parameters:
 *       - in: path
 *         name: stateId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the state
 *       - in: query
 *         name: start
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The start index for paginated results (default is 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The maximum number of results per page (default is 10).
 *     responses:
 *       '200':
 *         description: A list of people in the state.
 *       '500':
 *         description: Internal server error.
 */
router.get('/state/:stateId/individuals', stateController.getPeopleByState);





export default router
