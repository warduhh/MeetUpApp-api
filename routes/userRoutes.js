const express = require('express');
const { getUserByEmail, addUser, getUserById, updateUser,getAllNames } = require('../db/queries/user');
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

        res.status(500).json({ error: 'Something went wrong' }); // Sending JSON error response
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' });
      console.log('error: ', err);
    });
});


router.get('/users/:userId', (req, res) => {
  const userId = req.params.userId; // Capture the userId from the URL
  getUserById(userId) // Call the function with the correct parameter
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

router.get('/names', (req, res) => {
  getAllNames()
    .then(names => {
      console.log("TESTING NAME LIST", names)
      res.json(names);
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' });
      console.log('error: ', err);
    });
});


module.exports = router;

