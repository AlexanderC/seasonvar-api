'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
  top(period = Search.TOP_MONTH) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const search = new Search();

      return search.top(_this.client, period);
    })();
  }

  /**
   * @param {string} query 
   */
  autocomplete(query) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const search = new Search();

      return search.autocomplete(_this2.client, query);
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