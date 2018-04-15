const debug = require('debug')('seasonvar:movie');
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

  get playlist() {
    return new Playlist(this);
  }

  toJSON() {
    const { id, cover, rating, votes, path, url, title } = this;

    return { id, cover, rating, votes, path, url, title };
  }

  /**
   * @param {Client} client 
   * @param {*} $ 
   */
  static fromDoc(client, $) {
    const movies = [];
    const self = this;

    $('div.pgs-search-wrap').each(function parseMovieBlock() {
      // @todo figure out how to parse rating in tops
      const votes = 0;
      const rating = 0;
      const $link = $(this).children('a.pst');
      const path = $link.attr('href');
      const id = self.parseIdFromCover($link.children('img').attr('src'));
      const title = self.extractTitleFromItem($(this));
      const movie = new self(
        client,
        { title, id, path, votes, rating }
      );

      debug(JSON.stringify(movie));

      movies.push(movie);
    });

    return movies;
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
   * @param {*} $item  
   */
  static extractTitleFromItem($item) {
    const $info = $item.children('div.pgs-search-info');

    $info.find('br').replaceWith(' / ');
    $info.find('p').remove();

    return $info.text().replace(/\s+/g, ' ').trim();
  }

  /**
   * @param {string} cover 
   */
  static parseIdFromCover(cover) {
    return (cover.match(/\/(\d+)\.jpg$/) || [])[1];
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
