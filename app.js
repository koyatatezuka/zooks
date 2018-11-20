const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcryptjs');

const { mongoPassword, mongoUser, mongoDefaultDataBase } = require('./config')
const { 
	home, 
	product, 
	shop, 
	login, 
	cart, 
	order 
} = require('./routes/index');
const User = require('./models/user');

const getError = require('./controllers/error');

const app = express();

// setup env
const PORT = process.env.PORT || 3000;
const MONGO_PASS = process.env.MONGO_PASS || mongoPassword;
const MONGO_USER = process.env.MONGO_USER || mongoUser;
const MONGO_DEFAULT_DATABASE = process.env.MONGO_DEFAULT_DATABASE || mongoDefaultDataBase;

// hbs setup
app.engine(
	'hbs',
	handlebars({
		layoutsDir: path.join(__dirname, 'views/layouts/'),
		defaultLayout: 'main-layout',
		partialsDir: path.join(__dirname, 'views/partials'),
		extname: 'hbs'
	})
);
app.set('view engine', 'hbs');

// middleware to parse body and read static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		secret: 'cats',
		resave: false,
		saveUninitialized: false
	})
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', home);
app.use('/product', product);
app.use('/shop', shop);
app.use('/log', login);
app.use('/cart', cart);
app.use('/order', order);
// confirmation routes need to be added ----------------------------------

// return 404 for unknown routes
app.use(getError);

// handle user sign in and intialize user
passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		async function(email, password, done) {
			try {
				const user = await User.findOne({ email: email });
				if (!user) {
					return done(null, false, { message: 'Incorrect username/password' });
				}

				bcrypt.compare(password, user.password, function(err, res) {
					if (res) {
						return done(null, user);
					} else {
						return done(null, false, { message: 'Incorrect username/password' });
					}
				});
			} catch (err) {
				return done(err);
			}
		}
	)
);

// connect to mongodb
mongoose
	.connect(
		`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0-q8q4b.mongodb.net/${MONGO_DEFAULT_DATABASE}?retryWrites=true`,
		{ useNewUrlParser: true }
	)
	.then(result => {
		console.log('Connected to MongoDB...');

		// connect to server
		app.listen(PORT, () => {
			console.log(`Listening on port: ${PORT}`);
		});
	})
	.catch(err => {
		console.log(err);
	});
