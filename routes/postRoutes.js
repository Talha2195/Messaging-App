const { Router } = require('express');
const postRouter = Router();
const postControllers = require ('../controllers/authController');
const { signUpVal } = require('../validators/signUpVal');

postRouter.post('/register', signUpVal, postControllers.signUpUser);
postRouter.post('/login', postControllers.logUserIn);

module.exports = postRouter;