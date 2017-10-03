import * as validator from './custom-validations/customValidator';

const username = 'Phil4516';
const checkAvailability = validator.isAvailableUsername(username);
console.log(checkAvailability);
