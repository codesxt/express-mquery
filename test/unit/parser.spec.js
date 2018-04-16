'use strict';


//global imports
const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const parser = require(path.join(__dirname, '..', '..', 'lib', 'parser'));

describe('parser', function () {

  it('should be an object', function () {
    expect(parser).to.exist;
    expect(parser).to.be.an('object');
  });

  it('should have all required parser', function () {
    expect(parser.filter).to.exist;
    expect(parser.filter).to.be.a('function');

    expect(parser.headers).to.exist;
    expect(parser.headers).to.be.a('function');

    expect(parser.paginate).to.exist;
    expect(parser.paginate).to.be.a('function');

    expect(parser.populate).to.exist;
    expect(parser.populate).to.be.a('function');

    expect(parser.select).to.exist;
    expect(parser.select).to.be.a('function');

    expect(parser.sort).to.exist;
    expect(parser.sort).to.be.a('function');

  });

});