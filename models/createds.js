const mongoose = require('mongoose');

const { Schema } = mongoose;

const createdSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
    unique: true,
  },
});

createdSchema.index({ user: 1, game: 1 });

const Created = mongoose.model('Created', createdSchema);

module.exports = Created;
