const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      
  openapi: '3.0.0',
  info: {
    title: 'API de Reservas - Neko Sushi 🐾🍣',
    version: '1.0.0',
    description: 'Documentación completa de la API REST para el sistema de reservas de tatamis en Neko Sushi.',
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Servidor local' },
    { url: 'http://10.10.8.237:3000', description: 'Servidor en red interna' },
  ],  
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // <- Este es el path donde Swagger busca anotaciones
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
