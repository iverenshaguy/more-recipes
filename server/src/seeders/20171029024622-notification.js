export default {
  up: queryInterface => queryInterface.bulkInsert('Notifications', [

  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Notifications', null, {})
};
