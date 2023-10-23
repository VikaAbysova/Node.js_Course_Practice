import express from 'express';
import httpStatus from '../constants/httpStatus.constants';
const router = express.Router();

/**
 * @swagger
 * /user:
 *  post:
 *    summary: Creating a new user
 *    tags:
 *      - User
 *    description: This api is used to create a new user
 *    parameters:
 *      - name: user
 *        in: body
 *        description: User data
 *        required: true
 *        schema:
 *          $ref: '#/definitions/user'
 *    responses:
 *      '201':
 *        description: User created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/user'
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Error'
 */
router.post('/', (req, res) => {
  const { id, name, email } = req.body;
  if (!email || !name) {
    const error = {
      code: '400',
      message: 'Bad request',
    };
    res.status(httpStatus.BAD_REQUEST).json(error);
    return;
  }
  const user = {
    id,
    name,
    email,
  };
  res.status(httpStatus.CREATED).json({ user, message: 'User created successfully' });
});

/**
 * @swagger
 * definitions:
 *    user:
 *      type: object
 *      required:
 *        - name
 *        - email
 *      properties:
 *        id:
 *          type: string
 *          example: '123'
 *        name:
 *          type: string
 *          example: 'Name'
 *        email:
 *          type: string
 *          example: 'Email@example.com'
 *    users:
 *      type: array
 *      items:
 *        $ref: '#/definitions/user'
 *    Error:
 *      type: object
 *      required:
 *        - code
 *        - message
 *      properties:
 *        code:
 *          type: integer
 *        message:
 *          type: string
 */

export default router;
