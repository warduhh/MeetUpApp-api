const express = require('express');
const { getAllEvents, getEventById, addEvent, updateEvent, removeEvent } = require ('../db/queries/event');
const router = express.Router();

// Route for getting all events
router.get('/events', (req, res) => {
  getAllEvents()
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' });
      console.error('Error fetching events:', err);
    });
});


// Route for getting a single event by event ID
router.get('/events/:eventId', (req, res) => {
  const eventId = req.params.eventId;

  getEventById(eventId)
    .then(event => {
      if (event) {
        res.json(event);
      } else {
        res.status(404).json({ error: 'Event not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' });
      console.error('Error fetching event:', err);
    });
});




// Route for creating a new event
router.post('/createEvents', (req, res) => {
  const { eventName, eventDescription, eventLocation, eventDate, organizerId } = req.body;

  if (!eventName || !eventDescription || !eventLocation || !eventDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newEvent = {
    eventName,
    eventDescription,
    eventLocation,
    eventDate,
    // organizerId,
  };

  addEvent(newEvent)
    .then(createdEvent => {
      res.status(201).json(createdEvent);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to create event' });
      console.error('Error creating event:', err);
    });
});


// Route for updating an existing event by event ID
router.put('/events/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  const { eventName, eventDescription, eventLocation, eventDate } = req.body;

  if (!eventName || !eventDescription || !eventLocation || !eventDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const updatedEvent = {
    eventId,
    eventName,
    eventDescription,
    eventLocation,
    eventDate,
  };

  updateEvent(updatedEvent)
    .then(updatedEvent => {
      if (updatedEvent) {
        res.json(updatedEvent);
      } else {
        res.status(404).json({ error: 'Event not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to update event' });
      console.error('Error updating event:', err);
    });
});


// Route for deleting an event by event ID
router.delete('/events/:eventId', (req, res) => {
  const eventId = req.params.eventId;

  removeEvent(eventId)
    .then(deletedEvent => {
      if (deletedEvent) {
        res.json(deletedEvent);
      } else {
        res.status(404).json({ error: 'Event not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to delete event' });
      console.error('Error deleting event:', err);
    });
});


module.exports = router;
