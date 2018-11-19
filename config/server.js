/* eslint no-unused-vars: ["error", { "args": "none" }] */
const express = require('express');

const app = express();
const apiRoutes = require('../api/router');

// Import middleware setup
require('./middlewares')(app);

// Import route file
app.use('/api/v1', apiRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
