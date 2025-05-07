const mongoose = require("mongoose");
async function dbConnection(DATA_BASE_URL) {
  try {
    await mongoose.connect(DATA_BASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Database connection failed:", error.message);
    return;
  }
}

module.exports = dbConnection;
