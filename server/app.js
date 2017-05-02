const express = require('express');
const hbs = require('hbs');

const client = `${ process.cwd() }/dist`;

const app = express();
app.set('view engine', 'html');
app.set('views', client);
app.use(express.static(client));
app.use(express.static(`${ client }/assets`));
app.engine('html', hbs.__express);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000);