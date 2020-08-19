const path = require('path');
const express = require('express');
const compression = require('compression');

module.exports = function addProdMiddlewares(app, options) {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(publicPath, express.static(outputPath));

  // set up rate limiter: maximum of five requests per minute
  const RateLimit = require('express-rate-limit');
  const limiter = new RateLimit({
    windowMs: 1*60*1000, // 1 minute
    max: 5
  });

  // apply rate limiter to all requests
  app.use(limiter);

  app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
};
