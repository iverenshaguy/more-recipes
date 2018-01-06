export default {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Recipes',
      [
        {
          recipeName: 'Coconut Rice',
          prepTime: '30 Minutes',
          cookTime: '20 Minutes',
          totalTime: '1 Hour',
          difficulty: 'Normal',
          extraInfo: '',
          vegetarian: 'false',
          ingredients: ['2 Cups of Rice', '1 Coconut'],
          preparations: [
            'Cut the chicken into small pieces, season and leave to marinate for 1 hour. This can be done in advance to save time',
            'Boil on low heat for 25 minutes with little water to cook and preserve the chicken stock.',
            'Grate coconut and strain milk from it by boiling for a few minutes'
          ],
          directions: [
            'Parboil Rice till half done',
            'Put already fried tomato stew on fire, add water and seasoning to taste'
          ],
          upvotes: 2,
          downvotes: 7,
          views: 9,
          userId: 1,
          updatedAt: '2017-10-30T00:47:03.687Z',
          createdAt: '2017-10-30T00:47:03.687Z'
        },
        {
          recipeName: 'Fried Rice',
          prepTime: '30 Minutes',
          cookTime: '20 Minutes',
          totalTime: '1 Hour',
          difficulty: 'Normal',
          extraInfo: 'Nigerian Party Staple',
          vegetarian: 'false',
          ingredients: ['2 Cups of Rice', '1 Kilo of Chicken'],
          preparations: [
            'Cut the chicken into small pieces, season and leave to marinate for 1 hour. This can be done in advance to save time',
            'Boil on low heat for 25 minutes with little water to cook and preserve the chicken stock.',
            'Cut ingredients into small pieces'
          ],
          directions: ['Parboil Rice till half done', 'Steam ingredients in oil till almost soft'],
          upvotes: 3,
          downvotes: 4,
          views: 9,
          userId: 2,
          updatedAt: '2017-10-30T00:47:03.687Z',
          createdAt: '2017-10-30T00:47:03.687Z'
        },
        {
          recipeName: 'Rice and Beans',
          prepTime: '30 Minutes',
          cookTime: '20 Minutes',
          totalTime: '1 Hour',
          difficulty: 'Normal',
          extraInfo: '',
          vegetarian: 'false',
          ingredients: ['2 Cups of Rice', '1.5 Cups of Beans', '1 kilo of chicken'],
          preparations: [
            'Cut the chicken into small pieces, season and leave to marinate for 1 hour. This can be done in advance to save time',
            'Boil on low heat for 25 minutes with little water to cook and preserve the chicken stock.'
          ],
          directions: ['Parboil Rice till half done', 'Cook beans with onions till almost done'],
          upvotes: 2,
          downvotes: 7,
          views: 10,
          userId: 3,
          updatedAt: '2017-10-30T00:47:03.687Z',
          createdAt: '2017-10-30T00:47:03.687Z'
        },
        {
          recipeName: 'Beans and Plantain',
          prepTime: '30 Minutes',
          cookTime: '20 Minutes',
          totalTime: '1 Hour',
          difficulty: 'Normal',
          extraInfo: '',
          vegetarian: 'true',
          ingredients: ['2 Cups of Beans', '3 Plantains'],
          preparations: ['Soak beans for 1 hour before cooking to reduce bloating'],
          directions: [
            'Cook beans with Onions till soft',
            'Add sliced plantains and ingredients and cook on low heat for another 5 minutes'
          ],
          upvotes: 2,
          downvotes: 7,
          views: 19,
          userId: 5,
          updatedAt: '2017-10-30T00:47:03.687Z',
          createdAt: '2017-10-30T00:47:03.687Z'
        },
        {
          recipeName: 'Egusi Soup',
          prepTime: '10 Minutes',
          cookTime: '30 Minutes',
          totalTime: '40 Minutes',
          difficulty: 'Normal',
          extraInfo: '',
          vegetarian: 'false',
          ingredients: ['2 Cups of Ground Egusi', '1 Kilo of Chicken'],
          preparations: [
            'Cut the chicken into small pieces, season and leave to marinate for 1 hour. This can be done in advance to save time',
            'Boil on low heat for 25 minutes with little water to cook and preserve the chicken stock.'
          ],
          directions: [
            'Fry Onions in Palm Oil till transluscent',
            'Add Egusi and fry till oil separates from egusi'
          ],
          upvotes: 9,
          downvotes: 0,
          views: 30,
          userId: 6,
          updatedAt: '2017-10-30T00:47:03.687Z',
          createdAt: '2017-10-30T00:47:03.687Z'
        },
        {
          recipeName: 'Yam Pottage',
          prepTime: '5 Minutes',
          cookTime: '30 Minutes',
          totalTime: '35 Minutes',
          difficulty: 'Normal',
          extraInfo: '',
          vegetarian: 'false',
          ingredients: ['1 tuber of yam', '1/2 cup of Palmoil'],
          directions: [
            'Boil Yam on Fire with Maggi, Crayfish and Onions',
            'When soft add Palm oil and other ingredients'
          ],
          upvotes: 1,
          downvotes: 8,
          views: 9,
          userId: 8,
          updatedAt: '2017-10-30T00:47:03.687Z',
          createdAt: '2017-10-30T00:47:03.687Z'
        },
        {
          recipeName: 'Chicken Stew',
          prepTime: '30 Minutes',
          cookTime: '30 Minutes',
          totalTime: '1 Hour',
          difficulty: 'Normal',
          extraInfo: 'Nigerian Party Staple',
          vegetarian: 'false',
          ingredients: ['Stew Base', '1 Kilo of Chicken'],
          preparations: [
            'Cut the chicken into small pieces, season and leave to marinate for 1 hour. This can be done in advance to save time',
            'Boil on low heat for 25 minutes with little water to cook and preserve the chicken stock.'
          ],
          directions: [
            'Fry already boiled stew base till done',
            'Add chicken stock and ingredients to taste'
          ],
          upvotes: 5,
          downvotes: 4,
          views: 20,
          userId: 9,
          updatedAt: '2017-10-30T00:47:03.687Z',
          createdAt: '2017-10-30T00:47:03.687Z'
        },
        {
          recipeName: 'Vegetable Soup',
          prepTime: '30 Minutes',
          cookTime: '20 Minutes',
          totalTime: '1 Hour',
          difficulty: 'Normal',
          extraInfo: '',
          vegetarian: 'false',
          ingredients: ['Vegetables', '1 Kilo of Chicken'],
          preparations: [
            'Cut the chicken into small pieces, season and leave to marinate for 1 hour. This can be done in advance to save time',
            'Boil on low heat for 25 minutes with little water to cook and preserve the chicken stock.'
          ],
          directions: [
            'Fry stew base and add chicken stock and ingredients',
            'Add Vegetables last and steam for 5 minutes'
          ],
          upvotes: 3,
          downvotes: 6,
          views: 36,
          userId: 10,
          updatedAt: '2017-10-30T00:47:03.687Z',
          createdAt: '2017-10-30T00:47:03.687Z'
        },
        {
          recipeName: 'Jollof Rice',
          prepTime: '30 Minutes',
          cookTime: '20 Minutes',
          totalTime: '1 Hour',
          difficulty: 'Normal',
          extraInfo: 'Nigerian Party Staple',
          vegetarian: 'false',
          ingredients: ['2 Cups of Rice', '1 Kilo of Chicken'],
          preparations: [
            'Cut the chicken into small pieces, season and leave to marinate for 1 hour. This can be done in advance to save time',
            'Boil on low heat for 25 minutes with little water to cook and preserve the chicken stock.'
          ],
          directions: [
            'Parboil Rice till half done',
            'Put already fried tomato stew on fire, add water and seasoning to taste'
          ],
          upvotes: 1,
          downvotes: 8,
          views: 17,
          userId: 1,
          updatedAt: '2017-10-30T00:47:03.687Z',
          createdAt: '2017-10-30T00:47:03.687Z'
        },
        {
          recipeName: 'Peppered Chicken',
          prepTime: '30 Minutes',
          cookTime: '20 Minutes',
          totalTime: '1 Hour',
          difficulty: 'Normal',
          extraInfo: 'Nigerian Party Staple',
          vegetarian: 'false',
          ingredients: ['1 Cup of Tomato Stew', '1 Kilo of Chicken'],
          preparations: [
            'Cut the chicken into small pieces, season and leave to marinate for 1 hour. This can be done in advance to save time',
            'Boil on low heat for 25 minutes with little water to cook and preserve the chicken stock.'
          ],
          directions: [
            'Put already fried tomato stew on fire, add little water and seasoning to taste',
            'Add chicken and stir',
            'Simmer on low heat for 3 minutes'
          ],
          upvotes: 10,
          downvotes: 0,
          views: 50,
          userId: 2,
          updatedAt: '2017-10-30T00:47:03.687Z',
          createdAt: '2017-10-30T00:47:03.687Z'
        },
        {
          recipeName: 'Mixed Okro Soup (Obe Ila Asepo)',
          prepTime: '10 Minutes',
          cookTime: '30 Minutes',
          totalTime: '40 Minutes',
          difficulty: 'Normal',
          extraInfo: '',
          vegetarian: 'false',
          ingredients: ['Okro', '1 Kilo of Chicken'],
          preparations: [
            'Cut the chicken into small pieces, season and leave to marinate for 1 hour. This can be done in advance to save time',
            'Boil on low heat for 25 minutes with little water to cook and preserve the chicken stock.'
          ],
          directions: [
            'Add Okro to little boiling water and beat until it draws',
            'Add ingredients'
          ],
          upvotes: 6,
          downvotes: 3,
          views: 27,
          userId: 6,
          updatedAt: '2017-10-30T00:47:03.687Z',
          createdAt: '2017-10-30T00:47:03.687Z'
        },
        {
          recipeName: 'Ogbona Soup',
          prepTime: '30 Minutes',
          cookTime: '20 Minutes',
          totalTime: '1 Hour',
          difficulty: 'Normal',
          extraInfo: 'Nigerian Party Staple',
          vegetarian: 'false',
          ingredients: ['Ogbona', '1 Kilo of Chicken'],
          preparations: [
            'Cut the chicken into small pieces, season and leave to marinate for 1 hour. This can be done in advance to save time',
            'Boil on low heat for 25 minutes with little water to cook and preserve the chicken stock.'
          ],
          directions: ['Cook the soup abeg'],
          upvotes: 2,
          downvotes: 7,
          views: 39,
          userId: 8,
          updatedAt: '2017-10-30T00:47:03.687Z',
          createdAt: '2017-10-30T00:47:03.687Z'
        },
        {
          recipeName: 'Moimoi',
          prepTime: '30 Minutes',
          cookTime: '30 Minutes',
          totalTime: '1 Hour',
          difficulty: 'Normal',
          extraInfo: 'Nigerian Party Staple',
          vegetarian: 'false',
          ingredients: ['2 Cups of Beans', '1 Kilo of Chicken'],
          preparations: [
            'Cut the chicken into small pieces, season and leave to marinate for 1 hour. This can be done in advance to save time',
            'Boil on low heat for 25 minutes with little water to cook and preserve the chicken stock.'
          ],
          directions: ["I'm tired of forming things to write"],
          upvotes: 3,
          downvotes: 6,
          views: 25,
          userId: 9,
          updatedAt: '2017-10-30T00:47:03.687Z',
          createdAt: '2017-10-30T00:47:03.687Z'
        },
        {
          recipeName: 'Sweet Potatoe Pottage',
          prepTime: '30 Minutes',
          cookTime: '20 Minutes',
          totalTime: '1 Hour',
          difficulty: 'Normal',
          extraInfo: '',
          vegetarian: 'false',
          ingredients: ['Sweet Potatoes', '1 Kilo of Chicken'],
          preparations: [
            'Cut the chicken into small pieces, season and leave to marinate for 1 hour. This can be done in advance to save time',
            'Boil on low heat for 25 minutes with little water to cook and preserve the chicken stock.'
          ],
          directions: ['My cursor is jumping'],
          upvotes: 4,
          downvotes: 5,
          views: 19,
          userId: 1,
          updatedAt: '2017-10-30T00:47:03.687Z',
          createdAt: '2017-10-30T00:47:03.687Z'
        },
        {
          recipeName: 'White Soup',
          prepTime: '30 Minutes',
          cookTime: '20 Minutes',
          totalTime: '1 Hour',
          difficulty: 'Normal',
          extraInfo: 'Nigerian Party Staple',
          vegetarian: 'false',
          ingredients: ['1 Kilo of Chicken'],
          preparations: [
            'Cut the chicken into small pieces, season and leave to marinate for 1 hour. This can be done in advance to save time',
            'Boil on low heat for 25 minutes with little water to cook and preserve the chicken stock.'
          ],
          directions: ["I don't even know how to cook white soup"],
          upvotes: 7,
          downvotes: 2,
          views: 49,
          userId: 8,
          updatedAt: '2017-10-30T00:47:03.687Z',
          createdAt: '2017-10-30T00:47:03.687Z'
        }
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('Recipes', null, {})
};
