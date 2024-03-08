const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    if (typeof username !== "string") {
      res.status(400).json({ status: "error" });
      return;
    }
  
    User.findOne({ username })
      .then((response) =>{
        if(bcrypt.compare(password, response.password)) {
          res.send({
            _id: response._id,
            username: response.username,
            email: response.email,
            strava_token: response.strava_token
          })
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
          return;
        }
      })
      .catch( error=> {
          console.log(error)
          res.status(401).json({ message: 'Invalid credentials' });
        return
      })

    
    
});

module.exports = router;