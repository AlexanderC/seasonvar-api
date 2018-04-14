const debug = require('debug')('seasonvar:secure-mark');
const FailedToObtainSecurityMark = require('./error/failed-to-obtain-security-mark');

class SecureMark {
  /**
   * @param {Movie} movie
   */
  async obtain(movie) {
    const movieHtml = await movie.client.request(movie.path);
    const secureMark = this.matchSecurityMark(movieHtml);

    debug('secure mark:', secureMark);

    if (!secureMark) {
      throw new FailedToObtainSecurityMark(
        'Unable to match on any of movies pages.'
      );
    }

    return secureMark;
  }

  /**
   * @param {string} movieHtml 
   */
  matchSecurityMark(movieHtml) {
    const rawSecurityMark = (movieHtml.match(
      /'secureMark': '(\w+)',/
    ) || [])[1];

    return rawSecurityMark ? `${ rawSecurityMark }0` : null;
  }
}

module.exports = SecureMark;
