const assert = require('assert');
const { render } = require('./index.js');

// NOTE: this theme's work section reads {{name}} for the company (see index.hbs),
// not the canonical JSON Resume {{company}} field.
const resume = {
  basics: { name: 'Jean Dupont', label: 'Ingénieur', summary: 'Résumé de test' },
  work: [
    {
      name: 'Acme',
      position: 'Dev',
      startDate: '2020-01-01',
      summary: 'Conception et développement',
      highlights: ['Point un', 'Point deux']
    }
  ],
  education: [{ institution: 'École X', area: 'Info', studyType: 'Master' }]
};

const html = render(resume);

assert.ok(html.includes('<!DOCTYPE html>'), 'output should be a full HTML document');
assert.ok(html.includes('Jean Dupont'), 'output should contain the resume name');
assert.ok(html.includes('Acme'), 'output should contain work entries');
assert.ok(html.includes('Point un'), 'output should contain work highlights');
assert.ok(html.includes('bootstrap.min.css'), 'template should load Bootstrap assets');

console.log('Smoke test passed: render() produced valid output (%d bytes)', html.length);
