const url = require('url');

class Config {
  constructor({ baseUrl = Config.BASE_URL }) {
    this.baseUrl = baseUrl;
  }

  /**
   * @param {string} path 
   */
  url(path) {
    return url.resolve(this.baseUrl, path);
  }

  /**
   * @param {string} path 
   */
  cdnUrl(path) {
    return url.resolve(this.cdnBaseUrl, path);
  }

  get cdnBaseUrl() {
    return this.baseUrl.replace(/^(https?:\/\/)(.+)$/i, '$1cdn.$2');
  }

  static get BASE_URL() {
    return 'http://seasonvar.ru';
  }
}

module.exports = Config;
