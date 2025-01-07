const db = require("../db/prismaClient")

async function renderMainPage(req, res) {
  res.render("mainPage")
}

async function renderSignUpPage(req, res) {
  res.render("signUpPage")
}

async function renderProfilePage(req, res) {
  const friendRequests = await db.getFriendRequests(req.user.id)
  res.render("profilePage", {
    user: req.user,
    friendRequests: friendRequests,
  })
}

module.exports = {
  renderMainPage,
  renderSignUpPage,
  renderProfilePage,
}
