const express = require('express');
const router = express.Router();
const User = require('../models/user');  // Adjust the path as needed

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userId = await User.createUser(username, password);
        res.status(201).json({ message: "User created successfully", userId });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});

module.exports = router;
