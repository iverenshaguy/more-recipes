import express from 'express';
import userRoutes from './users';
import recipeRoutes from './recipes';

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the More Recipes API',
}));

apiRoutes.use('/users', userRoutes);
apiRoutes.use('/recipes', recipeRoutes);

export default apiRoutes;
