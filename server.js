var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
var data = require("./data-service.js");
app.use(express.static('public'));
// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    console.log("Express http server listening on " + HTTP_PORT);
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/employees", (req, res)  => {
    var resText = `<p>TODO:</p>`;
    res.send(resText);
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);