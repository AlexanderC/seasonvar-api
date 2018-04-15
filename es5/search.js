function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const debug = require('debug')('seasonvar:search');
const Movie = require('./movie');

class Search {
  /**
   * @param {Client} client 
   * @param {number} period 
   */
  top(client, period = Search.TOP_MONTH) {
    return _asyncToGenerator(function* () {
      debug('top:', period);

      const $ = yield client.requestDoc('/', 'GET', { mode: 'top', period });

      return Movie.fromDoc(client, $);
    })();
  }

  /**
   * @param {Client} client 
   * @param {string} query 
   */
  autocomplete(client, query) {
    return _asyncToGenerator(function* () {
      debug('autocomplete:', query);

      const response = yield client.request('autocomplete.php', 'GET', { query });

      return Movie.fromAutocompleteResponse(client, response);
    })();
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