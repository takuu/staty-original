/**
 * Created by tuechi on 9/26/15.
 */

import { Router } from 'express';

const router = new Router();

router.use('/leagues', require('./models/league/index.js'));
router.use('/seasons', require('./models/season/index.js'));
router.use('/divisions', require('./models/division/index.js'));
router.use('/players', require('./models/player/index.js'));
router.use('/games', require('./models/game/index.js'));
router.use('/teams', require('./models/team/index.js'));
router.use('/stats', require('./models/stat/index.js'));
router.use('/users', require('./models/user/index.js'));

router.get('/userStatus', async (req, res, next) => {
  try {
    let user = req.user;
    if(user) {
      console.log('user is logged in ~');
      res.status(200).send(user);
    } else {
      res.status(200).send({login: 0});
    }
  } catch(err) {
    console.log('geeh, userStatus broke');
    next(err);
  }
});


export default router;
