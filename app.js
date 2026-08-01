const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const articleRoutes = require('./routes/articles');

const app = express();

app.use(express.json());
app.use('/api/articles', articleRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
