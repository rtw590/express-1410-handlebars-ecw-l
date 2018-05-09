var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);

var tutorials = require('./routes/tutorials');
var downloads = require('./routes/downloads');
var account = require('./routes/account');

var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
// For using mongodb on MLab
// var mongoDB = 'mongodb://user1:password1@ds111618.mlab.com:11618/14-10-store';
var mongoDB = 'mongodb://localhost/1410';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./config/passport');

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'handlebars');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: 'mysupersecret', 
    resave: false, 
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'))

app.use(function(req,res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

app.use('/tutorials', tutorials);
app.use('/downloads', downloads);
app.use('/account', account);

app.get('/', function(req, res){
    res.render('home');
});

// app.get('/tutorials', function(req, res){
//     res.render('tutorials');
// });

app.get('/portfolio', function(req, res){
    res.render('portfolio');
});

app.get('/downloads', function(req, res){
    res.render('downloads');
});


app.listen(8080, '10.136.51.84');
console.log('Server running at http://10.136.51.84:8080/');
