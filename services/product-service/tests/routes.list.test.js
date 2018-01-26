process.env.NODE_ENV = 'test';

const chai = require('chai');
const chai_http = require('chai-http');
const should = chai.should();

require('./../src/server');

chai.use(chai_http);
const api_base = 'http://localhost:3000';

describe('routes : list', () => {
    describe('GET /products', () => {
        it('should throw an error', (done) => {
            chai
                .request(api_base)
                .get('/products')
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(404);
                    done();
                });
        });
    });
    describe('GET /products/list', () => {
        it('should return a list of products', (done) => {
            chai
                .request(api_base)
                .get('/products/list')
                .end((err, res) => {
                    should.exist(res.body.payload.products);
                    res.status.should.equal(200);
                    done();
                });
        });
    });

});