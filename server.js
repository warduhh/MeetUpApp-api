// load .env data into process.env
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;




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





app.listen(port, (err) => {
  console.log(err || `listening on port ${port} 😎 test123`);
 
});





