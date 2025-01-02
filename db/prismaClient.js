const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');

async function signUpUser (username, password) {
    try {
        const saltRounds = 10

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const existingUser = await prisma.user.findUnique({
            where: {
                username:username,
            }
        })
        if (existingUser) {
            throw new Error('Username already exists'); 
        }

        const newUser = await prisma.user.create({
            data: {
              username: username, 
              password: hashedPassword,
            },
          })
          console.log('Created User:', newUser)
          return newUser
    } catch (error) {
        console.error('Error creating user:', error)
        throw error;
    } finally {
        await prisma.$disconnect() 
    }

}

async function findUser(username) {
    try {
        const user = await prisma.user.findUnique({
            where: { username: username },
            select: { id: true, username: true, password: true }
        });

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
}

async function findUserById(id) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!user) {
            console.error('User not found with id:', id);
            throw new Error('User not found');
        }

        return user;  

    } catch (error) {
        console.error('Error finding user by ID:', error);
        throw new Error('Failed to fetch user from the database');
    }
}


module.exports = {
    signUpUser,
    findUser,
    findUserById,
}