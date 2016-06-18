var express = require('express');
var app = express();

app.get('/', function (req, res) {
  var text ="";
  for(int i = 0; i < 1999; i++){
    for(int i = 0; i < 1999; i++){
      if(i == k){
        text += i + k;
      }
    }
  }
  res.send('Hello World! Running for raspberry Pi' + text );
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
