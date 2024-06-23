const mongoose = require('mongoose');
require('dotenv').config(); // Ensure you have dotenv configured to load environment variables

const uploaddb = async () => {
  const db = mongoose.connection;
  const mongoUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/SuveySay'; // Use environment variable or fallback to local

  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }

  db.on('error', (error) => { console.log(error); });
  db.once('connected', () => { console.log('db is running'); });
};

module.exports = uploaddb;
