import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { apiRoutes } from './routes';
import errorHandler from './middlewares/errorHandler';

// Set up the express app
const app = express();

const logger = morgan;

// Log requests to the console.
app.use(logger('dev'));

app.use(cors({
  credentials: true
}));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Documentation
app.use('/api/v1/docs', express.static('docs'));

//  Connect all our routes to our application
app.use('/api', apiRoutes);

// Default catch-all route that sends back a not found warning for wrong api routes.
app.get('/api/*', (req, res) =>
  res.status(409).send({
    message: 'Where Are You Going? Page Not Found'
  }));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '../../client/', 'build')));

// app.get('*.js', (req, res, next) => {
//   req.url += '.gz';
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

// Return client index.html file for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/', 'build', 'index.html'));
});

app.use(errorHandler);

export default app;
