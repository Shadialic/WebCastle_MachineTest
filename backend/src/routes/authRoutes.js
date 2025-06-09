import express from 'express';
import passport from 'passport';
import { googleCallback, loginFailure, logout } from '../controllers/authController.js';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar.readonly'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/login-failure' }),
  googleCallback  
);
router.post('/logout',logout)

router.get('/login-failure', loginFailure);

export default router;
