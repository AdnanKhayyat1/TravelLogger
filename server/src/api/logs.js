const { Router } = require('express');

const router = Router();
const LogEntry = require('../models/LogEntry');

const {
  API_KEY,
} = process.env;
router.get('/', async (req, res, next) => {
  try {
    // eslint-disable-next-line no-console
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    // eslint-disable-next-line no-undef
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log(API_KEY);
    if (req.get('X-API-KEY') !== API_KEY) {
      res.status(401);
      throw new Error('UnAuthroized');
    }
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

router.delete('/id/:id', async (req, res, error, next) => {
  const idToDelete = req.params.id;
  console.log(idToDelete);
  await LogEntry.findByIdAndDelete(idToDelete, () => {
    if (error) {
      console.log(error);
      res.status(400);
      next(error);
    } else {
      console.log('Successful Deletion');
      res.status(200);
    }
  });
});
module.exports = router;
