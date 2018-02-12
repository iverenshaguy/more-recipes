import jwt from 'jsonwebtoken';
import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/bin/www';

const rootURL = '/api/v1';
const agent = request.agent(app);

const expiredToken = `Bearer ${jwt.sign({ id: 1 }, process.env.SECRET, { expiresIn: 1 })}`;
const invalidToken = `Bearer ${jwt.sign({}, process.env.SECRET, { expiresIn: 86400 })}`;
const wrongSecretToken = `Bearer ${jwt.sign({ id: 1 }, 'fakesecret', { expiresIn: 86400 })}`;

// users already seeded into db
const tokens = {
  iverenToken: `Bearer ${jwt.sign({
    id: 1,
    firstname: 'Iveren',
    lastname: 'Shaguy',
    username: 'iverenshaguy',
    email: 'iverenshaguy@gmail.com',
    aboutMe: 'Smart',
    occupation: 'Software Developer'
  }, process.env.SECRET, { expiresIn: '1 hour' })}`,

  emiolaToken: `Bearer ${jwt.sign({
    id: 10,
    firstname: 'Emiola',
    lastname: 'Olasanmi',
    username: 'emiolaolasanmi',
    email: 'emiolaolasanmi@gmail.com',
    aboutMe: 'Food Lover',
    occupation: 'Fashion Designer',
  }, process.env.SECRET, { expiresIn: '1 hour' })}`,
};

export default {
  app,
  agent,
  expect,
  tokens,
  request,
  rootURL,
  expiredToken,
  invalidToken,
  wrongSecretToken
};
