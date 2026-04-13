const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// On définit le helper manquant
Handlebars.registerHelper('lowercase', function(str) {
  return str ? str.toLowerCase() : "";
});

const themeDir = __dirname;

module.exports = {
  render: function(resume) {
    const template = fs.readFileSync(path.join(themeDir, "index.hbs"), "utf-8");
    return Handlebars.compile(template)({ resume });
  }
};