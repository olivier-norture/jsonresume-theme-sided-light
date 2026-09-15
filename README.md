# jsonresume-theme-sided-light

A light, two-column ("sided") HTML theme for [JSON Resume](https://jsonresume.org).
The layout puts your basics and contact info in a left column and the rest of your
experience in a right column. Styling relies on Bootstrap 5.3 and Font Awesome 6.4
loaded from CDN, so the rendered page requires an internet connection.

## Installation

```sh
npm install jsonresume-theme-sided-light
```

## Usage with the JSON Resume CLI ([resumed](https://jsonresume.org/cli))

```sh
resumed render resume.json --theme jsonresume-theme-sided-light -o resume.html
```

You can also use the short theme name (`sided-light`), since all JSON Resume themes
follow the `jsonresume-theme-{name}` naming pattern.

### Programmatic usage

The theme follows the standard JSON Resume theme API — a `render(resume)` function
that returns the full HTML document:

```js
const theme = require('jsonresume-theme-sided-light');
const html = theme.render(require('./resume.json'));
```

## PDF export

The CLI can print the rendered HTML to PDF, or you can pipe it through any
headless browser (e.g. Puppeteer) as described in the
[resumed CLI docs](https://jsonresume.org/cli#pdf-export).

## Development

```sh
npm install
npm test   # smoke test: renders a minimal resume and checks the output
```

## Releasing

### First release (manual)

Publishing v0.1.0 needs your npm credentials once (never commit them):

```sh
npm login
npm publish
```

The package is scoped-free (`jsonresume-theme-sided-light`), so this publishes
to the public registry immediately.

### Publishing (automated)

Every push to `master` is published to npm as `latest` by the workflow in
`.github/workflows/publish.yml`. The pipeline runs the smoke test, auto-bumps
the patch version (`npm version patch --no-git-tag-version`), then publishes.

To enable it, add a repository secret `NPM_TOKEN` (a classic npm access token
— `npm token create`, or a fine-grained token with **Bypass 2FA** enabled).
Each release publishes a new patch version (e.g. `0.1.1`, `0.1.2`, …).

You can also publish locally via the `Makefile`:

```sh
NPM_TOKEN=<your-token> make publish   # bumps the patch version, then publishes
make test                             # run the smoke test
```

## License

[MIT](./LICENSE) © olivier-norture
