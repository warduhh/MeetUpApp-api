const express = require('express');
const { getUserByEmail, addUser, getUserById, updateUser } = require('../db/queries/user');
const router = express.Router();
//ROUTES ARE localhost:3000/user/users/

// Route to create a new user
router.post('/users', (req, res) => {
  const userInfo = req.body;
  addUser(userInfo)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' });
      console.log('error: ', err);
    });
});



// Route to get a user by email
router.get('/users/:email', (req, res) => {
  const email = req.params.email;
  getUserByEmail(email)
    .then(data => {
      if (data) {
        res.json(data);
      } else {

        res.status(500).json({ error: 'Something went wrong' }); 
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' });
      console.log('error: ', err);
    });
});


router.get('/users/:userId', (req, res) => {
  const userId = req.params.userId; 
  getUserById(userId) 
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' });
      console.log('error: ', err);
    });
});




//Route to retrieve user information by userId
router.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;

  getUserById(userId)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' });
      console.error('Error fetching user:', err);
    });
});

// Route for updating details of a user
router.put('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const updatedUserInfo = req.body;

  if (!updatedUserInfo || Object.keys(updatedUserInfo).length === 0) {
    return res.status(400).json({ error: 'Invalid data in request body' });
  }

  updateUser(userId, updatedUserInfo)
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;

