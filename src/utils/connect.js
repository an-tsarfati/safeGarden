const mongoose = require('mongoose');
const { dbUri } = require('./../../config/vars');

async function connect() {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info('DB connected');
  } catch (error) {
    console.error('Could not connect to db');
    console.error(error);
    process.exit(1);
  }
}

module.exports = connect;
