const express = require ('express');


const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post("/register", authController.register);
router.post('/login', authController.login);

module.exports = router;