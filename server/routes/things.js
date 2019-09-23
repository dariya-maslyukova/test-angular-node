const router = require('express-promise-router')();
const request = require('request');

router.get('/', function(req, res) {
  getJson('code', req.query.code, req, res, 'https://smida-dev.test.idoc.com.ua/api/registry/okpoCard');
});

router.get('/propositions/', function(req, res) {
  getJson('sOKPO', req.query.sOKPO, req, res, 'https://smida-dev.test.idoc.com.ua/api/registry/getTranslatedModels');
});

function getJson(queryType, query, req, res, url) {
  let headers, options;

  // Set the headers
  headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  // Configure the request
  if (queryType === 'code') {
    options = {
      url,
      method: 'GET',
      headers: headers,
      qs: {code: query}
    }
  }

  if (queryType === 'sOKPO') {
    options = {
      url,
      method: 'GET',
      headers: headers,
      qs: {sOKPO: query}
    }
  }

  // Start the request
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    } else {
      console.log(error);
    }
  });
}

module.exports = router;
