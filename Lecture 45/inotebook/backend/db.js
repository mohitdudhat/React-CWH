const mongoose = require("mongoose");
const mongoURI =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1";
const connectToMongo = async () => {
  await mongoose.connect(mongoURI).then(() => {
    console.log("Your MongoDB is Successfully created !!");
  });
};
module.exports = connectToMongo;
