const express = require('express');
const async = require('hbs/lib/async');

const Game = require('../models/game');
const Favorite = require('../models/favorite');

function gameRoutes() {
  const router = express.Router();

  // domain/game/add
  router.get('/add', async (req, res, next) => {
    try {
      res.render('game/add');
    } catch (error) {
      console.error('Error while creating the movie', error);
      next(error);
    }
  });

  router.post('/add', async (req, res, next) => {
    try {
      //res.send(req.body);
      const { name, image, description, rating } = req.body;
      const newGame = await Game.create({ name, image, description, rating });
      res.redirect('/games');
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

  return router;
}

module.exports = gameRoutes;
