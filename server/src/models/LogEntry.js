const mongoose = require('mongoose');

const { Schema } = mongoose;
const requiredString = {
  type: String,
  required: true,
};
const requiredNumber = {
  type: Number,
  required: true,
};
const logEntrySchema = new Schema({
  title: requiredString,
  description: String,
  comment: String,
  image: String,
  latitude: {
    ...requiredNumber,
    min: -90,
    max: 90,
  },
  longitude: {
    ...requiredNumber,
    min: -180,
    max: 180,
  },
  visitDate: {
    required: true,
    type: Date,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },

}, {
  timestamps: true,
});
const LogEntry = mongoose.model('LogEntry', logEntrySchema);
module.exports = LogEntry;
