export const login = user =>
  new Promise((resolve, reject) => {
    if (user.email && user.password && user.email === 'iverenshaguy@gmail.com' && user.password === 'iverenshaguy') {
      return setTimeout(() => {
        const returnedUser = {
          status: 200,
          data: {
            user: {
              id: '1',
              firstname: 'Iveren',
              lastname: 'Shaguy',
              username: 'iverenshaguy',
              email: 'iverenshaguy@gmail.com',
              aboutMe: 'Food lover. Bookworm',
              occupation: 'Software Developer',
              updatedAt: '2017-10-30T00:47:03.687Z',
              createdAt: '2017-10-30T00:47:03.687Z'
            },
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE1NDQ0NzkwLCJleHAiOjE1MTU1MzExOTB9.6d1VznIz8slZFioUzvC4KNGDlz_YsUNy95g2LPaEnJE'
          }
        };

        resolve(returnedUser);
      }, 500);
    } else if (user.email && user.password && user.email === 'iverenshaguy@gmail.com' && user.password !== 'iverenshaguy') {
      return setTimeout(() => {
        const error = {
          response: {
            status: 401,
            data: {
              error: 'Email/Password do not match'
            }
          }
        };

        reject(error);
      }, 300);
    } else if (user.email && !user.password && user.email === 'iverenshaguy@gmail.com') {
      return setTimeout(() => {
        const error = {
          response: {
            status: 422,
            data: {
              errors: {
                password: { msg: 'Password must be specified' }
              }
            }
          }
        };

        reject(error);
      }, 300);
    } else if (user.email && !user.password && user.email !== 'iverenshaguy@gmail.com') {
      return setTimeout(() => {
        const error = {
          response: {
            status: 422,
            data: {
              errors: {
                email: { msg: 'This email is not registered, please signup instead' },
                password: { msg: 'Password must be specified' }
              }
            }
          }
        };

        reject(error);
      }, 300);
    }
  });

export const signup = user =>
  new Promise((resolve, reject) => {
    const goodUser = {
      firstname: 'Jane',
      lastname: 'Smithy',
      username: 'janesmithy',
      email: 'janesmithy@gmail.com',
      password: 'janesmithy',
      passwordConfirm: 'janesmithy',
      aboutMe: 'I love books.',
      occupation: 'Web Designer'
    };

    if (user.email || user.username) {
      if (user.email === 'iverenshaguy@gmail.com' && Object.keys(user).length === 1 && Object.keys(user)[0] === 'email') {
        setTimeout(() => {
          const error = {
            response: {
              status: 422,
              data: {
                errors: {
                  email: { msg: 'This email is already registered' },
                  firstname: { msg: 'Firstname is required' },
                  username: { msg: 'Username is required' },
                  password: { msg: 'Password is required' },
                  passwordConfirm: { msg: 'Passwords do not match' },
                }
              }
            }
          };

          reject(error);
        }, 300);
      }

      if (user.email !== 'iverenshaguy@gmail.com' && Object.keys(user).length === 1 && Object.keys(user)[0] === 'email') {
        setTimeout(() => {
          const error = {
            response: {
              status: 422,
              data: {
                errors: {
                  firstname: { msg: 'Firstname is required' },
                  username: { msg: 'Username is required' },
                  password: { msg: 'Password is required' },
                  passwordConfirm: { msg: 'Passwords do not match' },
                }
              }
            }
          };

          reject(error);
        }, 300);
      }

      if (user.username === 'iverenshaguy' && Object.keys(user).length === 1 && Object.keys(user)[0] === 'username') {
        setTimeout(() => {
          const error = {
            response: {
              status: 422,
              data: {
                errors: {
                  username: { msg: 'This username is already registered' },
                  firstname: { msg: 'Firstname is required' },
                  email: { msg: 'Email is required' },
                  password: { msg: 'Password is required' },
                  passwordConfirm: { msg: 'Passwords do not match' },
                }
              }
            }
          };

          reject(error);
        }, 300);
      }

      if (user.username !== 'iverenshaguy' && Object.keys(user).length === 1 && Object.keys(user)[0] === 'username') {
        setTimeout(() => {
          const error = {
            response: {
              status: 422,
              data: {
                errors: {
                  firstname: { msg: 'Firstname is required' },
                  email: { msg: 'Email is required' },
                  password: { msg: 'Password is required' },
                  passwordConfirm: { msg: 'Passwords do not match' },
                }
              }
            }
          };

          reject(error);
        }, 300);
      }
      if (user.email && user.password && user.passwordConfirm && user.username && user.email) {
        if (user.email === goodUser.email && user.username === goodUser.username) {
          setTimeout(() => {
            const returnedUser = {
              status: 201,
              data: {
                user: {
                  id: '1',
                  firstname: 'Jane',
                  lastname: 'Smith',
                  username: 'janesmith',
                  email: 'janesmith@gmail.com',
                  aboutMe: 'Food lover',
                  occupation: 'Chef',
                  updatedAt: '2017-10-30T00:47:03.687Z',
                  createdAt: '2017-10-30T00:47:03.687Z'
                },
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE1NDQ0NzkwLCJleHAiOjE1MTU1MzExOTB9.6d1VznIz8slZFioUzvC4KNGDlz_YsUNy95g2LPaEnJE'
              }
            };

            resolve(returnedUser);
          }, 500);
        } else if (user.email === 'iverenshaguy@gmail.com') {
          setTimeout(() => {
            const error = {
              response: {
                status: 422,
                data: {
                  errors: {
                    username: { msg: 'This email is already registered' },
                  }
                }
              }
            };

            reject(error);
          }, 500);
        }
      }
    }
  });

export default { login, signup };
