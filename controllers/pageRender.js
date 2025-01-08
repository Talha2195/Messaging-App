const db = require("../db/prismaClient")

async function renderMainPage(req, res) {
  res.render("mainPage")
}

async function renderSignUpPage(req, res) {
  res.render("signUpPage")
}

async function renderProfilePage(req, res) {
  const { user, friends, friendRequests } = await db.getProfile(req.user.id)
  res.render("profilePage", {
    user: user,
    friends: friends,
    friendRequests: friendRequests,
  })
}

module.exports = {
  renderMainPage,
  renderSignUpPage,
  renderProfilePage,
}
