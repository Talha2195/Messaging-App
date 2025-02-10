const { Router } = require("express")
const getRouter = Router()
const authController = require("../../controllers/authController")
const { authMiddleware } = require("../passportConfig")

getRouter.get("/profileData", authMiddleware, authController.getProfile)
getRouter.get("/getMessages", authMiddleware, authController.getUserMessages)

module.exports = getRouter
