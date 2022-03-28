const express = require('express');
const router = express.Router();
const controller = require('../Controller/reward.controller');

router.post("/getFriendIntroduced",controller.getFriendIntroduced);

module.exports = router;