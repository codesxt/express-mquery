'use strict';


//global imports
const path = require('path');
// const qs = require('qs');
const chai = require('chai');
const express = require('express');
const request = require('supertest');
const expect = chai.expect;
const parser = require(path.join(__dirname, '..', '..', 'lib', 'parser'));

describe('populate', function () {

  const app = express();
  app.use('/populate', function (request, response) {
    parser
      .populate(request.query, function (error, projections) {
        if (error) {
          throw error;
        } else {
          response.json(projections);
        }
      });
  });

  it('should be a function', function () {
    expect(parser.populate).to.exist;
    expect(parser.populate).to.be.a('function');
    expect(parser.populate.name).to.be.equal('populate');
    expect(parser.populate.length).to.be.equal(2);
  });


  it('should parse string based path population', function (done) {
    const _populate = { path: 'customer' };
    const query = { populate: 'customer' };

    parser
      .populate(JSON.stringify(query), function (error, populate) {
        expect(error).to.not.exist;
        expect(populate).to.exist;
        expect(populate).to.have.length(1);
        expect(populate[0]).to.eql(_populate);
        done(error, populate);
      });

  });

  it('should parse string based path population', function (done) {
    const _populate = { path: 'customer' };

    request(app)
      .get('/populate?includes=customer')
      .expect(200, function (error, response) {
        expect(error).to.not.exist;
        const populate = response.body;
        expect(populate).to.exist;
        expect(populate[0]).to.be.eql(_populate);
        done(error, response);
      });

  });


  it('should parse string based paths population', function (done) {
    const _populate = [{ path: 'customer' }, { path: 'items' }];
    const query = { populate: 'customer,items' };

    parser
      .populate(JSON.stringify(query), function (error, populate) {
        expect(error).to.not.exist;
        expect(populate).to.exist;
        expect(populate).to.have.length(2);
        expect(populate).to.eql(_populate);
        done(error, populate);
      });

  });

  it('should parse string based paths population', function (done) {
    const _populate = [{ path: 'customer' }, { path: 'items' }];

    request(app)
      .get('/populate?includes=customer, items')
      .expect(200, function (error, response) {
        expect(error).to.not.exist;
        const populate = response.body;
        expect(populate).to.exist;
        expect(populate).to.be.eql(_populate);
        done(error, response);
      });

  });

  it('should parse string based path with select population',
    function (done) {

      const _populate = { path: 'customer', select: { name: 1 } };
      const query = { populate: 'customer', fields: { customer: 'name' } };

      parser
        .populate(JSON.stringify(query), function (error, populate) {
          expect(error).to.not.exist;
          expect(populate).to.exist;
          expect(populate).to.have.length(1);
          expect(populate[0]).to.eql(_populate);
          done(error, populate);
        });

    });

  it('should parse string based path with select population',
    function (done) {

      const _populate = { path: 'customer', select: { name: 1 } };
      const query = { populate: 'customer', fields: { customer: 'name' } };

      request(app)
        .get('/populate')
        .query(query)
        .expect(200, function (error, response) {
          expect(error).to.not.exist;
          const populate = response.body;
          expect(populate).to.exist;
          expect(populate[0]).to.be.eql(_populate);
          done(error, response);
        });

    });


  it('should parse string based paths with select population',
    function (done) {

      const _populate = [
        { path: 'customer', select: { name: 1 } },
        { path: 'items', select: { name: 1, price: 1 } }
      ];
      const query = {
        populate: 'customer,items',
        fields: {
          customer: 'name',
          items: 'name,price'
        }
      };

      parser
        .populate(JSON.stringify(query), function (error, populate) {
          expect(error).to.not.exist;
          expect(populate).to.exist;
          expect(populate).to.have.length(2);
          expect(populate).to.eql(_populate);
          done(error, populate);
        });

    });

  it('should parse string based paths with exclude select population',
    function (done) {

      const _populate = [
        { path: 'customer', select: { name: 1 } },
        { path: 'items', select: { price: 0 } }
      ];
      const query = {
        populate: 'customer,items',
        fields: {
          customer: 'name',
          items: '-price'
        }
      };

      parser
        .populate(JSON.stringify(query), function (error, populate) {
          expect(error).to.not.exist;
          expect(populate).to.exist;
          expect(populate).to.have.length(2);
          expect(populate).to.eql(_populate);
          done(error, populate);
        });

    });

  it('should parse object based population', function (done) {
    const _populate = { path: 'customer' };
    const query = { populate: _populate };

    parser
      .populate(query, function (error, populate) {
        expect(error).to.not.exist;
        expect(populate).to.exist;
        expect(populate[0]).to.eql(_populate);
        done(error, populate);
      });

  });

  it('should parse object based population with string select',
    function (done) {
      const _populate = { path: 'customer', select: { name: 1 } };
      const query = { populate: { path: 'customer', select: 'name' } };

      parser
        .populate(query, function (error, populate) {
          expect(error).to.not.exist;
          expect(populate).to.exist;
          expect(populate[0]).to.eql(_populate);
          done(error, populate);
        });

    });

  it('should parse object based population with string select',
    function (done) {
      const _populate = {
        path: 'customer',
        select: {
          name: 1,
          price: 0
        }
      };
      const query = { populate: { path: 'customer', select: 'name,-price' } };

      parser
        .populate(query, function (error, populate) {
          expect(error).to.not.exist;
          expect(populate).to.exist;
          expect(populate[0]).to.eql(_populate);
          done(error, populate);
        });

    });

  it('should parse array based population', function (done) {
    const _populate = [{ path: 'customer' }, { path: 'items' }];
    const query = { populate: _populate };

    parser
      .populate(query, function (error, populate) {
        expect(error).to.not.exist;
        expect(populate).to.exist;
        expect(populate).to.eql(_populate);
        done(error, populate);
      });

  });


  it('should parse array based population with selection',
    function (done) {
      const _populate = [
        { path: 'customer', select: { name: 1 } },
        { path: 'items', select: { name: 1, price: 0 } }
      ];
      const query = {
        populate: [
          { path: 'customer', select: 'name' },
          { path: 'items', select: 'name,-price' }
        ]
      };

      parser
        .populate(query, function (error, populate) {
          expect(error).to.not.exist;
          expect(populate).to.exist;
          expect(populate).to.eql(_populate);
          done(error, populate);
        });

    });

});