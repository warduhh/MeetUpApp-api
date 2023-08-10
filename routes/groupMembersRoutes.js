const express = require('express');
const { getGroupMembers, addMemberToGroup, removeMemberFromGroup } = require ('../db/queries/groupMembers')

const router = express.Router();


// Retrieve members of a specific group
router.get('/groups/:groupId/members', (req, res) => {
  const groupId = req.params.groupId;

  getGroupMembers(groupId)
    .then(members => {
      res.json(members);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to fetch group members' });
      console.error('Error fetching group members:', err);
    });
});

// Join a group (add member to group)
router.post('/groups/:groupId/members', (req, res) => {
  const groupId = req.params.groupId;
  const userId = req.body.userId; // Assuming you provide userId in the request body

  addMemberToGroup(groupId, userId)
    .then(addedMember => {
      if (addedMember) {
        res.status(201).json(addedMember);
      } else {
        res.status(500).json({ error: 'Failed to join group' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to join group' });
      console.error('Error joining group:', err);
    });
});

// Leave a group (remove member from group)
router.delete('/groups/:groupId/members/:userId', (req, res) => {
  const groupId = req.params.groupId;
  const userId = req.params.userId;

  removeMemberFromGroup(groupId, userId)
    .then(removedMember => {
      if (removedMember) {
        res.json(removedMember);
      } else {
        res.status(500).json({ error: 'Failed to leave group' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to leave group' });
      console.error('Error leaving group:', err);
    });
});

module.exports = router;