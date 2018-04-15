const Seasonvar = require('../lib');

(async () => {
  const seasonvar = Seasonvar.create();
  const movies = await seasonvar.autocomplete('lucifer');

  for (let movie of movies) {
    const episodes = await seasonvar.episodes(movie);

    console.log(JSON.stringify({ movie: movie, episodes }, null, '  '));
  }
})();
