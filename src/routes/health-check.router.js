const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /health-check:
 *   get:
 *    summary: Check server health status
 *    tags:
 *      - health-check
 *    description: This api is used to check if the GET method is working or not
 *    responses:
 *      '200':
 *        description: The server is running
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/healthCheck'
 */
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running...' });
  });

/**
 * @swagger
 * definitions:
 *    healthCheck:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 */

module.exports = router;