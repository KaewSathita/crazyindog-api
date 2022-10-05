const express = require('express');

const upload = require('../middlewares/upload');
const profileImageController = require('../controllers/profileImageController');


const router = express.Router();

router.post(
  '/',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
  ]),
  profileImageController.updateProfileImg
);

module.exports = router;