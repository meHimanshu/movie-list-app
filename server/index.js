const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');


const router = require("./router");
const seedInitials = require("./seed");
const app = express();
const port = process.env.PORT || 7000;



app.use(cors({
  optionsSuccessStatus: 200,
  origin: "*",
  // credentials: true,
})); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/health-check', (req, res) => {
  res.send('I am OK');
});

// mount all routes on /api path
app.use('/api',router);

// catch 404 and forward to error handler
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.use((req, res) => {
  res.status(404).send("Not Found");
});


// error handler, send stacktrace only during development
// this.app.use(errorHandler(stack));
mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true });
app.listen(port, () => console.log(`Listening on port ${port}`));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Database connected")
  console.log("Seeding...")
  seedInitials();
});