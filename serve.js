const routers = require("./routers");
const express = require("express");

const app = express();

app.get('/', function (req, res) {
    res.json('Shorted URI API Project');
});

app.use(routers.longenedUrlRouter);
app.use(routers.shortenedUrlRouter);

app.use((req, res, next) => {
    res.send('404 NOT FOUND');
});

module.exports = app;