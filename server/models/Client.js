const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    first: { type: String, minlength: 1, require: true },
    last: { type: String, require: true },
  },
  age: {type: Number, min: 0, max: 120 },
  allergies: [{ type: String }],
  gender: { type: String, enum: ["male", "female"] },
  lastVisit: { type: Date, validate: [ function(val) {return val.getTime() < new Date().getTime();}, 'data must be some time in the past'] },
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
