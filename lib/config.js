const { URL } = require('url');

class Config {
  constructor({ baseUrl = Config.BASE_URL }) {
    this.baseUrl = baseUrl;
  }

  /**
   * @param {string} path 
   */
  url(path) {
    return new URL(path, this.baseUrl).toString();
  }

  /**
   * @param {string} path 
   */
  cdnUrl(path) {
    return new URL(path, this.cdnBaseUrl).toString();
  }

  get cdnBaseUrl() {
    return this.baseUrl.replace(/^(https?:\/\/)(.+)$/i, '$1cdn.$2');
  }

  static get BASE_URL() {
    return 'http://seasonvar.ru';
  }
}

module.exports = Config;
