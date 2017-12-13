// module.exports = {
//   'Demo test Google': (client) => {
//     client
//       .url('http://www.google.com')
//       .waitForElementVisible('body', 1000)
//       .assert.title('Google')
//       .assert.visible('input[type=text]')
//       .setValue('input[type=text]', 'rembrandt van rijn')
//       .waitForElementVisible('button[name=btnG]', 3000)
//       .click('button[name=btnG]')
//       .pause(1000)
//       .assert.containsText('ol#rso li:first-child', 'Rembrandt - Wikipedia')
//       .end();
//   },
// };

// expect doesn't support method chaning therefore client.end() will be used instead
