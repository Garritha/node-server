const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const predefinedUsers = require("../utils/userData");




router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  console.log('username:', username);
  console.log('password:', password);

  const user = predefinedUsers.find(user => user.username === username && user.password === password);

  console.log('User:', user);

  if (!user) {
    console.log('Credenciales inválidas');
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const secret = process.env.JWT_SECRET;
console.log("secreto:", process.env.JWT_SECRET);

  const token = jwt.sign({ username }, secret, { expiresIn: '1h' });

  console.log('Token:', token);

  res.json({ token });
});


module.exports = router;