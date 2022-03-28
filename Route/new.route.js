const express = require('express');
const router = express.Router();
const controller = require('../Controller/news.controller');

router.get("/getNews",controller.getNews);
router.get("/getImage",controller.getImages);
router.post("/getNewsId",controller.getNewsId);
router.post("/search",controller.Search);
module.exports = router;