const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'Node env needs to be in dev move to view stack!' : error.stack,
  });
};

const corsPassBy = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
};

module.exports = {
  notFound,
  errorHandler,
  corsPassBy,
};
