import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import routes from './routes';

// Set up the express app
const app = express();

const logger = morgan;

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  Connect all our routes to our application
app.use('/', routes);

// Default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to More Recipes',
}));

export default app;
