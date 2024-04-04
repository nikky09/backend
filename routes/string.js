const express = require('express');
const Temp = require('../models/String');

const router = express.Router();

// POST /sca
router.post('/sca', async (req, res) => {
  const { content, phone } = req.body;
  if (!content || !phone) return res.status(400).json({ message: 'Content and phone number are required' });

  try {
    // Check if the string already exists in the database for the given phone number
    let existingString = await Temp.findOne({ content, phone });
    if (existingString) return res.status(409).json({ message: 'String already exists in the database' });

    // Create a new string object with the content and phone number, and save it to the database
    // const newString = new String({ content, phone });
    const newString = await Temp.create({content,phone})
  //  const con =  await newString.save();
    res.status(201).json({ message: 'String uploaded to database successfully',data:newString });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving string to database' });
  }
});

module.exports = router;

// git init
// git remote add origin https://github.com/anything/repo-name.git
// git add .
// git commit -m "Changes"
// git branch -M main
// git push -u origin main