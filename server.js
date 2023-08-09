// load .env data into process.env
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

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

/*
app.listen(port, (err) => {
  console.log(err || `listening on port ${port} 😎 test123`);
 
});
*/

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




