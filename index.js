const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connection = require('./database');

const { SERVER_PORT, CLIENT_URL, JWT_SECRET } = process.env;

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your code here!
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ errorMessage: 'Please specify both email and password' });
  } else {
    connection.query(
      `INSERT INTO user(email, password) VALUES (?, ?)`,
      [email, password],
      (error, result) => {
        if (error) {
          res.status(500).json({ errorMessage: error.message });
        } else {
          res.status(201).json({
            id: result.insertId,
            email,
          });
        }
      }
    );
  }
});

// Don't write anything below this line!
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}.`);
});
