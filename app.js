require("dotenv/config");
const express = require("express");
const connectDB = require("./database/db");
const serve = require("./serve");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(serve);

app.listen(PORT, ()=>{
    console.log(`Ready on http://localhost:${PORT}`);
});
