const express = require('express');
const router = express.Router();
const controller = require('../Controller/mission.controller');

router.post("/getMission",controller.getMission);
router.post("/AddCompleteMission",controller.AddMissionComplete);
module.exports = router;