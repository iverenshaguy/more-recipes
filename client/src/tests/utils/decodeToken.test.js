import jwt from 'jsonwebtoken';
import decodeToken from '../../utils/decodeToken';

jwt.decode = jest.fn();
jwt.decode.mockReturnValue({
  id: 2,
  username: 'username',
  profilePic: null
});

const returnValue = {
  decoded: {
    id: 2,
    username: 'username',
    profilePic: null
  },
  token: undefined
};

describe('Utils: decodeToken', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('works as expected', () => {
    const check = decodeToken();

    expect(check).toEqual(returnValue);
  });
});
