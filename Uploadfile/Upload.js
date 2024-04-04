const express = require('express');
const multer = require('multer');
const app = express();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'encryptedFileContent');
  },
  filename: (req, file, cb) => {
    cb(null, 'encryptedFileContent');
  }
});
const upload = multer({ storage: storage });

// Upload endpoint
app.post('encryptedFileContent', upload.single('file'), (req, res) => {
  res.status(200).send('File uploaded successfully');
});

app.listen(3000, () => {
  console.log('Server is running on port 4000');
});