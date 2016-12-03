var express = require('express');
var root = process.cwd();
var config = require(root + '/lib/config');
var router = express.Router();
var url = require('url');
var ShopifyService = require(root + '/services/ShopifyService');
var OAuth = require('oauth').OAuth2;

router.get('/shop', (req, res) => {
  console.log(req.session.oauth_access_token)
  ShopifyService.getShopInfo(req.session.shopUrl, req.session.oauth_access_token, (err, email) => {
    if (err) {
      res.status(404).send();
    } else {
      res.send(email);
    }
  });
});

router.get('/products', (req, res) => {
  console.log(req.session.oauth_access_token)
  ShopifyService.getShopProducts(req.session.shopUrl, req.session.oauth_access_token, (err, email) => {
    if (err) {
      res.status(404).send();
    } else {
      res.send(email);
    }
  });
});

module.exports = router;
