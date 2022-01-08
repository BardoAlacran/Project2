const express = require('express');
const { isLoggedIn } = require('../middlewares');

const Game = require('../models/game');
const Favorite = require('../models/favorite');
const Created = require('../models/createds')

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
      const createds = await Created.find({user: user._id}).populate('game')
      res.render('profile.hbs', { favorites, createds, user });
    } catch (e) {
      next(e);
    }
  });

  router.get('/logout', function (req, res) {
    req.session.destroy(() => {
      res.redirect('/'); // Inside a callback… bulletproof!
    });
  });

  router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {
      if (err) next(err);
      res.redirect('/');
    });
  });

  return router;
}

module.exports = baseRoutes;
