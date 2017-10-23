import { Recipe, User } from '../models';

export default {
  create(req, recipeData, res) {
    Recipe.create({
      recipeName: recipeData.recipeName,
      prepTime: recipeData.prepTime,
      cookTime: recipeData.cookTime,
      totalTime: recipeData.totalTime,
      difficulty: recipeData.difficulty,
      extraInfo: recipeData.extraInfo,
      vegetarian: recipeData.vegetarian,
      recipeImage: recipeData.recipeImage,
      userId: req.session.user.id,
      ingredients: recipeData.ingredients,
      preparations: recipeData.preparations,
      directions: recipeData.directions
    }, {
      include: [
        User
      ]
    })
      .then(recipe => res.status(201).send(recipe));
  },

  // update(req, recipeData, res) {
  //   return Todo
  //     .findById(req.params.todoId, {
  //       include: [{
  //         model: TodoItem,
  //         as: 'todoItems',
  //       }],
  //     })
  //     .then(todo => {
  //       if (!todo) {
  //         return res.status(404).send({
  //           message: 'Todo Not Found',
  //         });
  //       }
  //       return todo
  //         .update({
  //           title: req.body.title || todo.title,
  //         })
  //         .then(() => res.status(200).send(todo))  // Send back the updated todo.
  //         .catch((error) => res.status(400).send(error));
  //     })
  //     .catch((error) => res.status(400).send(error));
  // },
};
