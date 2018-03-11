import { check } from 'express-validator/check';
import { Recipe } from '../models';

export default {
  addRecipe: [
    check('recipeName')
      .exists()
      .withMessage('Recipe name must be specified')
      .isLength({ min: 1 })
      .withMessage('Recipe name cannot be empty')
      .isLength({ max: 255 })
      .withMessage('Recipe name must not be more than 255 characters')
      .matches(/^[a-z 0-9 ,.'-()\s]+$/i)
      .withMessage('Recipe name can only contain letters and the characters (,.\'-)')
      .trim(),
    check('prepTime')
      .optional({ checkFalsy: true })
      .isLength({ min: 2, max: 15 })
      .withMessage('Prep time must be between 2 and 15 characters')
      .matches(/^[a-zA-Z0-9\s]*$/)
      .withMessage('Prep time can only contain alphanumeric characters')
      .trim(),
    check('cookTime')
      .optional({ checkFalsy: true })
      .isLength({ min: 2, max: 15 })
      .withMessage('Cook time must be between 2 and 15 characters')
      .matches(/^[a-zA-Z0-9\s]*$/)
      .withMessage('Cook time can only contain alphanumeric characters')
      .trim(),
    check('totalTime')
      .exists()
      .withMessage('Total time must be specified')
      .isLength({ min: 2, max: 15 })
      .withMessage('Total time must be between 2 and 15 characters')
      .matches(/^[a-zA-Z0-9\s]*$/)
      .withMessage('Total time can only contain alphanumeric characters')
      .trim(),
    check('difficulty')
      .optional({ checkFalsy: true })
      .isIn(['Easy', 'Normal', 'A Bit Difficult', 'Difficult', 'Very Difficult'])
      .withMessage('Please select a valid field')
      .trim(),
    check('extraInfo')
      .optional({ checkFalsy: true })
      .matches(/^[a-z 0-9 ,.'-\s]+$/i)
      .withMessage('Extra info can only contain letters and the characters (,.\'-)')
      .trim(),
    check('vegetarian')
      .optional({ checkFalsy: true })
      .isIn([false, true])
      .withMessage('This field can only accept true or false')
      .trim(),
    check('ingredients')
      .exists()
      .withMessage('Ingredient must be specified')
      .isLength({ min: 1 })
      .withMessage('Ingredient cannot be empty')
      .matches(/^[a-z 0-9 ,.'-()\s]+$/i)
      .withMessage('Ingredient can only contain letters and the characters (,.\'-)')
      .trim(),
    check('preparations')
      .optional({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Preparation cannot be empty')
      .matches(/^[a-z 0-9 ,.'-()\s]+$/i)
      .withMessage('Preparation can only contain letters and the characters (,.\'-)')
      .trim(),
    check('directions')
      .exists()
      .withMessage('Direction must be specified')
      .isLength({ min: 1 })
      .withMessage('Direction cannot be empty')
      .matches(/^[a-z 0-9 ,.'-()\s]+$/i)
      .withMessage('Direction can only contain letters and the characters (,.\'-)')
      .trim(),
  ],
  getSingleRecipe: [
    check('recipeId')
      .exists()
      .withMessage('Recipe must be specified')
      .isInt()
      .withMessage('Recipe Not Found')
      .custom(value => Recipe.findOne({ where: { id: value } }).then((recipe) => {
        if (recipe === null) {
          throw new Error('Recipe Not Found');
        }
        return true;
      })),
  ],
  updateRecipe: [
    check('recipeId')
      .exists()
      .withMessage('Recipe to edit must be specified')
      .isInt()
      .withMessage('Recipe Not Found')
      .custom(value => Recipe.findOne({ where: { id: value } }).then((recipe) => {
        if (recipe === null) {
          throw new Error('Recipe Not Found');
        }
        return true;
      })),
    check('recipeName')
      .optional({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Recipe name cannot be empty')
      .isLength({ max: 255 })
      .withMessage('Recipe name must not be more than 255 characters')
      .matches(/^[a-z 0-9 ,.'-()\s]+$/i)
      .withMessage('Recipe name can only contain letters and the characters (,.\'-)')
      .trim(),
    check('prepTime')
      .optional({ checkFalsy: true })
      .isLength({ min: 2, max: 15 })
      .withMessage('Prep time must be between 2 and 15 characters')
      .matches(/^[a-zA-Z0-9\s]*$/)
      .withMessage('Prep time can only contain alphanumeric characters')
      .trim(),
    check('cookTime')
      .optional({ checkFalsy: true })
      .isLength({ min: 2, max: 15 })
      .withMessage('Cook time must be between 2 and 15 characters')
      .matches(/^[a-zA-Z0-9\s]*$/)
      .withMessage('Cook time can only contain alphanumeric characters')
      .trim(),
    check('totalTime')
      .optional({ checkFalsy: true })
      .isLength({ min: 2, max: 15 })
      .withMessage('Total time must be between 2 and 15 characters')
      .matches(/^[a-zA-Z0-9\s]*$/)
      .withMessage('Total time can only contain alphanumeric characters')
      .trim(),
    check('difficulty')
      .optional({ checkFalsy: true })
      .isIn(['Easy', 'Normal', 'A Bit Difficult', 'Difficult', 'Very Difficult'])
      .withMessage('Please select a valid field')
      .trim(),
    check('extraInfo')
      .optional({ checkFalsy: true })
      .matches(/^[a-z 0-9 ,.'-\s]+$/i)
      .withMessage('Extra info can only contain letters and the characters (,.\'-)')
      .trim(),
    check('vegetarian')
      .optional({ checkFalsy: true })
      .isIn([false, true])
      .withMessage('This field can only accept true or false')
      .trim(),
    check('recipeImage')
      .trim(),
    check('ingredients')
      .optional({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Ingredient cannot be empty')
      .matches(/^[a-z 0-9 ,.'-()\s]+$/i)
      .withMessage('Ingredient can only contain letters and the characters (,.\'-)')
      .trim(),
    check('preparations')
      .optional({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Preparation cannot be empty')
      .matches(/^[a-z 0-9 ,.'-()\s]+$/i)
      .withMessage('Preparation can only contain letters and the characters (,.\'-)')
      .trim(),
    check('directions')
      .optional({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Direction cannot be empty')
      .matches(/^[a-z 0-9 ,.'-()\s]+$/i)
      .withMessage('Direction can only contain letters and the characters (,.\'-)')
      .trim(),
  ],
  reviewRecipe: [
    check('recipeId')
      .exists()
      .withMessage('Recipe to review must be specified')
      .isInt()
      .withMessage('Recipe Not Found')
      .custom(value => Recipe.findOne({ where: { id: value } }).then((recipe) => {
        if (recipe === null) {
          throw new Error('Recipe Not Found');
        }
        return true;
      })),
    check('rating')
      .exists()
      .withMessage('Recipe must be rated')
      .isIn([1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5])
      .withMessage('Recipe must be rated from 1 - 5')
      .trim(),
    check('comment')
      .exists()
      .withMessage('Review must be specified')
      .isLength({ min: 1 })
      .withMessage('Review cannot be empty')
      .isLength({ max: 400 })
      .withMessage('Review must not be more than 400 characters')
      .matches(/^[a-z 0-9 ,.'-()\s]+$/i)
      .withMessage('Review can only contain letters and the characters (,.\'-)')
      .trim(),
  ],
};
