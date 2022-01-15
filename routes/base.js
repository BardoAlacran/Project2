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
      res.render('home', { games, user });
    } catch (e) {
      next(e);
    }
  });
 
  router.get('/profile', async (req, res, next) => {
    const user = req.session.currentUser;

    try {
      const favorites = await Favorite.find({ user: user._id }).populate('game');

      res.render('profile.hbs', { favorites, user });
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


  router.get('/logout', function (req, res) {
    req.session.destroy(() => {
      res.redirect('/');
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
