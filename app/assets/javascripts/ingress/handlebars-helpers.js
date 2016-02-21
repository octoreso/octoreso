Handlebars.registerHelper('t', function(prefix, key) {
  return I18n.translate(prefix + '.' + key);
});

Handlebars.registerHelper("index", function(value, options)
{
  return parseInt(value) + 1;
});
