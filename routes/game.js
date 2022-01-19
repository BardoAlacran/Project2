/* eslint-disable no-underscore-dangle */
const express = require('express');
const async = require('hbs/lib/async');

const Game = require('../models/game');
const Favorite = require('../models/favorite');

function gameRoutes() {
  const router = express.Router();

  
  router.get('/add', (req, res) => {
    res.render('game/add.hbs');
  });

  router.post('/add', async (req, res, next) => {
    const user = req.session.currentUser;
    try {
      const { name, year, image, description, rating, playingTime, numOfPlayers, difficulty } = req.body;
      await Game.create({
        name,
        year,
        image,
        description,
        rating,
        playingTime,
        numOfPlayers,
        difficulty,
        available: 'yes',
        createdBy: user._id,
      });
      res.redirect('/');
    } catch (error) {
      console.error('Error while sending game to DB', error);
      next(error);
    }
  });
<<<<<<< HEAD

  // domain/game/:id
  router.get('/:id', async (req, res, next) => {
    const { id } = req.params; // check correct id

=======
  
  
  router.get('/:id', async (req, res, next) => {
    const { id } = req.params; 
    
>>>>>>> pics
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

  router.post('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, year, rating, description, numOfPlayers, image, playingTime, difficulty } = req.body;

    try {
      await Game.findByIdAndUpdate(id, {
        name,
        year,
        rating,
        description,
        numOfPlayers,
        image,
        playingTime,
        difficulty,
      });
      res.redirect(`/game/${id}`);
    } catch (e) {
      next(e);
    }
  });

  router.post('/:id/delete', async (req, res, next) => {
    const { id } = req.params;

    try {
      await Game.findByIdAndUpdate(id, { available: 'no' });
      res.redirect('/');
    } catch (e) {
      next(e);
    }
  });

  router.post('/:id/favorite', async (req, res, next) => {
    const { id: gameId } = req.params;
    const { _id: userId } = req.session.currentUser;

    try {
      await Favorite.create({
        user: userId,
        game: gameId,
      });
      res.redirect('/');
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  router.post('/:id/unfavorite', async (req, res, next) => {
    const { id } = req.params;

    try {
      await Favorite.findOneAndRemove({ game: id });
      res.redirect('/');
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  return router;
}

module.exports = gameRoutes;
