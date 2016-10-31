// CONSTANTS
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/ClientDirectoryAPIdb';


// PACKAGE REQUIRES
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

// DB CONNECT
require('mongoose').connect(MONGO_URI, (err) => {
  if (err) throw new Error(err);
  process.stdout.write(`MongoDB connected to ${MONGO_URI}`);
});

// APP DECLARATION
const app = express();
const server = http.createServer(app);

// WEBPACK CONFIG
const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(require('webpack-hot-middleware')(compiler));

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use('/api', require('./routes/api'));

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../src/index.html');
  res.sendFile(indexPath);
});

// SERVER LISTEN
server.listen(PORT, (err) => {
  if (err) throw err;
  process.stdout.write(`Server listening at http://localhost:${PORT}`);
});
