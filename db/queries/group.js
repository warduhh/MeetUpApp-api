const pool = require('../index');

//Create a new group
const createGroup = function (groupName, groupDescription, organizerId) {
  return pool
    .query(
      "INSERT INTO groups (groupName, groupDescription, organizerId) VALUES ($1, $2, $3) RETURNING *",
      [groupName, groupDescription, organizerId]
    )
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};


const getOrganizerIdByEventId = function (eventId) {
  return pool
    .query(
      "SELECT organizerid FROM Events WHERE eventId = $1",
      [eventId]
    )
    .then((res) => {
      const organizerId = res.rows[0] ? res.rows[0].organizerid : null;
      return organizerId;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

const getGroupNameAndDescriptionByOrganizerId = function (organizerId) {
  return pool
    .query(
      'SELECT groupName, groupDescription FROM Groups WHERE organizerId = $1',
      [organizerId]
    )
    .then((res) => {
      if (res.rows.length > 0) {
        const group = res.rows[0];
        console.log("group", group)
        return group;
      } else {
        return null; // Organizer not found or no group associated
      }
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};





// Get all groups a user is a member of
const getUserGroups = function (userId) {
  return pool
    .query(
      "SELECT groups.* FROM groups JOIN groupMembers ON groups.groupId = groupMembers.groupId WHERE groupMembers.userId = $1",
      [userId]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};


//Get a group by groupId:
const getGroupById = function (groupId) {
  return pool
    .query("SELECT * FROM groups WHERE groupId = $1", [groupId])
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

//Update a group by groupId:
const updateGroupById = function (groupId, groupName, groupDescription) {
  return pool
    .query(
      "UPDATE groups SET groupName = $1, groupDescription = $2 WHERE groupId = $3 RETURNING *",
      [groupName, groupDescription, groupId]
    )
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

//Delete a group by groupId
const deleteGroupById = function (groupId) {
  return pool
    .query("DELETE FROM groups WHERE groupId = $1 RETURNING *", [groupId])
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

// Get all groups
const getAllGroups = function () {
  return pool
    .query("SELECT * FROM groups")
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

module.exports = { createGroup, getAllGroups, getUserGroups, getGroupById, updateGroupById, deleteGroupById, getOrganizerIdByEventId, getGroupNameAndDescriptionByOrganizerId  };