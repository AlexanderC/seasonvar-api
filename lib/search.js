const debug = require('debug')('seasonvar:search');
const Movie = require('./movie');

class Search {
  /**
   * @param {Client} client 
   * @param {number} period 
   */
  async top(client, period = Search.TOP_MONTH) {
    debug('top:', period);

    const $ = await client.requestDoc(
      '/',
      'GET',
      { mode: 'top', period }
    );

    return Movie.fromDoc(client, $);
  }

  /**
   * @param {Client} client 
   * @param {string} query 
   */
  async autocomplete(client, query) {
    debug('autocomplete:', query);

    const response = await client.request(
      'autocomplete.php',
      'GET',
      { query }
    );

    return Movie.fromAutocompleteResponse(client, response);
  }

  static get TOP_DAY() {
    return 1;
  }

  static get TOP_WEEK() {
    return 7;
  }

  static get TOP_MONTH() {
    return 31;
  }
}

module.exports = Search;
