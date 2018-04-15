function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const axios = require('axios');
const cheerio = require('cherio');
const debug = require('debug')('seasonvar:client');
const Config = require('./config');

class Client {
  /**
   * @param {Config} config
   */
  constructor(config) {
    this.config = config;
  }

  /**
   * @param {string} url 
   * @param {string} method 
   * @param {*} params 
   * @param {*} data 
   */
  requestDoc(url, method = 'GET', params = null, data = null) {
    var _this = this;

    return _asyncToGenerator(function* () {
      debug('request doc');

      const html = yield _this.request(url, method, params, data);

      return cheerio.load(html.toString());
    })();
  }

  /**
   * @param {string} url 
   * @param {string} method 
   * @param {*} params 
   * @param {*} data 
   */
  request(url, method = 'GET', params = null, data = null) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      url = _this2.config.url(url);

      debug(method, 'request to', url, 'using data =', data, 'params =', params);

      const response = yield axios.request({ url, method, data, params });

      return response.data;
    })();
  }

  /**
   * @param {*} options 
   */
  static create(options = {}) {
    return new this(new Config(options));
  }
}

module.exports = Client;