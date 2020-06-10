/* global describe:false, it:false, beforeEach:false, afterEach:false */

'use strict';

var assert = require('assert');
var kraken = require('kraken-js');
var express = require('express');
var request = require('supertest');

describe('/feeds', function() {

    var app, mock;

    beforeEach(function(done) {
        app = express();
        app.on('start', done);
        app.use(kraken({'basedir': process.cwd()}));
        mock = app.listen(1337);
    });

    afterEach(function(done) {
        mock.close(done);
    });

    it('should return a collection of feeds', function(done) {
        request(mock)
            .get('/feeds')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body instanceof Array, 'Expected an array');
                done();
            });
    });

    it('should return a single feed', function(done) {
        request(mock)
            .get('/feeds/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(typeof res.body.id, 'number', 'Expected a numeric `id` property');
                done();
            });
    });

    it('should return articles for a specific feed', function(done) {
        request(mock)
            .get('/feeds/1/articles')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body instanceof Array, 'Expected an array');
                done();
            });
    });

});
