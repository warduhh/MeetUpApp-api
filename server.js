// load .env data into process.env
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { getAllEvents } = require('./db/queries/events');


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
  next();
});




// const userRoutes = require('./routes/userRoutes');
//const eventsRoutes = require('./routes/eventRoutes');
//const groupRoutes = require('./routes/groupRoutes')






// /api/endpoints
//app.use("/api", apiRoutes);

// /user/endpoints
// app.use("/users", userRoutes);

//app.use('/api/events', eventRoutes);
//app.use('/api/groups', groupRoutes);
//app.use('/api/interests', interestRoutes);

app.get("/test", (req, res) => {
  res.send("🤗");
});

app.get("/events", (req, res) => {
  getAllEvents()
  .then((events) => {
    console.log(events)
    res.send(events)
  })
})

app.listen(port, (err) => {
  console.log(err || `listening on port ${port} 😎`);
});
