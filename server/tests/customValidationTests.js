import chai from 'chai';
import * as validator from '../src/customValidator';

const expect = chai.expect;

describe('Check for valid name input', () => {
  it('is a valid name', () => {
    const name = 'Jame Osuntokun';
    const checkName = validator.isValidName(name);

    expect(checkName, 'isValidName(\'James Osuntokun\')').to.equal(true);
  });
  it('is a valid name', () => {
    const name = 'Jame Fidelis Osuntokun';
    const checkName = validator.isValidName(name);

    expect(checkName, 'isValidName(\'James Osuntokun\')').to.equal(true);
  });
  it('is not a valid name', () => {
    const name = 'Jame Fidelis Osuntokun Taiwo';
    const checkName = validator.isValidName(name);

    expect(checkName, 'isValidName(\'James Osuntokun\')').to.equal(false);
  });
  it('is not a valid name', () => {
    const name = 'Jame 8 Fidelis Osuntokun';
    const checkName = validator.isValidName(name);

    expect(checkName, 'isValidName(\'James Osuntokun\')').to.equal(false);
  });
  it('is not a valid name', () => {
    const name = 83746;
    const checkName = validator.isValidName(name);

    expect(checkName, 'isValidName(83746)').to.equal(false);
  });
  it('is not a valid name', () => {
    const name = ['James', 'Tade'];
    const checkName = validator.isValidName(name);

    expect(checkName, 'isValidName([\'James\', \'Tade\'])').to.equal(false);
  });
  it('is not a valid name', () => {
    const name = 'Jame8998 Fidelis$$%7 Osuntokun';
    const checkName = validator.isValidName(name);

    expect(checkName, 'isValidName(\'Jame8998 Fidelis$$%7 Osuntokun\')').to.equal(false);
  });
});

describe('Check for valid username input', () => {
  it('is a valid username', () => {
    const username = 'jamesosuntokun';
    const checkUsername = validator.isValidUsername(username);

    expect(checkUsername, 'isValidUsername(\'jamesosuntokun\')').to.equal(true);
  });
  it('is a valid username', () => {
    const username = 'jamesosun1';
    const checkUsername = validator.isValidUsername(username);

    expect(checkUsername, 'isValidUsername(\'james_osun1\')').to.equal(true);
  });
  it('is a valid username', () => {
    const username = 'james_osun';
    const checkUsername = validator.isValidUsername(username);

    expect(checkUsername, 'isValidUsername(\'james_osun\')').to.equal(true);
  });
  it('is not a valid username', () => {
    const username = 'jam';
    const checkUsername = validator.isValidUsername(username);

    expect(checkUsername, 'isValidUsername(\'jam\')').to.equal(false);
  });
  it('is not a valid username', () => {
    const username = 83746;
    const checkUsername = validator.isValidUsername(username);

    expect(checkUsername, 'isValidUsername(83746)').to.equal(false);
  });
  it('is not a valid username', () => {
    const username = '@jamesosun';
    const checkUsername = validator.isValidUsername(username);

    expect(checkUsername, 'isValidUsername(@jamesosun)').to.equal(false);
  });
  it('is not a valid username', () => {
    const username = 'james-osun';
    const checkUsername = validator.isValidUsername(username);

    expect(checkUsername, 'isValidUsername(james-osun)').to.equal(false);
  });
});
