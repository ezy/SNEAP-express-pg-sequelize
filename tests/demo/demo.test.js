const request = require('supertest');
const { expect } = require('chai');
const faker = require('faker');
const app = require('../../config/server');

describe('[POST] /api/v1/demos Testing', () => {
  let id = '';
  let token = '';
  const title = faker.lorem.sentence(5);
  const demoKeys = [
    'id',
    'demoTitle',
    'demoSlug',
    'demoDate',
    'demoText',
    'createdAt',
    'updatedAt',
  ];

  const demoRequest = {
    demo: {
      demoTitle: title,
      demoText: faker.lorem.sentences(3, 3),
    },
  };

  it('should be able to set login token', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'new@email.com',
        password: 'passwrod',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        token = res.body.token; // eslint-disable-line prefer-destructuring
        done();
      });
  });

  it('should be able to get a list of all seeded demos', (done) => {
    request(app)
      .get('/api/v1/demos')
      .expect(200)
      .end((err, res) => {
        expect(res.body.demos).to.be.an('array');
        expect(res.body.demos[0]).to.have.all.keys(demoKeys);
        // set demo id for next test
        id = res.body.demos[0].id; // eslint-disable-line prefer-destructuring
        done();
      });
  });

  it('should be able to get a single demo', (done) => {
    request(app)
      .get(`/api/v1/demos/${id}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.demo).to.be.an('object');
        expect(res.body.demo).to.have.all.keys(demoKeys);
        done();
      });
  });

  it('should error with wrong demo slug', (done) => {
    request(app)
      .get('/api/v1/demos/99999')
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'No demo found.');
        done();
      });
  });

  it('should be able to create a demo if logged in', (done) => {
    request(app)
      .post('/api/v1/demos')
      .send(demoRequest)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        expect(res.body.demo).to.be.an('object');
        expect(res.body.demo).to.have.all.keys(demoKeys);
        id = res.body.demo.id; // eslint-disable-line prefer-destructuring
        done();
      });
  });

  it('should be able to update a demo if logged in', (done) => {
    const updatedPost = demoRequest;
    const newTitle = faker.lorem.sentence(1);
    updatedPost.demo.demoTitle = newTitle;

    request(app)
      .patch(`/api/v1/demos/${id}`)
      .send(updatedPost)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body.demo).to.be.an('object');
        expect(res.body.demo).to.have.all.keys(demoKeys);
        done();
      });
  });

  it('update should error with wrong demo slug', (done) => {
    request(app)
      .patch('/api/v1/demos/99999')
      .send(demoRequest)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'No demo found.');
        done();
      });
  });

  it('should be able to delete a demo if logged in', (done) => {
    request(app)
      .delete(`/api/v1/demos/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(202)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.deep.property('success', 'Demo successfully deleted.');
        done();
      });
  });

  it('should error with wrong delete demo slug', (done) => {
    request(app)
      .get(`/api/v1/demos/${id}`)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'No demo found.');
        done();
      });
  });

  it('it should reject demo with no title', (done) => {
    request(app)
      .post('/api/v1/demos')
      .send({ demo: {} })
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'A demoTitle is required.');
        done();
      });
  });
});
