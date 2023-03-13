const { connect, connection, mongoose } = require('mongoose');

mongoose.set("strictQuery", false);

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ClassDb';

// Wrap Mongoose to MongoDB
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection 
module.exports = connection;
