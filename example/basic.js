const Seasonvar = require('../lib');

(async () => {
  const seasonvar = Seasonvar.create();
  const movies = await seasonvar.autocomplete('lucifer');
  const episodes = await movies[0].playlist();

  console.log(JSON.stringify({ movie: movies[0], episodes }, null, '  '));
})();
