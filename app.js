const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

const { home, product, shop, login, cart, order } = require('./routes/index');
const User = require('./models/user');

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

// middleware to parse body and read static files
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// temp middleware to inject user ------------------------------

app.use(async (req, res, next) => {
	try {
		const user = await User.findOne({ _id: '5bee2a5b65522c1220913145' });

		req.user = user;
		next();
	} catch (err) {
		console.log('Doesnt exist bruh...');
	}
});

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
