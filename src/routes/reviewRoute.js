const express = require('express');
const reviewController = require("../controllers/reviewController");
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/', reviewController.getAll);

router.get('/:id', reviewController.getById);

router.post("/create-review",
    upload.fields([
        { name: 'posterImage', maxCount: 1 },
    ]),
    reviewController.createReview);

router.put("/:id",
    upload.fields([
        { name: 'posterImage', maxCount: 1 },
    ]),
    reviewController.updateReview);

router.delete("/:id", reviewController.deleteReview);


module.exports = router;