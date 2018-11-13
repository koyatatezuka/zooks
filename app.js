const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

const { home, addProduct, shop, login } = require('./routes/index');
const getError = require('./controllers/error');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', home);
app.use('/add-product', addProduct);
app.use('/shop', shop);
app.use('/log', login);

// return 404 for unknown routes
app.use(getError);

// connect to mongodb
mongoose
	.connect(
		'mongodb+srv://koyata:zookiezooks@cluster0-q8q4b.mongodb.net/zooks?retryWrites=true',
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

