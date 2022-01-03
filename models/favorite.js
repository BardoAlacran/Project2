const mongoose = require('mongoose');

const { Schema } = mongoose;

const favoriteSchema = new Schema({
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

favoriteSchema.index({ user: 1, game: 1 });

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
