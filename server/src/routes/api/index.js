import express from 'express';
import apiUsersRoutes from './users';

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the More Recipes API',
}));

apiRoutes.use('/users', apiUsersRoutes);

export default apiRoutes;
