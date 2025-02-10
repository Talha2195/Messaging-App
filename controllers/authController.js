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

  const { username, password, name } = req.body
  console.log(username, password, name)

  try {
    const newUser = await db.signUpUser(username, password, name)

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
    res.json({ success: true, token: `Bearer ${token}`, user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

async function sendFriendRequest(req, res) {
  console.log("sendFriendRequest called")

  const { username } = req.body
  const senderId = req.user.id

  try {
    const receiver = await db.findUser(username)

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

async function getProfile(req, res) {
  const userId = req.user.id
  try {
    const requests = await db.getProfile(userId)
    return res.status(200).json({
      success: true,
      requests,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: `Error fetching profile data: ${error.message}`,
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
  const { id } = req.body

  try {
    await db.rejectFriendRequest(id)
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

async function sendMessageToUser(req, res) {
  const { senderId, receiverId, message } = req.body
  console.log(senderId, receiverId, message)
  try {
    const newMessage = await db.sendMessage(senderId, receiverId, message)
    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      newMessage,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: `Error sending message: ${error.message}`,
    })
  }
}

async function getUserMessages(req, res) {
  const userId = req.user.id
  try {
    const messages = await db.getMessages(userId)
    return res.status(200).json({
      success: true,
      messages,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: `Error fetching messages: ${error.message}`,
    })
  }
}

async function editProfile(req, res) {
  const userId = req.user.id
  const { username, password } = req.body
  try {
    const updatedUser = await db.editProfile(userId, username, password)
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: `Error updating profile: ${error.message}`,
    })
  }
}

module.exports = {
  signUpUser,
  logUserIn,
  sendFriendRequest,
  getProfile,
  acceptFriendRequest,
  rejectFriendRequest,
  sendMessageToUser,
  getUserMessages,
}
