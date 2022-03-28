const express = require('express');
const router = express.Router();
const controller = require('../Controller/user.controller');

router.post("/checkUsername",controller.checkUsername);
router.post("/register",controller.register);
router.post("/login",controller.login);
router.post("/getUser",controller.getUser);
router.post("/updateSpurlus",controller.updateSpurlus);
module.exports = router;