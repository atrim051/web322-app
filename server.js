/*************************************************************************
* WEB322– Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Alexander Trimble Student ID: 144365160 Date: 2022-10-02
*
* Your app’s URL (from Heroku) :https://afternoon-hollows-68810.herokuapp.com/
*
*************************************************************************/ 

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
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get('/employees', function (req, res) {
    data
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
    data.getDepartments().then((data) => {
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