const express = require('express');
const morgan = require('morgan'); // logs API transactions
const helmet = require('helmet'); // increases app security
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const middlewares = require('./middlewares');
const logs = require('./api/logs');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
const port = process.env.PORT || 1337;
app.get('/', (req, res) => {
  res.json({
    message: 'Hello, World!',
  });
});
app.use('/api/logs', logs);
app.use(middlewares.corsPassBy);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on Port', port);
});
