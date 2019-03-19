const request = require('supertest');
let app = require('../server');

describe('GET /users', function () {
  it('respond with json containing a list of all users',(done) => {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

describe('GET /users/firstname/:firstname', function () {
  it('respond with json containing a single user', function (done) {
    request(app)
      .get('/users/firstname/sunday')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('respond with message user not found', function (done) {
    request(app)
      .get('/users/firstname/john')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404) //expecting HTTP status code
      .expect('{"message":"User not found!"}') // expecting content value
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /users', function () {
  let data = {
    "gender": "male",
    "firstname": "jack",
    "city": "san diego",
    "email": "jack@example.com",
    "cell": "858-354-1231"
  }

  let emptyObjData = {}

  let missingGenderData = {
    "gender": "",
    "firstname": "jack",
    "city": "san diego",
    "email": "jack@example.com",
    "cell": "858-354-1231"
  }

  let nonvalidEmailData = {
    "gender": "male",
    "firstname": "jack",
    "city": "san diego",
    "email": "jackexample.com",
    "cell": "858-354-1231"
  }

  let nonvalidCellData = {
    "gender": "male",
    "firstname": "jack",
    "city": "san diego",
    "email": "jack@example.com",
    "cell": "858-354-xxxx"
  }

  it('respond with 201 created', function (done) {
    request(app)
      .post('/users')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('respond with 400 not created no data in object', function (done) {
    request(app)
      .post('/users')
      .send(emptyObjData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({ message: `Please do not leave any fields empty.`})
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('respond with 400 not created missing gender value', function (done) {
    request(app)
      .post('/users')
      .send(missingGenderData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({ "message": "Please fill in value for gender input." })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('respond with 400 not created nonvalid email', function (done) {
    request(app)
      .post('/users')
      .send(nonvalidEmailData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({ message: `Please input valid email.`})
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('respond with 400 not created nonvalid cell number', function (done) {
    request(app)
      .post('/users')
      .send(nonvalidCellData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({ message: `Please input valid cell phone number.`})
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});