const express = require('express');
const path = require('path');
const app = express();

const indexRouter = require('./routes/indexRouter');
const messagesRouter = require('./routes/messagesRouter');

const PORT = process.env.PORT || 3001;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use('/messages', messagesRouter);
app.use('/', indexRouter);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, () => 
  console.log(`Listening on http://localhost:${PORT}/`)
);
