const mongoose = require("mongoose");

async function openDatabase() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing. Create backend/.env first.");
  }

  await mongoose.connect(process.env.MONGO_URI);
}

module.exports = openDatabase;
