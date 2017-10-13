import { hashPassword, verifyPassword } from './password_hash';

const users = {
  hans: '000000100007a1207c355d0d150c23cb08c80b010ab8937d87ffc23a21a25154b54ee5c5959219ffcfa1ac5ded62c2e60025ee6105b5369ee' // 'pѬѬasѪ"§§)("!编/)$=?!°&%)?§"$(§sw汉字编码§"$(§sw汉字方法orФdpѬѬasѪ"§§)("!/)$=?!°&%)?编码方法orФd'
};

hashPassword('LionJudah').then((hash) => {
  // example hash that can be used to validate the password
  console.log(hash);
}).catch(err => console.log(err));

hashPassword('pѬѬasѪ"§§)("!编/)$=?!°&%)?§"$(§sw汉字编码§"$(§sw汉字方法orФdpѬѬasѪ"§§)("!/)$=?!°&%)?编码方法orФd').then((hash) => {
  // example hash that can be used to validate the password
  console.log(hash);
}).catch(err => console.log(err));

verifyPassword('pѬѬasѪ"§§)("!编/)$=?!°&%)?§"$(§sw汉字编码§"$(§sw汉字方法orФdpѬѬasѪ"§§)("!/)$=?!°&%)?编码方法orФd', users.hans.toString()).then((correct) => {
  console.log(correct);
}).catch(err => console.log(err));
