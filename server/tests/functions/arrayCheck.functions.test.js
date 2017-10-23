import chai from 'chai';
import { checkArrayData } from '../../src/validations/arrayCheck';

const expect = chai.expect;

describe('Test for Array Check', () => {
  const normalString = 'This is a string';
  const arrayofStrings = ['This is array[0]', 'This is array[1]'];

  it('should return an array', () => {
    const checkString = checkArrayData(normalString);

    expect(checkString).to.be.an('array');
    expect(checkString[0]).to.equal('This is a string');
  });

  it('should return an array', () => {
    const checkString = checkArrayData(2);

    expect(checkString).to.be.an('array');
    expect(checkString[0]).to.equal(2);
  });

  it('should return an array', () => {
    const checkString = checkArrayData({});

    expect(checkString).to.be.an('array');
    expect(checkString[0]).to.be.an('object');
  });

  it('should return an array', () => {
    const checkArray = checkArrayData(arrayofStrings);

    expect(checkArray).to.be.an('array');
    expect(checkArray[0]).to.equal('This is array[0]');
    expect(checkArray[1]).to.equal('This is array[1]');
  });
});
