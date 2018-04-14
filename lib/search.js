const debug = require('debug')('seasonvar:search');
const Movie = require('./movie');

class Search {
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
}

module.exports = Search;
