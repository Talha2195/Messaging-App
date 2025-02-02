const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcryptjs")

async function signUpUser(username, password) {
  try {
    const saltRounds = 10

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    })
    if (existingUser) {
      throw new Error("Username already exists")
    }

    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    })
    console.log("Created User:", newUser)
    return newUser
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

async function findUser(username) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
      select: { id: true, username: true, password: true },
    })

    if (!user) {
      return null
    }

    return user
  } catch (error) {
    console.error("Error finding user:", error)
    throw error
  }
}

async function findUserById(id) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    })

    if (!user) {
      console.error("User not found with id:", id)
      throw new Error("User not found")
    }

    return user
  } catch (error) {
    console.error("Error finding user by ID:", error)
    throw new Error("Failed to fetch user from the database")
  }
}

async function sendFriendRequest(senderId, receiverId) {
  try {
    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        AND: [{ senderId: senderId }, { receiverId: receiverId }],
      },
    })

    if (existingRequest) {
      throw new Error("Friend request already sent")
    }

    const newRequest = await prisma.friendRequest.create({
      data: {
        senderId: senderId,
        receiverId: receiverId,
        status: "PENDING",
      },
    })

    return newRequest
  } catch (error) {
    console.error("Error sending friend request:", error)
    throw error
  }
}

async function getProfile(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        friends: {
          include: {
            friend: true,
          },
        },
        sentRequests: {
          where: {
            status: "PENDING",
          },
          include: {
            receiver: true,
          },
        },
        receivedRequests: {
          where: {
            status: "PENDING",
          },
          include: {
            sender: true,
          },
        },
      },
    })

    if (!user) {
      console.error("User not found with id:", userId)
      throw new Error("User not found")
    }

    const friends = user.friends.map((friendship) => friendship.friend)
    const friendRequests = user.receivedRequests.map((request) => ({
      id: request.id,
      username: request.sender.username,
    }))

    return { user, friends, friendRequests }
  } catch (error) {
    console.error("Error fetching profile:", error)
    throw error
  }
}

async function acceptFriendRequest(requestId) {
  try {
    const friendRequest = await prisma.friendRequest.update({
      where: {
        id: requestId,
      },
      data: {
        status: "ACCEPTED",
      },
      include: {
        sender: true,
        receiver: true,
      },
    })

    await prisma.friendship.create({
      data: {
        userId: friendRequest.senderId,
        friendId: friendRequest.receiverId,
      },
    })

    await prisma.friendship.create({
      data: {
        userId: friendRequest.receiverId,
        friendId: friendRequest.senderId,
      },
    })

    console.log(
      `Friendship created between ${friendRequest.senderId} and ${friendRequest.receiverId}`
    )
  } catch (error) {
    console.error("Error accepting friend request:", error)
  }
}

async function rejectFriendRequest(requestId) {
  try {
    await prisma.friendRequest.delete({
      where: {
        id: requestId,
      },
    })
  } catch (error) {
    console.error("Error rejecting friend request:", error)
  }
}

async function sendMessage(senderId, receiverId, message) {
  try {
    const newMessage = await prisma.messages.create({
      data: {
        senderId: senderId,
        receiverId: receiverId,
        message: message,
      },
    })

    return newMessage
  } catch (error) {
    console.error("Error sending message:", error)
    throw error
  }
}

module.exports = {
  signUpUser,
  findUser,
  findUserById,
  sendFriendRequest,
  getProfile,
  acceptFriendRequest,
  rejectFriendRequest,
  sendMessage,
}
