import { expect } from 'chai';
import { getCleanUser } from '../../src/helpers';

describe('Test for getCleanUser helper', () => {
  it('should return clean user', () => {
    const dirtyUser = {
      id: 1,
      firstname: 'Iveren',
      lastname: 'Shaguy',
      username: 'iverenshaguy',
      email: 'iverenshaguy@gmail.com',
      passwordHash:
        '000000100007a12016262f8e438082795b2154dae2c51201fe24c8007b4a11507183a1f9cf425de1218dac3804b30c7412f34d0c8cee1332',
      aboutMe: 'Smart',
      occupation: 'Software Developer',
      updatedAt: '2017-10-30T00:47:03.687Z',
      createdAt: '2017-10-30T00:47:03.687Z'
    };
    const user = getCleanUser(dirtyUser);

    expect(user).to.not.haveOwnProperty('passwordHash');
    expect(user).to.haveOwnProperty('id');
  });

  it('should return empty object for empty user', () => {
    const user = getCleanUser();

    expect(Object.keys(user).length).to.equal(0);
  });
});
