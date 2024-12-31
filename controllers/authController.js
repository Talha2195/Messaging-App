const { validationResult } = require("express-validator");
const db = require('../db/prismaClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function signUpUser(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Please fix the above errors',
            errors: errors.array(),
        });
    }

    const { username, password } = req.body;

    try {

        const newUser = await db.signUpUser(username, password);

        if (newUser) {
            return res.status(201).json({
                success: true,
                message: 'User created successfully',
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'User creation failed',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: `Error adding new user: ${error.message}`,
        });
    }
}

async function logUserIn(req, res) {
    const { username, password } = req.body;

    try {
        const user = await db.findUser(username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const payload = { userId: user.id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, token: `Bearer ${token}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    signUpUser,
    logUserIn,
};
