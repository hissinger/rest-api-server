const express = require('express');

const app = express();
app.use('/users', require('./api/users'));

module.exports = app;