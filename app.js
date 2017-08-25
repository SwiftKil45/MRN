var express = require('express');
var app = express();
var path = require('path');
var users = require('./users.js');
var db = require('./data.json');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', users);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'./public/test.html'));
});

app.use(express.static('public')); 

app.listen(8000, function () {
  console.log('Page is on port 8000');
});