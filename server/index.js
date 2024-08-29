const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");  // Import dotenv and configure it at the very beginning
const router = require("./router");
const PGDatabase = require("./controller/database");

dotenv.config();
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
  res.send('Hi There!');
});

// mount all routes on /api path
app.use('/getflix/api', router);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Create a new Postgres Connection object
new PGDatabase();

// Start Server
app.listen(port, () => console.log(`Listening on port ${port}`));
