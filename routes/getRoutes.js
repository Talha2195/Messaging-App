const { Router } = require('express');
const getRouter = Router();
const getControllers = require ('../controllers/pageRender');
const passport = require('../passportConfig');

getRouter.get('/', getControllers.renderMainPage);
getRouter.get('/signUp', getControllers.renderSignUpPage);
getRouter.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = req.user; 

        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                bio: user.bio || 'No bio available',
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = getRouter;