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

### Future releases (automated)

For hands-off version bumps, add a GitHub Actions workflow at
`.github/workflows/publish.yaml`:

```yaml
name: Publish to npm

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://registry.npmjs.org
      - run: npm ci
      - run: npm test
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Then create a repository secret `NPM_TOKEN` (a classic npm access token —
`npm token create`) and release with `git tag v0.2.0 && git push origin
v0.2.0` (bump `version` in `package.json` first).

## License

[MIT](./LICENSE) © olivier-norture