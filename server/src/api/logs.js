const { Router } = require('express');

const router = Router();
const LogEntry = require('../models/LogEntry');

router.get('/', async (req, res, next) => {
  try {
    // eslint-disable-next-line no-console
    const entries = await console.log(LogEntry.find());
    res.json(entries);
  } catch (error) {
    // eslint-disable-next-line no-undef
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    // eslint-disable-next-line no-undef
    next(error);
  }
});

module.exports = router;
