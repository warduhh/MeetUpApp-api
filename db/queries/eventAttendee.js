const pool = require('../index');


//Get Attendees for a Specific Event: This query will retrieve a list of users who have attended a specific event. 
const getAttendeesForEvent = function (eventId) {
  return pool
    .query(
      "SELECT * FROM users JOIN eventAttendee ON users.userId = eventAttendee.userId WHERE eventAttendee.eventId = $1",
      [eventId]
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return [];
    });
};

const getAttendeesCountForEvent = function (eventId) {
  return pool
    .query(
      "SELECT COUNT(*) FROM eventAttendee WHERE eventId = $1",
      [eventId]
    )
    .then((res) => {
      return res.rows[0].count; // Get the count value from the first row
    })
    .catch((err) => {
      console.log(err.message);
      return 0; // Return 0 if there's an error
    });
};



// Get Events Attended by a Specific User

const getEventsAttendedByUser = function (userId) {
  return pool.query(
    `SELECT * FROM events 
    JOIN eventAttendee ON events.eventId = eventAttendee.eventId 
    WHERE eventAttendee.userId = $1`,
    [userId]
  )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.error(err.message);
      return [];
    });
};


// Add an Attendee to an Event:
const addAttendeeToEvent = function (eventId, userId) {
  return new Promise((resolve, reject) => {
    pool
      .query(
        "INSERT INTO eventAttendee (eventId, userId) VALUES ($1, $2)",
        [eventId, userId]
      )
      .then((res) => {
        console.log(res.rows);
        resolve(); // Resolve the promise to indicate success
      })
      .catch((err) => {
        console.error(err);
        reject(err); // Reject the promise to indicate failure
      });
  });
};


/*
const newAttendee = {
  eventId: '1',
  userId: '7'
};
addAttendeeToEvent(newAttendee.eventId, newAttendee.userId);
*/


// Remove an Attendee from an Event:
const removeAttendeeFromEvent = function (eventId, userId) {
  pool
    .query(
      "DELETE FROM eventAttendee WHERE eventId = $1 AND userId = $2",
      [eventId, userId]
    )
    .then((res) => {
      console.log(res.rows);
    })
    .catch((err) => {
      console.error(err);
    });
};

/*
const eventId = 1;
const userId = 7;
removeAttendeeFromEvent(eventId, userId);
*/
module.exports = { getAttendeesForEvent, getEventsAttendedByUser, addAttendeeToEvent, removeAttendeeFromEvent, getAttendeesCountForEvent };