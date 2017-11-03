import express from 'express';
import apiRoutes from './api';

const routes = express.Router();

routes.use('/api', apiRoutes);

routes.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the More Recipes App',
}));

export default routes;
