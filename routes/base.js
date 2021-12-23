const express = require('express');
//const { isLoggedIn } = require('../middlewares');

const Game = require('../models/game');
//const Favorite = require('../models/favorite');

function baseRoutes() {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    //const user = req.session.currentUser;

    try {
      const games = await Game.find();
      res.render('home', {games})
    } catch(e) {
      next(e);
    }

    // try {
    //   const games = await Game.find();
    //   const favoritesByUser = await Favorite.find({
    //     user: user._id,
    //   });

    //   const courseWithCurrency = courses.map(course => {
    //     let currency;
    //     if (course.country === 'spain') {
    //       currency = '€';
    //     } else {
    //       currency = '$';
    //     }

    //     const newCourse = {
    //       ...course.toObject(),
    //       // currency: currency,
    //       isFavorite: favoritesByUser.some(({ course: favCourse }) => favCourse.toString() === course._id.toString()),
    //       currency,
    //     };
    //     return newCourse;
    //   });
    //   res.render('home.hbs', { name: user ? user.email : 'Anónimo', courses: courseWithCurrency });
    // } catch (e) {
    //   next(e);
    // }
  });

  router.get('/profile', async (req, res, next) => {
    const user = req.session.currentUser;

    try {
      res.render('profile')
    } catch(e){
      next(e);
    }

    // try {
    //   const favorites = await Favorite.find({ user: user._id }).populate('course');

    //   res.render('profile.hbs', { favorites });
    // } catch (error) {
    //   next(error);
    // }

}

module.exports = baseRoutes;
