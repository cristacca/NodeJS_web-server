const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
var viewsPartials = __dirname + '/views/partials';
var publicFolder = __dirname + '/public/';

hbs.registerPartials(viewsPartials)
app.set('view engine','hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  });
  next();
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(publicFolder));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    message: 'Bem-vindos, Terráqueos!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request.'
  });
});

app.listen(3000, () =>{
  console.log('Server is up on port 3000');
});
