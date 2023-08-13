const pool = require('../index');

const getUserByEmail = function (email) {
  return pool
    .query('SELECT * FROM users WHERE email = $1;', [email])
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return [];
    });
};
//testing by using an email in the database 
//getUserByEmail('john.doe@example.com')

const getUserById = function (userid) {
  return pool
    .query('SELECT * FROM users WHERE userId = $1;', [userid])
    .then((res) => {
      console.log(res.rows);
      if (!res.rows[0]) {
        return null;
      }
      return res.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};

//testing userId 3
getUserById('3')


const addUser = function (userInfo) {
  const { firstName, lastName, email, password } = userInfo;
  return pool
    .query(
      'INSERT INTO users (firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *',
      [firstName, lastName, email, password]
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows[0];
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};


/* Testing newUser added
const newUser = {
  firstName: 'Warda',
  lastName: 'Nur',
  email: 'warduhh@gmail.com',
  password: '123456',
};

addUser(newUser);
*/

const updateUser = function (userId, updatedUserInfo) {
  const { firstName, lastName, email, password } = updatedUserInfo;
  return pool
    .query(
      "UPDATE users SET firstName = $2, lastName = $3, email = $4, password = $5 WHERE userId = $1 RETURNING *",
      [userId, firstName, lastName, email, password]
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows[0];
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

const getAllNames = function () {
  return pool
  .query('SELECT CONCAT(firstName, \' \', lastName) AS fullName FROM users;')
  .then((res) => {
    return res.rows;
  })
    .catch((err) => {
      console.log(err.message);
      return [];
    });
};

/*
const updatedUser = {
  userId: 8,
  firstName: 'UpdatedFirstName',
  lastName: 'UpdatedLastName',
  email: 'updated@example.com',
  password: 'newpassword'
};

updateUser(updatedUser.userId, updatedUser)
  .then((updatedUser) => {
    console.log('Updated User:', updatedUser);
  })
  .catch((err) => {
    console.error('Error:', err);
  });

*/

module.exports = {
  getUserByEmail,
  getUserById,
  addUser,
  updateUser,
  getAllNames
}; 
