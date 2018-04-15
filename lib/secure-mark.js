const debug = require('debug')('seasonvar:secure-mark');
const FailedToObtainSecurityMark = require('./error/failed-to-obtain-security-mark');

class SecureMark {
  /**
   * @param {Movie} movies
   */
  async obtain(...movies) {
    let secureMark = null;

    for (let movie of movies) {
      const movieHtml = await movie.client.request(movie.path);
      
      secureMark = this.matchSecurityMark(movieHtml);

      if (secureMark) {
        break;
      }
    }

    debug('secure mark:', secureMark);

    if (!secureMark) {
      throw new FailedToObtainSecurityMark();
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
