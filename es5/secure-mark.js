function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const debug = require('debug')('seasonvar:secure-mark');
const FailedToObtainSecurityMark = require('./error/failed-to-obtain-security-mark');

class SecureMark {
  /**
   * @param {Movie} movie
   */
  obtain(movie) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const movieHtml = yield movie.client.request(movie.path);
      const secureMark = _this.matchSecurityMark(movieHtml);

      debug('secure mark:', secureMark);

      if (!secureMark) {
        throw new FailedToObtainSecurityMark('Unable to match on any of movies pages.');
      }

      return secureMark;
    })();
  }

  /**
   * @param {string} movieHtml 
   */
  matchSecurityMark(movieHtml) {
    const rawSecurityMark = (movieHtml.match(/'secureMark': '(\w+)',/) || [])[1];

    return rawSecurityMark ? `${rawSecurityMark}0` : null;
  }
}

module.exports = SecureMark;