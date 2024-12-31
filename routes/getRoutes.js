const { Router } = require('express');
const getRouter = Router();
const getControllers = require ('../controllers/pageRender');
const { authMiddleware } = require('../passportConfig')

getRouter.get('/', getControllers.renderMainPage);
getRouter.get('/signUp', getControllers.renderSignUpPage);
getRouter.get('/profile', authMiddleware, getControllers.renderProfilePage);
module.exports = getRouter;