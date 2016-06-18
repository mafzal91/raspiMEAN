var async = require('async');
var request = require('request');
var jsdom = require('jsdom');


var getIp = function(){

  var options = {
    method: 'GET',
    url: "https://www.google.com/search?q=whats+my+ip",
    headers:{
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:45.0) Gecko/20100101 Firefox/45.0',
      'Connection': 'keep-alive',
    }
  }

  request(options, function (err, response, body) {
    // console.log(body);
    jsdom.env(body, ["http://code.jquery.com/jquery.js"], function(err, window) {
      var jq = window.$;

      console.log("((((((((((((((", jq('body').text());

    });

  });


}

getIp();
