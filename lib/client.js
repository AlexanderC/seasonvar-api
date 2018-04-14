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
  async requestDoc(url, method = 'GET', params = null, data = null) {
    debug('request doc');

    const html = await this.request(url, method, params, data);
    
    return cheerio.load(html.toString());
  }

  /**
   * @param {string} url 
   * @param {string} method 
   * @param {*} params 
   * @param {*} data 
   */
  async request(url, method = 'GET', params = null, data = null) {
    url = this.config.url(url);

    debug(
      method, 'request to', url,
      'using data =', data,
      'params =', params
    );

    const response = await axios.request({ url, method, data, params });

    return response.data;
  }

  /**
   * @param {*} options 
   */
  static create(options = {}) {
    return new this(new Config(options));
  }
}

module.exports = Client;
