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
