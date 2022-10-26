require("dotenv/config");
const express = require("express");
const connectDB = require("./database/db");
const routers = require("./routers");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.get('/', function (req, res) {
    res.json('Shorted URI API Project');
});

app.use(routers.longenedUrlRouter);
app.use(routers.shortenedUrlRouter);

app.use((req, res, next) => {
    res.send('404 NOT FOUND');
});

app.listen(PORT, ()=>{
    console.log(`Ready on http://localhost:${PORT}`);
});
