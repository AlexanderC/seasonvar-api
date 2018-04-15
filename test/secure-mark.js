const { expect } = require('chai');
const Client = require('../lib/client');
const Search = require('../lib/search');
const SecureMark = require('../lib/secure-mark');

describe('SecureMark', function secureMark() {
  it('obtains secure mark', async function obtain() {
    const movies = await new Search().top(Client.create());

    expect(await new SecureMark().obtain(movies[0])).to.be.a('string');
  });
});
