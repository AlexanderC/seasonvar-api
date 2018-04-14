const debug = require('debug')('seasonvar:movie');
const SecureMark = require('./secure-mark');
const Playlist = require('./playlist');

class Movie {
  /**
   * @param {Client} client
   * @param {*} data 
   */
  constructor(client, data) {
    this.client = client;
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  get rating() {
    return this.data.rating;
  }

  get votes() {
    return this.data.votes;
  }

  get title() {
    return this.data.title;
  }

  get path() {
    return this.data.path;
  }

  get url() {
    return this.client.config.url(this.path);
  }

  get cover() {
    return this.client.config.cdnUrl(`oblojka/${ this.id }.jpg`);
  }

  async playlist() {
    return new Playlist(this).obtain(
      await new SecureMark().obtain(this)
    );
  }

  toJSON() {
    const { id, cover, rating, votes, path, url, title } = this;

    return { id, cover, rating, votes, path, url, title };
  }

  /**
   * @param {*} response 
   */
  static fromAutocompleteResponse(client, response) {
    const movies = [];

    for (let i = 0; i < (response.data || []).length; i++) {
      const path = response.data[i];

      // weird data
      if (!path || /\/+/.test(path)) {
        continue;
      }

      const title = response.suggestions.valu[i];
      const id = response.id[i];
      const { votes, rating } = this.parseRating(response.suggestions.kp[i]);
      const movie = new this(
        client,
        { title, id, path, votes, rating }
      );

      debug(JSON.stringify(movie));

      movies.push(movie);
    }

    return movies;
  }

  /**
   * @param {string} ratingHtml 
   */
  static parseRating(ratingHtml) {
    let [ , votes, rating ] = ratingHtml.match(
      /:\s*(\d+)\s*"\s*>(\d+(?:\.\d+)?)</
    ) || [];

    votes = parseInt(votes || 0);
    rating = parseFloat(rating || 0);

    return { votes, rating };
  }
}

module.exports = Movie;
