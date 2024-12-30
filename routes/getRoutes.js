const { Router } = require('express');
const getRouter = Router();
const getControllers = require ('../controllers/pageRender');
const { authMiddleware } = require('../passportConfig')

getRouter.get('/', getControllers.renderMainPage);
getRouter.get('/signUp', getControllers.renderSignUpPage);
getRouter.get('/profile', authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the profile page!',
        user: req.user,
    });
});

module.exports = getRouter;