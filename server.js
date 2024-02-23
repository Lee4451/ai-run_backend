const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const RateLimit = require('express-rate-limit');
require('dotenv').config();

const authRouter = require("./routes/authRoute")
const stravaRouter = require("./routes/stravaRoute")

// const authRouter = require('./routes/auth')
const app = express();
var corsOptions = { origin: "http://localhost:3000" };
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // max 100 requests per windowMs
});
app.use(limiter);

app.get('/:path', function(req, res) {
  let path = req.params.path;
  if (isValidPath(path))
    res.sendFile(path);
});


// mongoose.connect(process.env.MONGO_URI);

const dbURI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_URI}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
console.log(dbURI)
mongoose.connect(dbURI)
.then(() => {
  console.log('Connected to MongoDB successfully!');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/strava', stravaRouter);

// app.get("/", (req, res) => {
//   res.json({ message: "Test successful." });
// });


// set port, listen for requests
app.listen(PORT, () => {
  console.log("Server is running on " + process.env.URL + ":" + PORT);
});