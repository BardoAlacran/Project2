const express = require('express');
const { isLoggedIn } = require('../middlewares');

const Game = require('../models/game');
const Favorite = require('../models/favorite');

function baseRoutes() {
  const router = express.Router();

  router.get('/', isLoggedIn, async (req, res, next) => {
    const user = req.session.currentUser;

    try {
      const games = await Game.find();
      const idString = user._id.toString();
      const favoritesByUser = await Favorite.find({
        user: idString,
      });
      res.render('home', { games, user });
    } catch (e) {
      next(e);
    }
  });

  //   res.render('home.hbs', { name: user ? user.email : 'Anónimo', courses: courseWithCurrency });
  // } catch (e) {
  //   next(e);
  // }

  router.get('/profile', async (req, res, next) => {
    const user = req.session.currentUser;

    try {
      const favorites = await Favorite.find({ user: user._id }).populate('game');
      res.render('profile.hbs', { favorites, user });
    } catch (e) {
      next(e);
    }
  });

  router.get('/logout', async (req, res, next) => {
    try {
      req.session = null;
      res.render('auth/login.hbs');
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = baseRoutes;
