var express = require('express');
var ClientOAuth2 = require('client-oauth2');
var request = require('request');
var url     = require('url');
var router  = express.Router();

var mlhAuth = new ClientOAuth2({
  clientId: "fc30a89abaa8a953a070443edcb5317c3d7d27c0866104a60420e687f4f75cce",
  clientSecret: process.env.SECRET_KEY,
  accessTokenUri: "https://my.mlh.io/oauth/token",
  authorizationUri: "https://my.mlh.io/oauth/authorize",
  redirectUri: "https://profhacks2017.herokuapp.com/mlh/callback",
  scopes: ['email','education','birthday']
});

var mlhRsvp = new ClientOAuth2({
  clientId: "fc30a89abaa8a953a070443edcb5317c3d7d27c0866104a60420e687f4f75cce",
  clientSecret: process.env.SECRET_KEY,
  accessTokenUri: "https://my.mlh.io/oauth/token",
  authorizationUri: "https://my.mlh.io/oauth/authorize",
  redirectUri: "https://profhacks2017.herokuapp.com/mlh/callbackrsvp",
  scopes: ['email','education','birthday']
});

var mlhAdmit = new ClientOAuth2({
  clientId: "fc30a89abaa8a953a070443edcb5317c3d7d27c0866104a60420e687f4f75cce",
  clientSecret: process.env.SECRET_KEY,
  accessTokenUri: "https://my.mlh.io/oauth/token",
  authorizationUri: "https://my.mlh.io/oauth/authorize",
  redirectUri: "https://profhacks2017.herokuapp.com/mlh/callbackadmit",
  scopes: ['email','education','birthday']
});

/** /mlh/auth
* Redirects to MLH Authorization Page to be redirect to callback
*/

router.get('/auth', function(req, res, next) {
  var uri = mlhAuth.code.getUri();

  res.redirect(uri);
  res.end();
});

router.get('/rsvp', function(req, res, next) {
  var uri = mlhRsvp.code.getUri();

  res.redirect(uri);
  res.end();
});

router.get('/callback', function(req,res,next) {
  mlhAuth.code.getToken(req.originalUrl)
    .then(function (user) {
      console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }

      // Refresh the current users access token.
      user.refresh().then(function (updatedUser) {
        console.log(updatedUser !== user) //=> true
        console.log(updatedUser.accessToken)
      });

      // Sign API requests on behalf of the current user.
      user.sign({
        method: 'get',
        url: 'http://example.com'
      })

      // We should store the token into a database.
      request.put({url: 'https://profhacks2017.herokuapp.com/mlh/user', form: {token: user.accessToken}}, function(err, response, body) {
        if(err || response.statusCode !== 200) {
          res.redirect('/');
        } else {
          res.redirect('/form.html?access_token=' + user.accessToken);
        }
        res.end();
      });
    });
});

router.get('/callbackrsvp', function(req,res,next) {
  mlhRsvp.code.getToken(req.originalUrl)
    .then(function (user) {
      console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }

      // Refresh the current users access token.
      user.refresh().then(function (updatedUser) {
        console.log(updatedUser !== user) //=> true
        console.log(updatedUser.accessToken)
      });

      // Sign API requests on behalf of the current user.
      user.sign({
        method: 'get',
        url: 'http://example.com'
      })

      // We should store the token into a database.
      request.put({url: 'https://profhacks2017.herokuapp.com/mlh/user', form: {token: user.accessToken}}, function(err, response, body) {
        if(err || response.statusCode !== 200) {
          res.redirect('/');
        } else {
          res.redirect('/accept.html?access_token=' + user.accessToken);
        }
        res.end();
      });
    });
});

router.put('/user', function(req, res, next) {
  var token = req.body.token;
  request.get('https://my.mlh.io/api/v2/user.json?access_token=' + req.body.token,
    function(err, response, body) {
      if (err || response.statusCode !== 200) {
        console.log('Error:' + err + "\n" + JSON.stringify(response));
        res.status(302).send(response).end();
      } else {
        res.status(200).send(body).end();
      }
    });
});

router.get('/valid', function(req, res, next) {
  var token = req.body.token;
  request.get('https://my.mlh.io/api/v2/user.json?access_token=' + req.body.token,
    function(err, response, body) {
      if (err || response.statusCode !== 200) {
        console.log('Error:' + err + "\n" + JSON.stringify(response));
        res.status(402).send(response).end();
      } else {
        res.status(200).end();
      }
    });
});

module.exports = router;
