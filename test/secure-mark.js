const { expect } = require('chai');
const Client = require('../lib/client');
const SecureMark = require('../lib/secure-mark');

describe('SecureMark', function secureMark() {
  it('obtains secure mark', async function obtain() {
    const movie = { client: Client.create(), path: 'serial-12106-Lyutcifer---01-sezon.html' };

    expect(await new SecureMark().obtain(movie)).to.be.a('string');
  });
});
