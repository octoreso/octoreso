Handlebars.registerHelper('t', function(prefix, key) {
  return I18n.translate(prefix + '.' + key);
});
