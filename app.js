const express = require('express');
const hbs = require('express-handlebars').engine;

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');

const app = express();
const port = 3000;

app.engine('hbs', hbs({ defaultLayout: 'main', extname: '.hbs' }));

app.set('view engine', '.hbs');

app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/login', loginRouter);

app.listen(port, function () {
  console.log(`Servidor online na porta ${port}`);
});

module.exports = app;
