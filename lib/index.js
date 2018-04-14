'use strict';

const Client = require('./client');
const Search = require('./search');

class SeasonvarAPI {
  /**
   * @param {Client} client 
   */
  constructor(client) {
    this.client = client;
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
