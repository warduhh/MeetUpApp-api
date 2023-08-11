const express = require('express');
const { getAllGroups, createGroup, getUserGroups, getGroupById, updateGroupById, deleteGroupById } = require ('../db/queries/group');
const router = express.Router();

// Route for getting all groups
router.get('/groups', (req, res) => {
  getAllGroups()
    .then(groups => {
      res.json(groups);
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' });
      console.error('Error fetching groups:', err);
    });
});



// Route for getting all groups a user is a member of
//notworking
router.get('/users/:userId/groups', (req, res) => {
  const userId = req.params.userId;

  getUserGroups(userId)
    .then(groups => {
      res.json(groups);
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' });
      console.error('Error fetching user groups:', err);
    });
});


// Route for getting a single group by group ID
router.get('/groups/:groupId', (req, res) => {
  const groupId = req.params.groupId;

  getGroupById(groupId)
    .then(group => {
      if (group) {
        res.json(group);
      } else {
        res.status(404).json({ error: 'Group not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' });
      console.error('Error fetching group:', err);
    });
});


// Route for creating a new group
router.post('/groups', (req, res) => {
  const { groupName, groupDescription, organizerId } = req.body;

  if (!groupName || !groupDescription || !organizerId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  createGroup(groupName, groupDescription, organizerId)
    .then(newGroup => {
      res.status(201).json(newGroup);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to create group' });
      console.error('Error creating group:', err);
    });
});


// Route for updating an existing group by group ID
router.put('/groups/:groupId', (req, res) => {
  const groupId = req.params.groupId;
  const { groupName, groupDescription } = req.body;

  if (!groupName || !groupDescription) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  updateGroupById(groupId, groupName, groupDescription)
    .then(updatedGroup => {
      if (updatedGroup) {
        res.json(updatedGroup);
      } else {
        res.status(404).json({ error: 'Group not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to update group' });
      console.error('Error updating group:', err);
    });
});


// Route for deleting a group by group ID
router.delete('/groups/:groupId', (req, res) => {
  const groupId = req.params.groupId;

  deleteGroupById(groupId)
    .then(deletedGroup => {
      if (deletedGroup) {
        res.json(deletedGroup);
      } else {
        res.status(404).json({ error: 'Group not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to delete group' });
      console.error('Error deleting group:', err);
    });
});





module.exports = router;
