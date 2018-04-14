seasonvar-api
============

Node.js api for seasonvar.ru that uses public data, which
means `NO KEY REQUIRED!`.

# Prerequisites

- Node.js >=8.x

# Installation and Usage 

Installation:

```bash
npm install seasonvar-api-nokey
```

Test:

```bash
npm run test
```

Usage:

```javascript
const Seasonvar = require('seasonvar-api-nokey');

const seasonvar = Seasonvar.create();
const movies = await seasonvar.autocomplete('lucifer');
const episodes = await movies[0].playlist();
```

> For more examples see `example/` folder

# Roadmap

- [ ] Add support for translation specific playlists alongside the standard

# Support development

I really love open source, however i do need your help to
keep the library up to date. There are several ways to do it:
open issues, submit PRs, share the library w/ community or simply-

<a href="https://etherdonation.com/d?to=0x4a1eade6b3780b50582344c162a547d04e4e8e4a" target="_blank" title="Donate ETH"><img src="https://etherdonation.com/i/btn/donate-btn.png" alt="Donate ETH"/></a>
