const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Business = new Schema({
  id: {
    type: Number
  },
  job_title: {
    type: String
  },
  job_description: {
    type: String
  },
  record_created: {
    type: String
  }
},{
    collection: 'business'
});

module.exports = mongoose.model('Business', Business);