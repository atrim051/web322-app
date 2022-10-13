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

const express = require("express");
const app = express();
const data = require("./data-service.js");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const HTTP_PORT = process.env.PORT || 8080;

const storage = multer.diskStorage({
  destination: "./public/images/uploaded",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

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

app.get('/employees', (req, res) => {
  //writing a promise involving functions from a different .js file
  //turn that .js file into a variable (ex): var example = require("path name")
  //it's used with app.get
  //using those functions from the other file is like calling members from a class in C++
    //ex: example.functionExample()
  //then begin the promise after the function 
    //ex: example.functionExample().then((example) => {the response if successful like response.json(example);}).catch((err) => {res.json({message: err});});
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

app.get("/employees/add", (req, res)  => {
  res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
});

app.get("/images/add", upload.single('imageFile'), (req, res)  => {
  res.sendFile(path.join(__dirname, "/views/addImage.html"));
});

app.post("/images/add", (req, res)  => {
  res.redirect('/images');
});

app.get("/images", (req, res)  => {
  fs.readdir('./public/images/uploaded', (err, items) => {
    res.json({ images: items });
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