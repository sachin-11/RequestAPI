const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
 let swaggerUi = require('swagger-ui-express'),
   swaggerDocument = require('./swagger.json');
const errorHandler = require('./middleware/error');

const morgan = require('morgan');
const connectDB = require('./config/db');

//load env vars

dotenv.config({ path: './config/config.env' });

//Connect to database

connectDB();

// //mount routes
 const request = require('./routes/request');
 const client = require('./routes/client');
 const init = require('./routes/init');

const app = express();

app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// //mount routes
app.use('/api/v1/request', request);
 app.use('/api/v1/client', client);
 app.use('/api/v1/init', init)

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

//Handle unhandle promise rejection

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server
  server.close(() => process.exit(1));
});