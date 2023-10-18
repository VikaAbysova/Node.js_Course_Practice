import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import healthCheckRouter from './routes/health-check.router';
import userRouter from './routes/user.router';

const app = express();
const PORT: number = 3000;

const swaggerOptions = {
  definition: {
    openai: '3.0.0',
    info: {
      title: 'Express Swagger API',
      version: '1.0.0',
      description: 'API documentation for Express.js application',
    },
    host: 'localhost:3000',
  },
  apis: ['src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/health-check', healthCheckRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
