/* eslint-disable no-underscore-dangle */
const express = require('express');
const { isLoggedIn } = require('../middlewares');

const Game = require('../models/game');
const Favorite = require('../models/favorite');
const User = require('../models/user');

function baseRoutes() {
  const router = express.Router();

  router.get('/', isLoggedIn, async (req, res, next) => {
    const user = req.session.currentUser;

    try {
      const games = await Game.find({ available: 'yes' });
      const favGames = await Favorite.find({ user: user._id }, { game: 1, _id: 0 });

      const favGamesId = favGames.map(fav => fav.game.toString());

      const gamesWithFav = games.map(game => {
        if (favGamesId.includes(game._id.toString())) {
          return {
            _id: game._id,
            name: game.name,
            year: game.year,
            rating: game.rating,
            description: game.description,
            image: game.image,
            numOfPlayers: game.numOfPlayers,
            playingTime: game.playingTime,
            difficulty: game.difficulty,
            createdBy: game.createdBy,
            available: game.available,
            isFavorite: true,
          };
        }
        return {
          _id: game._id,
          name: game.name,
          year: game.year,
          rating: game.rating,
          description: game.description,
          image: game.image,
          numOfPlayers: game.numOfPlayers,
          playingTime: game.playingTime,
          difficulty: game.difficulty,
          createdBy: game.createdBy,
          available: game.available,
          isFavorite: false,
        };
      });

      res.render('home', { games: gamesWithFav, user });
    } catch (e) {
      next(e);
    }
  });
  router.get('/filter', async (req, res, next) => {
    const user = req.session.currentUser;
    const { name } = req.query;
    const revName = name[0].toUpperCase() + name.substring(1);
    try {
      const games = await Game.find({ name: revName });

      res.render('home', { games, user });
    } catch (e) {
      next(e);
    }
  });

  router.get('/profile', async (req, res, next) => {
    const user = req.session.currentUser;

    try {
      const favorites = await Favorite.find({ user: user._id }).populate('game');
      const creator = await Game.find({ createdBy: user._id });

      res.render('profile.hbs', { favorites, creator, user });
    } catch (e) {
      next(e);
    }
  });

  router.get('/profile/edit', async (req, res, next) => {
    const user = req.session.currentUser;

    try {
      const userProfile = await User.find({ user: user._id });
      res.render('profile/edit.hbs', { userProfile });
    } catch (e) {
      next(e);
    }
  });
  router.post('/profile/edit', async (req, res, next) => {
    const user = req.session.currentUser;
    const { username } = req.body;

    try {
      const userUpdated = await User.findByIdAndUpdate(user._id, { username }, { new: true });
      req.session.currentUser = { _id: userUpdated._id, email: userUpdated.email, username: userUpdated.username };
      res.redirect(`/profile`);
    } catch (e) {
      next(e);
    }
  });

  // TODO remove this route
  router.get('/logout', function (req, res) {
    req.session.destroy(() => {
      res.redirect('/'); // Inside a callback… bulletproof!
    });
  });

  router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {
      res.redirect('/');
      if (err) next(err);
    });
  });

  return router;
}

module.exports = baseRoutes;
