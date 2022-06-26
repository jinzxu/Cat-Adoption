const { MongoClient } = require("mongodb");
// Database string
const database = process.env.ATLAS_URI;
// Database connection and parameters
const client = new MongoClient(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Return the database after connection
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify there is a good "db" object
      if (db)
      {
        _db = db.db("RescueAnimals");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
  // Helper function to get the database
  getDb: function () {
    return _db;
  },
};
