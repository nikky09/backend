const express = require('express');
const String = require('../models/String');

const router = express.Router();

// Define a GET endpoint
router.get('/:phone', async (req, res) => {
    const phone = req.params.phone;

    try {
    // Retrieve data from MongoDB
    const string = await String.findOne({ phone }).sort({ _id: -1 });
    if (!string) {
        return res.status(404).json({ message: 'String not found', statusCode : "404" });
    }
    data = string.content;
    res.json({ message: "String found", content: {data} , statusCode : "200"});
    } catch (err) {
    res.status(500).json({ message: err.message, statusCode : "500" });
    }
});

module.exports = router;

// user this variable in frontend  : "res?.data?.content"