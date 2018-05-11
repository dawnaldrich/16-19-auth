'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
// import { pCreateAccountMock, pRemoveAccountMock } from './lib/account-mock';
import { pRemoveAccountMock } from './lib/account-mock';

const apiURL = `http://localhost:${process.env.PORT}/signup`;

describe('AUTH Router', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveAccountMock);

  test('POST should return a 200 status code and a TOKEN', () => {
    return superagent.post(apiURL)
      .send({
        username: 'dawn',
        email: 'dawnstarr.aldrich@gmail.com',
        password: 'starr',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
  });
  test('POST should return a 400 status code for bad request', () => {
    return superagent.post(apiURL)
      .send({
        email: 'dawnstarr.aldrich@gmail.com',
        password: 'starr',
      })
      .then(Promise.reject)
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
  });
  // test('POST should return 409 due to duplicate keys', () => {
  //   return pCreateAccountMock()
  //     .then((mockAccountPromise) => {
  //       const mockAccount = {
  //         username: mockAccountPromise.username,
  //         email: mockAccountPromise.email,
  //         password: mockAccountPromise.password,
  //       };
  //       console.log(mockAccount, ' MOCK ACCOUNT');
  //       return superagent.post(apiURL)
  //         .send(mockAccount)
  //         .then(Promise.reject)
  //         .catch((err) => {
  //           expect(err.status).toEqual(409);
  //         });
  //     });
  // });
});

