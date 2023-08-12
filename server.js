// load .env data into process.env
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { getAllEvents } = require('./db/queries/event');
const { getAllGroups } = require('./db/queries/group');
const events = require('./db/queries/event');
const { getAllNames } = require ('./db/queries/user')



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
  next();
});

app.use(express.json());



const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const groupMembersRoutes = require ('./routes/groupMembersRoutes');
const eventRoutes = require('./routes/eventRoutes');
const eventAttendeeRoutes = require ('./routes/eventAttendeeRoutes');






// /user/endpoints

app.use('/user', userRoutes);
app.use('/group', groupRoutes);
app.use ('groupMembers', groupMembersRoutes);
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


app.listen(port, (err) => {
  console.log(err || `listening on port ${port} 😎 test123`);
 
});





