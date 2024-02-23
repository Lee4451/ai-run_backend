const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
require('dotenv').config();

const authRouter = require("./routes/authRoute")

// const authRouter = require('./routes/auth')
const app = express();
var corsOptions = { origin: "http://localhost:3000" };
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mern_portal', { useNewUrlParser: true, useUnifiedTopology: true });
app.use('/api/v1/auth', authRouter);

// app.get("/", (req, res) => {
//   res.json({ message: "Test successful." });
// });


// set port, listen for requests
app.listen(PORT, () => {
  console.log("Server is running on " + process.env.URL + ":" + PORT);
});