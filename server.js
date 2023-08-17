// load .env data into process.env
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { getAllEvents } = require('./db/queries/event');
const { getAllGroups, getOrganizerIdByEventId} = require('./db/queries/group');
const events = require('./db/queries/event');
const groups = require('./db/queries/group')
const { getAllNames, updateProfile } = require ('./db/queries/user')
const cors = require('cors')
const {addAttendeeToEvent, getAttendeesCountForEvent} = require ('./db/queries/eventAttendee')



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
  next();
});

app.use(express.json());
app.use(cors())

const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const groupMembersRoutes = require ('./routes/groupMembersRoutes');
const eventRoutes = require('./routes/eventRoutes');
const eventAttendeeRoutes = require ('./routes/eventAttendeeRoutes');

// /user/endpoints

app.use('/user', userRoutes);
app.use('/group', groupRoutes);
app.use ('/groupMembers', groupMembersRoutes);
app.use('/event', eventRoutes);
app.use('/eventAttendee', eventAttendeeRoutes);



app.get("/events", (req, res) => {
  getAllEvents()
  .then((events) => {
    console.log(events)
    res.send(events)
  })
})


app.get("/groups", (req, res) => {
  getAllGroups()
    .then((groups) => {
      console.log(groups);
      res.send(groups);
    });
});


app.post("/createEvents", (req, res) => {
  const { eventName, eventDescription, eventLocation, eventDate} = req.body;

  if (!eventName || !eventDescription || !eventLocation || !eventDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newEvent = { // Define the newEvent variable
    eventName,
    eventDescription,
    eventLocation,
    eventDate,
    // organizerId,
  };
  events.addEvent(newEvent)
    .then(createdEvent => {
      res.status(201).json(createdEvent);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to create event' });
      console.error('Error creating event:', err);
    });
});


app.post("/createGroups", (req, res) => {
  const { groupName, groupDescription } = req.body;

  if (!groupName || !groupDescription) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newGroup = {
    groupName,
    groupDescription,
  };

  groups.createGroup(newGroup)
    .then(createdGroup => {
      res.status(201).json(createdGroup); // Send the createdGroup object directly
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to create group' });
      console.error('Error creating group:', err);
    });
});






app.post("/update-profile", (req, res) => {
  const { fullName, email, phoneNumber } = req.body;

  updateProfile(fullName, { email, phoneNumber })
    .then(updatedUser => {
      if (updatedUser) {
        res.json({ message: "Profile updated successfully" });
      } else {
        res.status(500).json({ error: "Error updating profile" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Error updating profile" });
    });
});


app.post('/events/:eventId/attendees', async (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.body.userId; 
  console.log ("TESTING")
  console.log (eventId, userId);

  try {
    await addAttendeeToEvent(eventId, userId);
    res.status(201).json({ message: 'Attendee added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add attendee to event' });
    console.error('Error adding attendee to event:', err);
  }
});

app.get("/events/:eventId/attendees/count", (req, res) => {
  const eventId = req.params.eventId;
  console.log("TESTING")

  getAttendeesCountForEvent(eventId)
    .then((attendeesCount) => {
      res.json({ count: attendeesCount });
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch attendees count" });
    });
});



app.get('/events/:eventId/organizer', (req, res) => {
  const eventId = req.params.eventId;
  console.log("Received eventId:", eventId);
  getOrganizerIdByEventId(eventId)
    .then(organizerId => {
      console.log("organizerId", organizerId); // Move this inside the .then callback
      if (organizerId) {
        res.json({ organizerId });
      } else {
        res.status(404).json({ error: 'Organizer not found for the event' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to fetch organizerId for the event' });
      console.error('Error fetching organizerId by eventId:', err);
    });
});


app.listen(port, (err) => {
  console.log(err || `listening on port ${port} 😎 `);
 
});



