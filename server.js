var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
var data = require("./data-service.js");
const bodyParser = require('body-parser');

function onHTTPStart() {
    console.log('Express http server listening on: ' + HTTP_PORT);
  }

app.use(express.static('public'));
// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    console.log("Express http server listening on " + HTTP_PORT);
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get('/employees', function (req, res) {
    dataService
      .getAllEmployees()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ message: err });
      });
  });

app.get("/managers", (req, res)  => {
    data.getManagers().then((data) => {
        res.json(data);
      });
});

app.get("/departments", (req, res)  => {
    dataService.getDepartments().then((data) => {
        res.json(data);
      });
});

data
  .initialize()
  .then(function () {
    app.listen(HTTP_PORT, onHTTPStart);
  })
  .catch(function (err) {
    console.log('No Data. Failed to start.' + err);
  });