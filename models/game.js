const mongoose = require('mongoose');
const Schema = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  year: {
    type: Number,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    /*default: String*/
  },
  numOfPlayers: {
    type: String,
  },
  playingTime: {
    type: String,
  },
  difficulty: {
    type: String,
    enum: ['baby', 'easy', 'medium', 'hard', 'extrachallenging'],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  available: {
    type: String,
    enum: ['yes', 'no']
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
