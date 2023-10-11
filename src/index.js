const express = require('express');
const app = express();
const PORT = 3000;

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
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Express server',
      },
    ],
  },
  apis: ['./swagger.yaml'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

app.get('/health-check', (req, res) => {
  res.status(200).json({ message: 'Server is running...' });
});

app.post('/user', (req, res) => {
  console.log(req.body);
  const { id, name, email } = req.body;
  if (!email || !name) {
    const error = {
      code: '400',
      message: 'Bad request'
    };
    res.status(400).json(error);
    return;
  }
  const user = {
    id,
    name,
    email,
  };
  res.status(201).json({ user, message: 'User created successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
