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
  async obtain(secureMark) {
    debug('obtain:', this.movie.id);

    const url = `playls2/${ secureMark }/trans/${ this.movie.id }/list.xml`;
    const { playlist } = await this.movie.client.request(url);

    return Episode.fromPlaylist(playlist);
  }
}

module.exports = Playlist;
