const app = require('./server');
const request = require('supertest');
const expect = require('chai').expect;

// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE
// to run the test type mocha server/specs.js

describe('[LIONS]', function () {

    let lion;
    let id;
    let retrievedLion;

    beforeEach(() => {
        lion = {
            name: 'Simba',
            pride: 'Hey boo',
            age: '2',
            gender: 'male'
        };
    });

    it('should get all lions', function (done) {
        request(app)
            .get('/lions')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, resp) {
                expect(resp.body).to.be.an('array');
                done();
            })
    });

    it('should create a new lion', (done) => {
        request(app)
            .post('/lions')
            .send(lion)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                const simba = res.body;

                expect(simba.name).to.be.equal('Simba');
                expect(simba.pride).to.be.equal('Hey boo');
                expect(simba.age).to.be.equal('2');
                expect(simba.gender).to.be.equal('male');
                expect(simba.id).to.be.equal('1');
                id = simba.id;

                done();
            });
    });

    it('should get a lion by ID', (done) => {
        request(app)
            .get('/lions/' + id)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.name).to.be.equal('Simba');
                expect(res.body.pride).to.be.equal('Hey boo');
                expect(res.body.age).to.be.equal('2');
                expect(res.body.gender).to.be.equal('male');
                expect(res.body.id).to.be.equal('1');

                retrievedLion = {
                    name: res.body.name,
                    pride: res.body.pride,
                    age: res.body.age,
                    gender: res.body.gender,
                    id: res.body.id
                };

                done();
            });
    });

    it('should update a lion by ID', (done) => {
        let updatedLion = retrievedLion;
        updatedLion.age = '44';

        request(app)
            .put('/lions/' + id)
            .send(updatedLion)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.name).to.be.equal('Simba');
                expect(res.body.pride).to.be.equal('Hey boo');
                expect(res.body.age).to.be.equal('44');
                expect(res.body.gender).to.be.equal('male');
                expect(res.body.id).to.be.equal('1');

                retrievedLion = {
                    name: res.body.name,
                    pride: res.body.pride,
                    age: res.body.age,
                    gender: res.body.gender,
                    id: res.body.id
                };

                done();
            });
    });

    it('should delete a lion by ID', (done) => {
        request(app)
            .delete('/lions/' + id)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.name).to.be.equal('Simba');
                expect(res.body.pride).to.be.equal('Hey boo');
                expect(res.body.age).to.be.equal('44');
                expect(res.body.gender).to.be.equal('male');
                expect(res.body.id).to.be.equal('1');
            });

        request(app)
            .get('/lions/' + id)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.not.deep.include({retrievedLion});
                done();
            });
    });

});


