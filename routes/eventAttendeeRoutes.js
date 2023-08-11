const express = require('express');
const router = express.Router();
const { getAttendeesForEvent, getEventsAttendedByUser }= require('../db/queries/eventAttendee');

// Get attendees for a specific event
router.get('/events/:eventId/attendees', (req, res) => {
  const eventId = req.params.eventId;

  getAttendeesForEvent(eventId)
    .then(attendees => {
      res.json(attendees);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to fetch event attendees' });
      console.error('Error fetching event attendees:', err);
    });
});

// Get events attended by a specific user
router.get('/users/:userId/events', (req, res) => {
  const userId = req.params.userId;

  getEventsAttendedByUser(userId)
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to fetch events attended by user' });
      console.error('Error fetching events attended by user:', err);
    });
});




module.exports = router;
