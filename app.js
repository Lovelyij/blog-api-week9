const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const config = require('./config');

const articleRoutes = require('./routes/articles');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/articles', articleRoutes);
app.use('/auth', authRoutes);

mongoose.connect(config.mongoUri)
  .then(() => console.log('connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));