async function renderMainPage (req, res) {
    res.render('mainPage');
}

async function renderSignUpPage (req, res) {
    res.render('signUpPage');
}

async function renderProfilePage (req, res) {
    res.render('profilePage');
}

module.exports = {
    renderMainPage,
    renderSignUpPage,
    renderProfilePage,
}