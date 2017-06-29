var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var assert = chai.assert;

chai.use(chaiHttp);

describe('Dates API', function() {
  it('should connect /:date GET', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res){
        assert.equal(res.status, 200);
        done();
      });
  });
  it('should return json /:date GET', function(done) {
    chai.request(server)
      .get('/test')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        done();
      });
  });
  it('should have property of unix /:date GET', function(done) {
    chai.request(server)
      .get('/test')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'unix');
        done();
      });
  });
  it('should have property of natural /:date GET', function(done) {
    chai.request(server)
      .get('/test')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'natural');
        done();
      });
  });
  it('should return null in natural property when provided an invalid date string /:date GET', function(done) {
    chai.request(server)
      .get('/test')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'natural');
        assert.isNull(res.body.natural);
        done();
      });
  });
  it('should return null in unix property when provided an invalid date string /:date GET', function(done) {
    chai.request(server)
      .get('/test')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'unix');
        assert.isNull(res.body.unix);
        done();
      });
  });
  it('should return string in natural property when provided a valid date string /:date GET', function(done) {
    chai.request(server)
      .get('/December 1, 2015')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'natural');
        assert.typeOf(res.body.natural, 'string');
        done();
      });
  });
  it('should return number in unix property when provided a valid date string /:date GET', function(done) {
    chai.request(server)
      .get('/December 1, 2015')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'unix');
        assert.typeOf(res.body.unix, 'number');
        done();
      });
  });
  it('should return 1448928000 in unix property when provided a valid date string of December 1, 2015 /:date GET', function(done) {
    chai.request(server)
      .get('/December 1, 2015')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'unix');
        assert.equal(res.body.unix, 1448928000);
        done();
      });
  });
  it('should return December 1, 2015 in natural property when provided a valid date string of December 1, 2015 /:date GET', function(done) {
    chai.request(server)
      .get('/December 1, 2015')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'natural');
        assert.equal(res.body.natural, "December 1, 2015");
        done();
      });
  });
  it('should return 1448928000 in unix property when provided a valid unix timestamp of 1448928000 /:date GET', function(done) {
    chai.request(server)
      .get('/1448928000')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'unix');
        assert.equal(res.body.unix, 1448928000);
        done();
      });
  });
  it('should return December 1, 2015 in natural property when provided a valid unix timestamp of 1448928000 /:date GET', function(done) {
    chai.request(server)
      .get('/1448928000')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'natural');
        assert.equal(res.body.natural, "December 1, 2015");
        done();
      });
  });
  it('should return 1448928000 in unix property when provided a valid date string of December 2015 /:date GET', function(done) {
    chai.request(server)
      .get('/December 2015')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'unix');
        assert.equal(res.body.unix, 1448928000);
        done();
      });
  });
  it('should return December 1, 2015 in natural property when provided valid date string of December 2015 /:date GET', function(done) {
    chai.request(server)
      .get('/December 2015')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.property(res.body, 'natural');
        assert.equal(res.body.natural, "December 1, 2015");
        done();
      });
  });
});