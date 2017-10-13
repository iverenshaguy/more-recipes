import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';

// Set up the express app
const app = express();

const logger = morgan;

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  Connect all our routes to our application
app.use('/', routes);

// Default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(409).send({
  message: 'Where Are You Going? Page Not Found',
}));

export default app;
