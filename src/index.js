const express = require('express');
const app = express();
const PORT = 3000;
const healthCheckRouter = require('./routes/health-check.router');
const userRouter = require('./routes/user.router');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openai: '3.0.0',
    info: {
      title: 'Express Swagger API',
      version: '1.0.0',
      description: 'API documentation for Express.js application',
    },
    host: 'localhost:3000'
  },
  apis: ['src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/health-check', healthCheckRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
