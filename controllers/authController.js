const { validationResult } = require("express-validator")
const db = require("../db/prismaClient")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

async function signUpUser(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Please fix the above errors",
      errors: errors.array(),
    })
  }

  const { username, password } = req.body

  try {
    const newUser = await db.signUpUser(username, password)

    if (newUser) {
      return res.status(201).json({
        success: true,
        message: "User created successfully",
      })
    } else {
      return res.status(400).json({
        success: false,
        message: "User creation failed",
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: `Error adding new user: ${error.message}`,
    })
  }
}

async function logUserIn(req, res) {
  const { username, password } = req.body

  try {
    const user = await db.findUser(username)
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" })
    }

    const payload = { userId: user.id }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })

    res.json({ success: true, token: `Bearer ${token}` })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

async function sendFriendRequest(req, res) {
  console.log("sendFriendRequest called")

  const { friendReq } = req.body
  const senderId = req.user.id

  try {
    const receiver = await db.findUser(friendReq)

    if (!receiver) {
      return res
        .status(400)
        .json({ success: false, message: "Receiver not found" })
    }

    const receiverId = receiver.id

    const newRequest = await db.sendFriendRequest(senderId, receiverId)

    return res.status(201).json({
      success: true,
      message: "Friend request sent successfully",
      request: newRequest,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: `Error sending friend request: ${error.message}`,
    })
  }
}

async function getFriendRequests(req, res) {
  const userId = req.user.id

  try {
    const requests = await db.getFriendRequests(userId)

    return res.status(200).json({
      success: true,
      requests,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: `Error fetching friend requests: ${error.message}`,
    })
  }
}

async function acceptFriendRequest(req, res) {
  const { requestId } = req.body

  try {
    await db.acceptFriendRequest(requestId)
    return res.status(200).json({
      success: true,
      message: "Friend request accepted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: `Error accepting friend request: ${error.message}`,
    })
  }
}

async function rejectFriendRequest(req, res) {
  const { requestId } = req.body

  try {
    await db.rejectFriendRequest(requestId)
    return res.status(200).json({
      success: true,
      message: "Friend request rejected successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: `Error rejecting friend request: ${error.message}`,
    })
  }
}

module.exports = {
  signUpUser,
  logUserIn,
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
}
