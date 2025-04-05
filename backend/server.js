const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`the server is run on port number  ${PORT}`));
