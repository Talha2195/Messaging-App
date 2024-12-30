async function renderMainPage (req, res) {
    res.render('mainPage');
}

async function renderSignUpPage (req, res) {
    res.render('signUpPage');
}

module.exports = {
    renderMainPage,
    renderSignUpPage,
}