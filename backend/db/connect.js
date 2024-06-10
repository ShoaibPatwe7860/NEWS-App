const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://shoaibpatwe23:shoaib@clusterexpress1.vicuq3l.mongodb.net/NEWS?retryWrites=true&w=majority&appName=ClusterExpress1"
);
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose is connected to database");
});

connection.on("error", () => {
  console.log("Mongo DB Connection Failed");
});

module.exports = mongoose;
