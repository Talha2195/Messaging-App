const { Router } = require("express")
const postRouter = Router()
const postControllers = require("../../controllers/authController")
const { signUpVal } = require("../../validators/signUpVal")
const { authMiddleware } = require("../passportConfig")

postRouter.post("/register", signUpVal, postControllers.signUpUser)
postRouter.post("/login", postControllers.logUserIn)
postRouter.post("/sendReq", authMiddleware, postControllers.sendFriendRequest)
postRouter.post(
  "/acceptReq",
  authMiddleware,
  postControllers.acceptFriendRequest
)
postRouter.post(
  "/rejectReq",
  authMiddleware,
  postControllers.rejectFriendRequest
)

module.exports = postRouter
