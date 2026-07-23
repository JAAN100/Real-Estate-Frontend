const mongoose = require("mongoose");
let connectionPromise = null;

function ConnectedToMongoDB(URL) {
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(URL);
  }
  return connectionPromise;
}

module.exports = {
  ConnectedToMongoDB
}