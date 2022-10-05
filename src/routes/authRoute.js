const express = require ('express');


const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post("/register", authController.register);
router.post('/login', authController.login);
router.get("/me", authenticate, authController.getMe);
router.post("/me", authenticate, authController.updateMe);
// router.post("/me", authenticate, authController.uploadProfileImg);

module.exports = router;