const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
var { nanoid } = require("nanoid");
const dotenv = require('dotenv');
const app = express();

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true, useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {

  res.render('index', {shortUrl1:{full: 0, short: 0, clicks: 0}});
});

app.post('/shortUrls', async (req, res) => {
  var fullcheck = await ShortUrl.findOne({ full: req.body.fullUrl });

  if(fullcheck == null ){
    await ShortUrl.create({ full: req.body.fullUrl });
    var added = await ShortUrl.findOne({ full: req.body.fullUrl });
    res.render('index', { shortUrl1: added });
  }else{
    res.render('index', { shortUrl1: fullcheck });
  }
  
});

app.get('/:shortUrl', async (req, res) => {
  const shortUrl1 = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl1 == null) return res.sendStatus(404);

  shortUrl1.clicks++
  shortUrl1.save();

  res.redirect(shortUrl1.full);
});

app.listen(process.env.PORT || 2000, () => console.log('server up!'));