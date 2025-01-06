async function renderMainPage (req, res) {
    res.render('mainPage');
}

async function renderSignUpPage (req, res) {
    res.render('signUpPage');
}

async function renderProfilePage (req, res) {
    res.render('profilePage', {
        user: req.user,
    });

}

module.exports = {
    renderMainPage,
    renderSignUpPage,
    renderProfilePage,
}