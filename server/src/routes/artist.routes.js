import { Router } from 'express';
import { artist, tracks } from '../data/artistData.js';

export const artistRouter = Router();

artistRouter.get('/artist', (req, res) => {
  return res.json({ ok: true, artist });
});

artistRouter.get('/tracks', (req, res) => {
  return res.json({ ok: true, tracks });
});
