var fs = require('fs');
var os = require('os');
var jsdom = require('jsdom');
var async = require('async');
var request = require('request');


var validUnicode = [];
var url = "http://emojipedia.org";
var getUnicode = function () {
  var count = 1;
  var options = {
    method: 'GET',
    url: url,
    headers:{
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:45.0) Gecko/20100101 Firefox/45.0',
      'Connection': 'keep-alive',
    }
  }

  request(options, function (err, response, body) {
    jsdom.env(body, ["http://code.jquery.com/jquery.js"], function(err, window) {
      var jq = window.$;
      var css = "";
      var js = [];

      var headerTwo = jq('h2');
      var categoriesHeader;
      headerTwo.each(function(index){
        if(jq(this).text() === 'Categories'){
          categoriesHeader = jq(this);
        }
      });

      async.each(categoriesHeader.parent().find('li a'), function(link, linkCallback){


        var filePath = jq(link).attr('href');
        var emojiList = {
          method: 'GET',
          url: url + filePath,
          headers:{
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:45.0) Gecko/20100101 Firefox/45.0',
            'Connection': 'keep-alive',
          }
        };

        request(emojiList, function (err, response, body) {
          jsdom.env(body, ["http://code.jquery.com/jquery.js"], function(err, window) {
            var jq = window.$;
            var items = jq('.emoji-list li a');
            console.log(jq('h1').text().substring(1, jq('h1').text().length));

            items.each(function(index){
              var text = jq(this).children('span').text();
              var name = jq(this).clone().children().remove().end().text();

              if(text){
                var hexCodePoint = (text.codePointAt()).toString(16);
                console.log(count, text, hexCodePoint, name);
                css = css + ".emoji-" + hexCodePoint + ":after{ content:\"\\0" + hexCodePoint + "\";}" + "\n";
              };
              count++;

            });
            linkCallback(err);
          });
        });

      }, function(err){
        // fs.writeFile("emojis/emoji.css", css, function(){
        //   console.log("done");
        // })
        console.log("yolo");
      });

    });

  });

};

getUnicode();
