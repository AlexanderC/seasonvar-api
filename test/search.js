const chai = require('chai');
const debug = require('debug')('seasonvar:test');
const chaiUrlPlugin = require('chai-url');
const Client = require('../lib/client');
const Search = require('../lib/search');
const Movie = require('../lib/movie');

chai.use(chaiUrlPlugin);

const { expect } = chai;

describe('Search', function securityMark() {
  it('top', async function top() {
    const movies = await new Search().top(Client.create());

    expect(movies).to.be.an('array').that.have.lengthOf.at.least(1);
    expect(movies[0]).to.be.an.instanceof(Movie);
    expect(movies[0].id).to.be.a('string');
    expect(movies[0].path).to.be.a('string');
    expect(movies[0].title).to.be.a('string');
    expect(movies[0].votes).to.be.a('number').that.is.least(0);
    expect(movies[0].rating).to.be.a('number').that.is.least(0);
    expect(movies[0].url).to.contain.hostname('seasonvar.ru');
    expect(movies[0].url).to.contain.path('.html');
    expect(movies[0].cover).to.contain.hostname('seasonvar.ru');
    expect(movies[0].cover).to.contain.path('.jpg');
  });

  it('autocomplete', async function autocomplete() {
    const movies = await new Search().autocomplete(Client.create(), 'luci');

    expect(movies).to.be.an('array').that.have.lengthOf.at.least(1);
    expect(movies[0]).to.be.an.instanceof(Movie);
    expect(movies[0].id).to.be.a('string');
    expect(movies[0].path).to.be.a('string');
    expect(movies[0].title).to.be.a('string');
    expect(movies[0].votes).to.be.a('number').that.is.least(0);
    expect(movies[0].rating).to.be.a('number').that.is.least(0);
    expect(movies[0].url).to.contain.hostname('seasonvar.ru');
    expect(movies[0].url).to.contain.path('.html');
    expect(movies[0].cover).to.contain.hostname('seasonvar.ru');
    expect(movies[0].cover).to.contain.path('.jpg');
  });
});
