const express = require('express');
const writeReviewController = require("../controllers/writeReivewController");
const upload = require('../middlewares/upload');

const router = express.Router();

router.post("/create-review", writeReviewController.createReview);
// router.route("/").post(upload.single('image'), writeReviewController.createReview);


module.exports = router;