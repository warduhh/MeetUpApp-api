// load .env data into process.env
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;





const userRoutes = require('./routes/userRoutes');
//const eventsRoutes = require('./routes/eventRoutes');
//const groupRoutes = require('./routes/groupRoutes')






// /api/endpoints
//app.use("/api", apiRoutes);

// /user/endpoints
app.use("/users", userRoutes);

//app.use('/api/events', eventRoutes);
//app.use('/api/groups', groupRoutes);
//app.use('/api/interests', interestRoutes);

app.get("/test", (req, res) => {
  res.send("🤗");
});

app.listen(port, (err) => {
  console.log(err || `listening on port ${port} 😎`);
});
