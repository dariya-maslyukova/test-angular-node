const router = require('express-promise-router')();
const request = require('request');

router.get('/', function(req, res) {
  getJson(req.query.code, req, res);
});

function getJson(code, req, res) {
  let headers, options;

  // Set the headers
  headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
  };

  // Configure the request
  options = {
    url: 'https://smida-dev.test.idoc.com.ua/api/registry/okpoCard',
    method: 'GET',
    headers: headers,
    qs: { code }
  };

  // Start the request
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    } else {
      console.log(error);
    }
  });
}

module.exports = router;
