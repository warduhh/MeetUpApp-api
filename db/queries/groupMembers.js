const pool = require('../index');

//Get members of a specific group
const getGroupMembers = function (groupId) {
  return pool
    .query(
      "SELECT users.* FROM users JOIN groupMembers ON users.userId = groupMembers.userId WHERE groupMembers.groupId = $1",
      [groupId]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

//Add a user as a member to a group
const addMemberToGroup = function (groupId, userId) {
  return pool
    .query("INSERT INTO groupMembers (groupId, userId) VALUES ($1, $2) RETURNING *", [groupId, userId])
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

//Remove a user from a group
const removeMemberFromGroup = function (groupId, userId) {
  return pool
    .query("DELETE FROM groupMembers WHERE groupId = $1 AND userId = $2 RETURNING *", [groupId, userId])
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

module.exports = { getGroupMembers, addMemberToGroup, removeMemberFromGroup };