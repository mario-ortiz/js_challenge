process.env.NODE_ENV = 'test';

const chai = require('chai');
const chai_http = require('chai-http');
const should = chai.should();

require('./../src/server');

chai.use(chai_http);

describe('routes : search', () => {
    describe('GET /search', () => {
        it('should throw a 404 error', (done) => {
            chai
                .request('http://localhost:3001')
                .get('/products/search')
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(404);
                    done();
                });
        });
    });
    describe('POST /search', () => {
        it('should throw an error if no asin', (done) => {
            chai
                .request('http://localhost:3001')
                .post('/products/search')
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(404);
                    done();
                });
        });
        it('should return an error when wrong formatted asin provided', (done) => {
            chai
                .request('http://localhost:3001')
                .post('/products/search/12345')
                .end((err, res) => {
                    res.body.status.should.equal('error');
                    res.status.should.equal(200);
                    done();
                });
        });
        it('should return an error when wrong asin does not exist', (done) => {
            chai
                .request('http://localhost:3001')
                .post('/products/search/weirotppor')
                .end((err, res) => {
                    res.body.status.should.equal('error');
                    res.status.should.equal(200);
                    done();
                });
        });
        it('should return a list of products when ASIN exists', (done) => {
            chai
                .request('http://localhost:3001')
                .post('/products/search/1234567890')
                .end((err, res) => {
                    res.body.status.should.equal('ok');
                    should.exist(res.body.payload.products);
                    res.status.should.equal(200);
                    done();
                });
        });
    });

});