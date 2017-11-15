import crypto from 'crypto';
import config from '../../../config/hash_config.json';

export default {

// Generate PBKDF2 hash
  hashPassword(password) {
    const {
      iterations,
      hashBytes,
      saltBytes,
      digest,
      encoding
    } = config;

    return new Promise((resolve, reject) => {
      if (typeof (password) !== 'string') {
        reject(TypeError('Password Must Be a String'));
      }

      const salt = crypto.randomBytes(saltBytes);

      const hash = crypto.pbkdf2Sync(password, salt, iterations, hashBytes, digest);

      const combined = Buffer.alloc(hash.length + salt.length + 8);

      // include the size of the salt so that we can, during verification,
      // figure out how much of the hash is salt and also include the
      // iteration count
      combined.writeUInt32BE(salt.length, 0, true);
      combined.writeUInt32BE(iterations, 4, true);
      salt.copy(combined, 8);
      hash.copy(combined, salt.length + 8);

      const combinedHashString = combined.toString(encoding);

      resolve(combinedHashString);
    });
  },

  verifyPassword(password, combinedHashString) {
    return new Promise((resolve, reject) => {
      if (typeof (password) !== 'string') {
        reject(TypeError('Password Must Be a String'));
      }


      if (!combinedHashString) {
        reject(Error('Database Password must be Provided for Comparism'));
      }

      const {
        digest,
        encoding
      } = config;

      const passwordBuffer = Buffer.from(combinedHashString, encoding);

      // extract the salt and hash from the combined buffer
      const saltBytes = passwordBuffer.readUInt32BE(0);
      const hashBytes = passwordBuffer.length - saltBytes - 8;
      const iterations = passwordBuffer.readUInt32BE(4);
      const salt = passwordBuffer.slice(8, saltBytes + 8);
      const hash = passwordBuffer.toString('binary', saltBytes + 8);

      // verify the salt and hash against the password
      const verify = crypto.pbkdf2Sync(password, salt, iterations, hashBytes, digest);

      resolve(verify.toString('binary') === hash);
    });
  }
};
