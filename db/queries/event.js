const pool = require('../index');



// Create an Event:
const addEvent = function (newEvent) {
  const { eventName, eventDescription, eventLocation, eventDate, organizerId } = newEvent;
  return pool
    .query(
      "INSERT INTO events (eventName, eventDescription, eventLocation, eventDate, organizerId) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [eventName, eventDescription, eventLocation, eventDate, organizerId]
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows[0]; // Return the inserted event
    })
    .catch((err) => {
      console.log(err.message);
      throw err; // Re-throw the error to be caught in the route handler
    });
};



// Testing newEvent added
const newEvent = {
  eventName: 'Coffee Chat',
  eventDescription: 'Networking event to meet people in the Tech industry',
  eventLocation: 'Saskatoon',
  eventDate: '2023-11-10',
  organizerId: '6',
};

addEvent(newEvent);



// Get All Events:
const getAllEvents = function () {
  return pool
    .query("SELECT DISTINCT * FROM events ORDER BY eventName")
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return [];
    });
};

/*
// Calling the function to fetch all events and log the results
getAllEvents()
  .then((events) => {
    console.log(events);
  })
  .catch((err) => {
    console.log("Error fetching events:", err.message);
  });
*/

//Get Event by Id
  const getEventById = function (eventId) {
    return pool
      .query("SELECT * FROM events WHERE eventId = $1", [eventId])
      .then((res) => {
        return res.rows[0]; // Return the first (and only) row as the event
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  };
  
  module.exports = { getEventById };
  

//Update Event
// Update Event
const updateEvent = function (event) {
  const { eventId, eventName, eventDescription, eventLocation, eventDate } = event;
  return pool
    .query(
      "UPDATE events SET eventName = $2, eventDescription = $3, eventLocation = $4, eventDate = $5 WHERE eventId = $1 RETURNING *",
      [eventId, eventName, eventDescription, eventLocation, eventDate]
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows[0]; // Return the updated event
    })
    .catch((err) => {
      console.log(err.message);
      throw err; // Re-throw the error to be caught in the route handler
    });
};

  
  /*
  // Testing updateEvent added
  const newEvent = {
    eventId: 6, 
    eventName: 'Live Music Night',
    eventDescription: 'An evening of live music and performances.',
    eventLocation: 'Chicago',
    eventDate: '2023-07-25',
  };
  
  updateEvent(newEvent);
*/


//Delete an Event:
const removeEvent = function (eventId) {
  return pool
    .query(
      "DELETE FROM events WHERE eventId = $1 RETURNING *",
      [eventId])
    /*.then((res) => {
      console.log(res.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
    */
};
/*
const eventId = 55
removeEvent(eventId);
*/
   

module.exports = { addEvent, getAllEvents, updateEvent, removeEvent, getEventById };



