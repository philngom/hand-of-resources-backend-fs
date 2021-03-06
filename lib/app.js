const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/jokes', require('./controllers/jokes'));
app.use('/api/v1/movies', require('./controllers/movies'));
app.use('/api/v1/cars', require('./controllers/cars'));
app.use('/api/v1/albums', require('./controllers/albums'));
app.use('/api/v1/players', require('./controllers/players'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
