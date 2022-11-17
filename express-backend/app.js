var express = require('express');
//var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// route definition
// app.get('/', function (req, res) {
// res.send('Hello World');
// });
// Start server
// app.listen(4000, function () {
// console.log('App listening at Port 4000..');
// });

/* app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); */

require('./setupMongo')();

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.json())
app.use("/auth", require("./routes/auth"));
app.use("/post", require("./routes/todo"));

app.use(function (err, req, res, next) {
console.error(err.stack);
});

module.exports = app;
