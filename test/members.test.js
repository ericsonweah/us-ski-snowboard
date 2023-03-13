'use strict';
/*
|--------------------------------------------------------------------------
| This is just a simple test for few api endpoints
|--------------------------------------------------------------------------
| 
!
|
*/

const app = require('../app');
const request = require('supertest');
const assert = require('chai').assert;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.cwd() +  '/data/sqlitedb');

describe('Users API', () => {
    let server;

    server = app.listen(3000);
  
    describe('GET /api/members', () => {
      it('returns a not empty object if users exist', (done) => {
        request(server)
          .get('/api/members')
          .expect(200)
          .end((err, res) => {
            assert.isNull(err);
            assert.isArray(res.body.members);
            expect(res.body.count).toBe(1000);
            done();
          });
      });
  
    });
    describe('GET /api/members/:id', () => {
        it('returns a not empty object if user exists', (done) => {
          request(server)
            .get('/api/members/94cd5df3-cc05-4687-bfe0-ecb42c6ec02c')
            .expect(200)
            .end((err, res) => {
              assert.isNull(err);
              assert.isObject(res.body);
              done();
            });
        });
        it('returns  null  if user does exists', (done) => {
            request(server)
              .get('/api/members/94cd5df3-cc05-4687-bfe0-ecb42c6ec02cs')
              .expect(200)
              .end((err, res) => {
                assert.isNotNull(err)
                assert.isObject(res.body);
                done();
              });
          });
    
      });
      describe('POST /api/load', () => {
        it('returns error if input is not number', (done) => {
          request(server)
            .post('/api/load',{quantity:  'afdasf'})
            .expect(200)
            .end((err, res) => {
              assert.isNotNull(err);
              done();
            });
        });
        
      });
});