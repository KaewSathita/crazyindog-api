const express = require('express');
const reviewController = require("../controllers/reviewController");
const upload = require('../middlewares/upload');
const authenticate = require('../middlewares/authenticate')

const router = express.Router();

router.get('/', reviewController.getAll);

router.get('/:id', reviewController.getById);

router.post("/create-review",
    authenticate,
    upload.fields([
        { name: 'posterImage', maxCount: 1 },
    ]),
    reviewController.createReview);

router.put("/:id",
    authenticate,
    upload.fields([
        { name: 'posterImage', maxCount: 1 },
    ]),
    reviewController.updateReview);

router.delete("/:id", authenticate, reviewController.deleteReview);


module.exports = router;