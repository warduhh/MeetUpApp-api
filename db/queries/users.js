const pool = require('../index');

const getUserByEmail = function(email) {
  pool
  .query('SELECT * FROM users WHERE email = $1;', [email])
  .then((res) => {
    console.log(res.rows);
  })
    .catch((err) => {
      console.log(err.message);
    });
  
  };
  //testing by using an email in the database 
  getUserByEmail('john.doe@example.com')


const getUserById = function(userid) {
  pool
  .query(`SELECT * FROM users WHERE userId = $1;`, [userid])
  .then((res) => {
    console.log(res.rows);
    if (!res.rows[0]) {
      return null;
    }
    return res.rows[0];
  });
};
//testing userId 3
  getUserById('3')


const addUser = function(userInfo) {
  const { firstName, lastName, email, password } = userInfo;
  return pool
    .query(
      "INSERT INTO users (firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, email, password]
    )
    .then((res) => {
      console.log(res.rows);
    })
    .catch((err) => {
      console.error(err);
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





module.exports = { getUserByEmail, getUserById, addUser };
