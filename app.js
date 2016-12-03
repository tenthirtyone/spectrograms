var express = require('express');
var app = express();
var config = require('./lib/config');
var morgan = require('morgan');
var ejs = require('ejs');

var api = require('./controllers/API');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

app.use(morgan('default'));

app.use('/styles', express.static('build/styles'));
app.use('/scripts', express.static('build/scripts'));
app.use('/img', express.static('build/img'));
app.use('/views', express.static('build/views'));
app.use('/', express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));
app.use(cookieParser());

app.use('/api/', api);
app.listen(config.port, () => {
  console.log('Listening on port: ' + config.port);
});

var https = require('https');
var fs = require('fs');
var privateKey = fs.readFileSync(config.sslKey).toString();
var certificate = fs.readFileSync(config.sslCert).toString();
var credentials = { key: privateKey, cert: certificate };
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(config.sslPort, function () {
  console.log('Listening on port: ', config.sslPort);
});
