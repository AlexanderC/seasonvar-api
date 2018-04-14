const debug = require('debug')('seasonvar:episode');
const cheerio = require('cherio');

class Episode {
  /**
   * @param {*} data 
   */
  constructor(data) {
    this.data = data;
  }

  get title() {
    const $ = cheerio.load(this.data.comment);

    $('br').replaceWith(' ');

    return $.text().trim();
  }

  get url() {
    return this.data.file;
  }

  toJSON() {
    const { title, url } = this;

    return { title, url };
  }

  /**
   * @param {*} playlist 
   */
  static fromPlaylist(playlist) {
    return playlist.map(data => {
      const episode = new this(data);

      debug(JSON.stringify(episode));

      return episode;
    });
  }
}

module.exports = Episode;
