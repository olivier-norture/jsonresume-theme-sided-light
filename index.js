const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// On définit le helper manquant
Handlebars.registerHelper('lowercase', function(str) {
  return str ? str.toLowerCase() : "";
});

// Met en gras l'amorce d'une puce ("Titre : texte") et supporte **gras**
Handlebars.registerHelper('lead', function(str) {
  if (!str) return "";
  let out = Handlebars.escapeExpression(str);
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  if (!out.includes('<strong>')) {
    const m = out.match(/^(.{3,60}?)\s:\s(.+)$/s);
    if (m) out = '<strong class="lead">' + m[1] + ' :</strong> ' + m[2];
  }
  return new Handlebars.SafeString(out);
});

const themeDir = __dirname;

module.exports = {
  render: function(resume) {
    const template = fs.readFileSync(path.join(themeDir, "index.hbs"), "utf-8");
    return Handlebars.compile(template)({ resume });
  }
};