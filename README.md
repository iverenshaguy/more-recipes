# More Recipes

[![Build Status](https://travis-ci.org/iverenshaguy/more-recipes-personal.svg?branch=master)](https://travis-ci.org/iverenshaguy/more-recipes-personal)
[![Coverage Status](https://coveralls.io/repos/github/iverenshaguy/more-recipes-personal/badge.svg?branch=develop)](https://coveralls.io/github/iverenshaguy/more-recipes-personal?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/430187c352d8ead5737f/maintainability)](https://codeclimate.com/github/iverenshaguy/more-recipes-personal/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/430187c352d8ead5737f/test_coverage)](https://codeclimate.com/github/iverenshaguy/more-recipes-personal/test_coverage)

A Recipe Management Application written in Javscript (ES6).

## Built With

* [NodeJS](https://nodejs.org/) - Runtime Environment
* [ExpressJs](https://expressjs.com/) - Web Applicatipn Framework
* [Sequelize](http://docs.sequelizejs.com/) - Promise Based ORM
* [Postgres](https://www.postgresql.org/) - Database
* [Yarn](https://www.yarnpkg.com/) - Dependency Manager
* [React](https://reactjs.com/) - Interface Builder
* [Redux](https://expressjs.com/) - Application State Manager

### Supporting Packages

#### Linter(s)

* [ESLint](https://eslint.org/) - Linter Tool

#### Compiler

* [Babel](https://eslint.org/) - Compiler for Next Generation Javacsript

#### Test Tools

* [Mocha](https://mochajs.org/) - Test Framework
* [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node
* [Supertest](https://github.com/visionmedia/supertest) - Super-agent driven
  library for testing node.js HTTP servers
* [Istanbul(nyc)](https://istanbul.js.org/) - Code Coverage Generator

## Features

* Signup and Login
* Create Recipes
* Modiy Recipes
* Delete Recipes
* View All Recipes
* Review Recipes
* Upvote Recipes
* Downvote Recipe
* Add Recipes to Favorites
* Search for Recipes

### API Endpoints

#### Documentation

Navigate to
[http://localhost:8000/api/v1/docs](http://localhost:8000/api/v1/docs)

#### Users

* [Signup] - POST
  [http://localhost:8000/api/v1/users/signup](http://localhost:8000/api/v1/users/signup)
* [Signin] - POST
  [http://localhost:8000/api/v1/users/signin](http://localhost:8000/api/v1/users/signin)
* [Fetch User] - GET
  [http://localhost:8000/api/v1/users/profile](http://localhost:8000/api/v1/users/profile)
* [Upload User Profile Pic] - POST
  [http://localhost:8000/api/v1/users/uploads](http://localhost:8000/api/v1/users/uploads)
* [Fetch User's Favorite Recipes] - GET
  [http://localhost:8000/api/v1/users//:userId/recipes](http://localhost:8000/api/v1/users//:userId/recipes)

#### Recipes

* [Create Recipe] - POST
  [http://localhost:8000/api/v1/recipes](http://localhost:8000/api/v1/recipes)
* [User Recipe Image] - POST
  [http://localhost:8000/api/v1/recipes/uploads](http://localhost:8000/api/v1/recipes/uploads)
* [Modify Recipe] - PUT
  [http://localhost:8000/api/v1/recipes/:recipeId](http://localhost:8000/api/v1/recipes/:recipeId)
* [Delete Recipe] - DELETE
  [http://localhost:8000/api/v1/recipes/:recipeId](http://localhost:8000/api/v1/recipes/:recipeId)
* [Fetch Recipe and Update Views] - GET
  [http://localhost:8000/api/v1/recipes/:recipeId](http://localhost:8000/api/v1/recipes/:recipeId)
* [Fetch All Recipes in App] - GET
  [http://localhost:8000/api/v1/recipes](http://localhost:8000/api/v1/recipes)
* [Review Recipe] - POST
  [http://localhost:8000/api/v1/recipes/:recipeId/reviews](http://localhost:8000/api/v1/recipes/:recipeId/reviews)
* [Upvote Recipe] - POST
  [http://localhost:8000/api/v1/recipes/:recipeId/upvotes](http://localhost:8000/api/v1/recipes/:recipeId/reviews)
* [Downvote Recipe] - POST
  [http://localhost:8000/api/v1/recipes/:recipeId/downvotes](http://localhost:8000/api/v1/recipes/:recipeId/reviews)
* [Add Recipe to Favorite] - POST
  [http://localhost:8000/api/v1/recipes/:recipeId/favorites](http://localhost:8000/api/v1/recipes/:recipeId/reviews)
* [Fetch Recipes by Upvotes in Ascending Order] - GET
  [http://localhost:8000/api/v1/recipes?sort=upvotes&order=ascending](http://localhost:8000/api/v1/recipes?sort=upvotes&order=ascending)

## Getting Started

### Installing

* git clone
  [More Recipes](https://github.com/iverenshaguy/more-recipes-personal.git)
* Run `yarn install` or `npm install` to install packages
* Create a Postgres Database
* Create an .env file with the following credentials

```.env
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database
DB_HOST=your_host
```

* Run `sequelize db:migrate` to run database migrations
* Run `npm start` to start the server
* Navigate to [localhost:8000](http://localhost:8000/) in browser to access the
  application

### Testing

#### Prerequisites

* [Postman](https://getpostman.com/) - API Toolchain

#### Testing with Postman

* After installing as shown above
* Navigate to [localhost:8000](http://localhost:8000/) in
  [Postman](https://getpostman.com/) to access the application

#### Testing with Coverage Data

* After installing as shown above
* Preferrably create a new database for your test environment and add it to your
  .env file

```.env
DB_DATABASE_TEST=your_test_database
```

* Run `npm test`
* It will lint code, run test and display coverage data as generated by
  Istanbul's [nyc](https://github.com/istanbuljs/nyc)

### Deployment

### Development

You can run `npm run start:dev` in devlopment to use
[nodemon](https://nodemon.io/). [Nodemon](https://nodemon.io/) watches for file
changes and restarts your code
