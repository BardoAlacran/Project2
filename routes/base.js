const express = require('express');
const { isLoggedIn } = require('../middlewares');

const Game = require('../models/game');
const Favorite = require('../models/favorite');

function baseRoutes() {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    const user = req.session.currentUser;

    try {
      const games = await Game.find();
      const favoritesByUser = await Favorite.find({
        user: user._id,
      });

        const newGame = {
          ...game.toObject(),
          // currency: currency,
          isFavorite: favoritesByUser.some(({ game: favGame }) => favGame.toString() === game._id.toString()),
          currency,
        };
        return newGame;
      });
      res.render('home.hbs', { name: user ? user.email : 'Anónimo'});
    } catch (e) {
      next(e);
    }
  });

  router.get('/profile', isLoggedIn, async (req, res, next) => {
    const user = req.session.currentUser;

    try {
      const favorites = await Favorite.find({ user: user._id }).populate('game');

      res.render('profile.hbs', { favorites });
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = baseRoutes;
