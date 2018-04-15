'use strict';

const Client = require('./client');
const Search = require('./search');
const SecureMark = require('./secure-mark');

class SeasonvarAPI {
  /**
   * @param {Client} client 
   */
  constructor(client) {
    this.client = client;
    this._secureMark = null;
  }

  resetSecureMark() {
    this._secureMark = null;

    return this;
  }

  /**
   * @todo Figure out if we need to invalidate secure mark
   */
  async secureMark(movie = null) {
    if (this._secureMark) {
      return this._secureMark;
    } else if (movie) {
      try {
        this._secureMark = await new SecureMark().obtain(movie);

        return this._secureMark;
      } catch (error) {}
    }

    // @todo find a smarter way of doing it
    const movies = await this.autocomplete('a');

    this._secureMark = new SecureMark().obtain(...movies);

    return this._secureMark;
  }

  /**
   * @param {Movie} movie 
   */
  async episodes(movie) {
    return movie.playlist.obtain(await this.secureMark());
  }

  /**
   * @param {number} period 
   */
  async top(period = Search.TOP_MONTH) {
    const search = new Search();

    return search.top(this.client, period);
  }

  /**
   * @param {string} query 
   */
  async autocomplete(query) {
    const search = new Search();

    return search.autocomplete(this.client, query);
  }

  /**
   * @param {*} options 
   */
  static create(options = {}) {
    return new this(Client.create(options));
  }
}

module.exports = SeasonvarAPI;
