var request = require('request');

function makeRequest(shopUrl, shopToken, qs, cb) {
  if (!shopUrl.startsWith('https://')) {
    if (shopUrl.startsWith('http://')) {
      shopUrl = shopUrl.replace('http', 'https');
    } else {
      shopUrl = 'https://' + shopUrl;
    }
  }

  var options = {
    url: shopUrl,
    headers: {
      'X-Shopify-Access-Token': shopToken,
    },
    qs: qs,
  };

  request(options, function (err, res, body) {
    if (err) { return cb(err); }

    var body = JSON.parse(body);
    var keys = Object.keys(body);

    return cb(null, body[keys[0]]);
  });
}

function getShopInfo(shopUrl, shopToken, cb) {
  console.log(shopUrl)
  console.log(shopToken)
  shopUrl = shopUrl + '/admin/shop.json';
  return makeRequest(shopUrl, shopToken, '', cb);
}

function getShopOrders(shopUrl, shopToken, qs, cb) {
  shopUrl = shopUrl + '/admin/orders.json';

  return makeRequest(shopUrl, shopToken, qs, cb);
}

function getShopCustomers(shopUrl, shopToken, cb) {
  shopUrl = shopUrl + '/admin/customers.json';
  return makeRequest(shopUrl, shopToken, '', cb);
}

function getShopProducts(shopUrl, shopToken, cb) {
  shopUrl = shopUrl + '/admin/products.json';
  return makeRequest(shopUrl, shopToken, '', cb);
}

function getShopEmail(shopUrl, shopToken, cb) {
  return getShopInfo(shopUrl, shopToken, function (err, shopInfo) {
    if (err) { return cb(err); }

    return cb(null, shopInfo.email);
  });
}

function postShopOrder(shopUrl, shopToken, order, cb) {
  shopUrl += '/admin/orders.json';
  if (!shopUrl.startsWith('https://')) {
    if (shopUrl.startsWith('http://')) {
      shopUrl = shopUrl.replace('http', 'https');
    } else {
      shopUrl = 'https://' + shopUrl;
    }
  }

  var options = {
    url: shopUrl,
    headers: {
      'X-Shopify-Access-Token': shopToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order),
  };

  request.post(options, function (err, res, body) {
    if (err) return cb(err);

    var body = JSON.parse(body);
    var keys = Object.keys(body);

    return cb(null, body[keys[0]]);
  });
}

module.exports = {
  getShopInfo: getShopInfo,
  verifyToken: getShopInfo,
  getShopEmail: getShopEmail,
  getShopOrders: getShopOrders,
  getShopCustomers: getShopCustomers,
  postShopOrder: postShopOrder,
  getShopProducts: getShopProducts,
}
