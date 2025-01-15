const { Router } = require("express")
const getRouter = Router()
const getControllers = require("../../controllers/pageRender")
const authController = require("../../controllers/authController")
const { authMiddleware } = require("../passportConfig")

getRouter.get("/", getControllers.renderMainPage)
getRouter.get("/signUp", getControllers.renderSignUpPage)
getRouter.get("/profile", authMiddleware, getControllers.renderProfilePage)
getRouter.get("/profileData", authMiddleware, authController.getProfile)

module.exports = getRouter
