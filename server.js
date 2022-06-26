const express = require("express");
const cors = require("cors");
// Provide the path to the config environment
require("dotenv").config({ path: "./config.env" });

// Initialize express
const app = express();
// Define port
const port = process.env.PORT || 5000;
// Define path
const path = require("path");

// Use cors and express
app.use(cors());
app.use(express.json());
app.use(require("./backend/routes/animal"));

// Get the driver connection
const db = require("./backend/database/connection");

app.all('/animal', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}

app.listen(port, () => {
  // perform a database connection when server starts
  db.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
