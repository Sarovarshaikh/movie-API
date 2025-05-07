const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./db/db.connecton");
const movieRouter = require("./routes/movie");
dotenv.config();

const app = express();

// Middleware here data parsing incoming request
app.use(cors());
app.use(express.json());

// mongoDB connection
dbConnection(process.env.MONGODB_URL);

// routes
app.use("/api/v1", movieRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
