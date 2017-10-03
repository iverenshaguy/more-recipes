import express from 'express';

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the More Recipes API',
}));

apiRoutes.get('/v1', (req, res) => res.status(200).send({
  message: 'Welcome to version 1 of the More Recipes API',
}));


export default apiRoutes;
