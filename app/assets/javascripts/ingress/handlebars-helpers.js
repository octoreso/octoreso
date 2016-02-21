Handlebars.registerHelper('t', function(prefix, key) {
  return I18n.translate(prefix + '.' + key);
});

Handlebars.registerHelper("index", function(value, options)
{
  return parseInt(value) + 1;
});

Handlebars.registerHelper('times', function(n, block) {
  var accum = '';
  for(var i = 0; i < n; ++i)
  {
    accum += block.fn(i);
  }

  return accum;
});
