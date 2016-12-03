var config = {
  "appName":       "Shopify Embedded App",
  "port":          process.env.PORT || 8080,
  "sslPort":        process.env.SSLPORT || 8443,
  "apiKey":        'API Key from Shopify App', // Shopify Partners -> Apps
  "clientSecret":  "", // Shopify Partners -> Apps
  "sslKey":        "./keys/key.pem", // Self-signed are fine in dev
  "sslCert":       "./keys/cert.pem",
  "scope":         "read_orders,read_products",
  "redirectUrl":   "http://localdev.com/auth_token",
  "sessionSecret": "keyboard cat",
}

module.exports = config;
