function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const debug = require('debug')('seasonvar:playlist');
const Episode = require('./episode');

class Playlist {
  /**
   * @param {Movie} movie 
   */
  constructor(movie) {
    this.movie = movie;
  }

  /** 
   * @param {string} secureMark
   */
  obtain(secureMark) {
    var _this = this;

    return _asyncToGenerator(function* () {
      debug('obtain:', _this.movie.id);

      const url = `playls2/${secureMark}/trans/${_this.movie.id}/list.xml`;
      const { playlist } = yield _this.movie.client.request(url);

      return Episode.fromPlaylist(playlist);
    })();
  }
}

module.exports = Playlist;