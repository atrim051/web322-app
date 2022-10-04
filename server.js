var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
const multer = require('multer');
var data = require("./data-service.js");
const bodyParser = require('body-parser');

function onHTTPStart() {
    console.log('Express http server listening on: ' + HTTP_PORT);
};

const storage = multer.diskStorage({
    destination: './public/images/uploaded',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));
// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get('/employees/add', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/addEmployee.html'));
});

//// setup a 'route' to listen on /images/add
app.get('/images/add', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/addImage.html'));
});

//// setup a 'route' to listen on /employees
app.get('/employees', function (req, res) {
    if (req.query.status) {
        dataService
            .getEmployeesByStatus(req.query.status)
            .then((data) => {
                res.json(data);
            })
            .catch(function (err) {
                res.json({ message: err });
            });
    } else if (req.query.department) {
        dataService
            .getEmployeesByDepartment(req.query.department)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.json({ message: err });
            });
    } else if (req.query.manager) {
        dataService
            .getEmployeesByManager(req.query.manager)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.json({ message: err });
            });
    } else {
        dataService
            .getAllEmployees()
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.json({ message: err });
            });
    }
});

app.get('/employee/:value', (req, res) => {
    dataService
        .getEmployeeByNum(req.params.value)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ err });
        });
});


app.get('/managers', function (req, res) {
    dataService.getManagers().then((data) => {
        res.json(data);
    });
});

app.get('/departments', function (req, res) {
    dataService.getDepartments().then((data) => {
        res.json(data);
    });
});

app.get('/images', function (req, res) {
    fs.readdir('./public/images/uploaded', (err, items) => {
        res.json({ images: items });
    });
});

app.post('/images/add', upload.single('imageFile'), (req, res) => {
    res.redirect('/images');
});

app.post('/employees/add', (req, res) => {
    dataService
        .addEmployee(req.body)
        .then(res.redirect('/employees'))
        .catch(function (err) {
            res.json({ message: err });
        });
});

//// setup a 'route' for no matching route
//////// Traditional way:
// app.use(function (req, res) {
//   res.status(404).send('Page Not Found');
// });
//////// Modern way:
app.use(function (req, res) {
    res.sendFile(path.join(__dirname, '/views/404.html'));
});

//// setup http server to listen on HTTP_PORT
dataService
    .initialize()
    .then(function () {
        app.listen(HTTP_PORT, onHTTPStart);
    })
    .catch(function (err) {
        console.log('Failed to start!' + err);
    });