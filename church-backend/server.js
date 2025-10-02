const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const memberRoutes = require('./routes/memberRoutes');
const eventRoutes = require('./routes/eventRoutes');
const sermonRoutes = require('./routes/sermonRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const pastorRoutes = require('./routes/pastorRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes')
const announcementRoutes = require('./routes/announcementRoutes');
const youthRoutes = require('./routes/youth');
const userRoutes = require('./routes/users');


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/members', memberRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sermons', sermonRoutes);



app.use('/api/admin', adminRoutes);
app.use('/api/pastor', pastorRoutes);
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/youth', youthRoutes);
app.use('/api/users', userRoutes);


app.listen(5000, () => console.log('Server running on port 5000'));