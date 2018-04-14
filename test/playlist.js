const chai = require('chai');
const debug = require('debug')('seasonvar:test');
const chaiUrlPlugin = require('chai-url');
const Client = require('../lib/client');
const Search = require('../lib/search');
const Playlist = require('../lib/playlist');
const SecureMark = require('../lib/secure-mark');
const Episode = require('../lib/episode');

chai.use(chaiUrlPlugin);

const { expect } = chai;

describe('Search', function securityMark() {
  it('autocomplete', async function obtain() {
    const client = Client.create();
    const movies = await new Search().autocomplete(client, 'luci');
    const secureMark = await new SecureMark().obtain(movies[0]);
    const episodes = await new Playlist(movies[0]).obtain(secureMark);

    expect(episodes).to.be.an('array').that.have.lengthOf.at.least(1);
    expect(episodes[0]).to.be.an.instanceof(Episode);
    expect(episodes[0].url).to.contain.hostname('cdn.datalock.ru');
    expect(episodes[0].url).to.contain.path('.mp4');
  });
});
