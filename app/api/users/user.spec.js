const should = require('should');
const request = require('supertest');
const app = require('../../app');
const models = require('../../models/models');
const dbSync = require('../../../bin/db-sync');

describe('Test', () => {

  before('sync db', (done) => {
    dbSync().then(() => {
      console.log('database sync');
      done();
    });
  });

  const testUsers = [
    {name: 'Alice'},
    {name: 'Kelly'},
    {name: 'Ahn'}
  ]

  before('insert test data', (done) => {
    models.User.bulkCreate(testUsers).then(() => done());
  });

  after('Clear up', (done) => {
    models.User.drop();
    dbSync().then(() => done());
  });

  it('GET /users', (done) => {
    request(app)
      .get('/users')
      .expect(200)
      .end((err, res) =>{
        if (err) {
          throw err;
        }
        done();
      });
  });

  it('GET /users', (done) => {
    request(app)
      .get('/users')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.should.be.an.instanceOf(Array).and.have.length(3);
        res.body.map(user => {
          user.should.have.properties('id', 'name');
          user.id.should.be.a.Number();
          user.name.should.be.a.String();
        });
        done();
      });
  });

  it('GET /users/:id', (done) => {
    request(app)
    .get('/users/1')
    .expect(200)
    .end((err, res) =>{
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('POST /users', (done) => {
    request(app)
      .post('/users')
      .send({name: 'Ahn'})
      .expect(201)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        done();
      });
  });

  it('DELETE /users/:id', (done) => {
    request(app)
      .delete('/users/1')
      .expect(204)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        done();
      });
  });
});