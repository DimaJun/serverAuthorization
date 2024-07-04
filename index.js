require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const {PORT} = process.env || 3000;
const {MONGO_URI} = process.env;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch(error => {
        console.error('Error connection to MongoDB: ', error);
    })

app.use('/auth', authRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
}) 