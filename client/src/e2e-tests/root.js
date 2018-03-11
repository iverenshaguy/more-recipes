module.exports = {
  'User Authentication': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .assert.title('More Recipes')
      .assert.containsText('h4', 'Sign In to Your Account')
      .assert.visible('input[name=email]')
      .assert.visible('p a[href="/signup"]')
      .click('p a[href="/signup"]')
      .pause(3000)
      .assert.containsText('h4', 'Register for a New Account')
      .assert.visible('input[name=firstname]')
      .assert.visible('p a[href="/login"]')
      .end();
  },

  'Home Page: Search For Recipes': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .assert.title('More Recipes')
      .setValue('input[name=email]', 'janesmith@gmail.com')
      .setValue('input[name=password]', 'janesmithy')
      .click('button')
      .pause(5000)
      .assert.containsText('div.col-12 h3', 'Search for a Recipe')
      .assert.containsText('div#title h5', 'TOP RECIPES')
      .assert.elementPresent('#search-result')
      .assert.visible('input[type=text]')
      .setValue('input[type=text]', 'Rice')
      .click('button.search-btn')
      .pause(5000)
      .assert.containsText('div#title h5', 'SEARCH RESULTS')
      .assert.elementPresent('#search-result')
      .end();
  },

  'Home Page: Open Add Recipe Modal': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .assert.title('More Recipes')
      .setValue('input[name=email]', 'janesmith@gmail.com')
      .setValue('input[name=password]', 'janesmithy')
      .click('button')
      .pause(5000)
      .click('#home-add-recipe-btn')
      .pause(1000)
      .assert.cssClassPresent('body', 'modal-open')
      .assert.visible('div.modal')
      .end();
  },

  'Recipe Page': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .assert.title('More Recipes')
      .setValue('input[name=email]', 'janesmith@gmail.com')
      .setValue('input[name=password]', 'janesmithy')
      .click('button')
      .pause(5000)
      .click('div.card')
      .pause(5000)
      .assert.visible('.view-recipe')
      .assert.visible('#recipe-wrapper')
      .end();
  },

  'Recipe Page: Recipe Actions': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .assert.title('More Recipes')
      .setValue('input[name=email]', 'janesmith@gmail.com')
      .setValue('input[name=password]', 'janesmithy')
      .click('button')
      .pause(5000)
      .url('http://localhost:8000/recipes/16')
      .pause(5000)
      .assert.visible('.review i.fa-star-o')
      .assert.visible('.favorite i.fa-heart-o')
      .assert.visible('.upvote i.fa-thumbs-o-up')
      .assert.visible('.downvote i.fa-thumbs-o-down')
      .click('.review i.fa-star-o')
      .pause(1000)
      .assert.visible('#review-wrapper')
      .click('.review i.fa-star-o')
      .pause(1000)
      .assert.hidden('#review-wrapper')
      .click('.favorite i.fa-heart-o')
      .pause(3000)
      .assert.visible('.favorite i.fa-heart')
      .click('.favorite i.fa-heart')
      .pause(3000)
      .assert.visible('.favorite i.fa-heart-o')
      .click('.upvote i.fa-thumbs-o-up')
      .pause(3000)
      .assert.visible('.upvote i.fa-thumbs-up')
      .click('.upvote i.fa-thumbs-up')
      .pause(3000)
      .assert.visible('.upvote i.fa-thumbs-o-up')
      .click('.downvote i.fa-thumbs-o-down')
      .pause(3000)
      .assert.visible('.downvote i.fa-thumbs-down')
      .click('.downvote i.fa-thumbs-down')
      .pause(3000)
      .assert.visible('.downvote i.fa-thumbs-o-down')
      .end();
  },

  'Recipe Page: Sticky Bar': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .assert.title('More Recipes')
      .setValue('input[name=email]', 'janesmith@gmail.com')
      .setValue('input[name=password]', 'janesmithy')
      .click('button')
      .pause(5000)
      .url('http://localhost:8000/recipes/16')
      .pause(3000)
      .windowHandle((handle) => {
        client.windowSize(handle.value, 695, 750);
      })
      .assert.visible('.sticky-bar-wrapper')
      .click('i.home-icon')
      .pause(3000)
      .assert.urlEquals('http://localhost:8000/')
      .click('i#add-edit-modal-icon')
      .pause(1000)
      .assert.cssClassPresent('body', 'modal-open')
      .assert.visible('div.modal')
      .end();
  },
};

// expect doesn't support method chaning therefore client.end() will be used instead
