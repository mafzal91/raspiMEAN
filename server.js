var express = require('express');
var app = express();

var www = require('./routers/router-www');

//------------------------------------------------------------------------------

app.use('/', www);

app.listen(3000, function () {
  console-log('Example app listening on port 3000!');
});
