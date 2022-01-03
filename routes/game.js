const express = require('express');
const async = require('hbs/lib/async');

const Game = require('../models/game');
const Favorite = require('../models/favorite');

function gameRoutes() {
  const router = express.Router();

  // domain/game/add
  router.get('/add', (req, res) => {
    res.render('game/add.hbs');
  });

  router.post('/add', async (req, res, next) => {
    try {
      // res.send(req.body);
      const { name, year, image, description, rating, playingTime, numOfPlayers, difficulty } = req.body;
      const newGame = await Game.create({
        name,
        year,
        image,
        description,
        rating,
        playingTime,
        numOfPlayers,
        difficulty,
      });
      res.redirect('/');
    } catch (error) {
      console.error('Error while sending game to DB', error);
      res.render('/');
      next(error);
    }
  });
  
  // domain/game/:id
  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const game = await Game.findById(id);

      res.render('game/detail.hbs', { game });
    } catch (e) {
      console.log('e', e);
      next(e);
    }
  });

  router.get('/:id/edit', async (req, res, next) => {
    const { id } = req.params;

    try {
      const game = await Game.findById(id);
      res.render('game/edit.hbs', { game });
    } catch (e) {
      next(e);
    }
  });

  router.post('/:id/delete', async (req, res, next) => {
    const { id } = req.params;

    try {
      await Game.findByIdAndDelete(id);
      res.redirect('/');
    } catch (e) {
      next(e);
    }
  });

  router.post('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { title, price, duration, description, country, image } = req.body;

    try {
      await Game.findByIdAndUpdate(id, { title, price, duration, description, country, image });
      res.redirect(`/game/${id}/edit`);
    } catch (e) {
      next(e);
    }
  });

  // /game/:id/favorite

  router.post('/:id/favorite', async (req, res, next) => {
    const { id: gameId } = req.params;
    const { _id: userId } = req.session.currentUser;

    try {
      const favoriteCreated = await Favorite.create({
        user: userId,
        game: gameId,
      });

      res.redirect('/');
    } catch (error) {
      next(error);
    }
  });
<<<<<<< HEAD

=======
>>>>>>> 963c946b68efb6e95ff8ebd3cef56b413d4c9154
  return router;
}

module.exports = gameRoutes;
