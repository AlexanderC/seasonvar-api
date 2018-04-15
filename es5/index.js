'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
  secureMark(movie = null) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (_this._secureMark) {
        return _this._secureMark;
      } else if (movie) {
        try {
          _this._secureMark = yield new SecureMark().obtain(movie);

          return _this._secureMark;
        } catch (error) {}
      }

      // @todo find a smarter way of doing it
      const movies = yield _this.autocomplete('a');

      _this._secureMark = new SecureMark().obtain(...movies);

      return _this._secureMark;
    })();
  }

  /**
   * @param {Movie} movie 
   */
  episodes(movie) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      return movie.playlist.obtain((yield _this2.secureMark()));
    })();
  }

  /**
   * @param {number} period 
   */
  top(period = Search.TOP_MONTH) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const search = new Search();

      return search.top(_this3.client, period);
    })();
  }

  /**
   * @param {string} query 
   */
  autocomplete(query) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const search = new Search();

      return search.autocomplete(_this4.client, query);
    })();
  }

  /**
   * @param {*} options 
   */
  static create(options = {}) {
    return new this(Client.create(options));
  }
}

module.exports = SeasonvarAPI;