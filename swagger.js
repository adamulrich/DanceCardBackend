const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Dance Card API',
    description: 'Description',
  },
  host: '',
  schemes: ['http']
  };

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);
