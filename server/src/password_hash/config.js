export default {
  // size of the generated hash
  hashBytes: 32,
  // larger salt means hashed passwords are more resistant to rainbow table, but
  // you get diminishing returns pretty fast
  saltBytes: 16,
  // A selected HMAC digest algorithm specified by digest is applied to derive
  // a key of the requested byte length (keylen) from the password, salt and
  // iterations.
  // - sha512, sha256
  // - whirlpool
  // and more.
  digest: 'SHA512',
  // more iterations means an attacker has to take longer to brute force an
  // individual password, so larger is better. however, larger also means longer
  // to hash the password. tune so that hashing the password takes about a
  // second
  iterations: 500000,
  // base 64 is shorter but hex is easier to understand
  encoding: 'hex'
};
