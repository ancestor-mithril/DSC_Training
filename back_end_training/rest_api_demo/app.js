const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");
require("dotenv").config();


const server = express();


server.use(bodyParser.json());
server.use(cors());


mongoose.connect(
    process.env.DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    () => console.log("Connected to DB")
);


server.use("/", routes);

server.listen(
    process.env.PORT || 3000,
    console.log(`Hello there at port ${process.env.PORT || 3000}`)
);
