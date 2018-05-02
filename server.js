const express = require('express');
const bodyParser = require('body-parser');

const server = express();


server.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
})

server.post('/api/payment', (req, res) => {
	// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
const token = req.body.stripeToken; // Using Express

const charge = stripe.charges.create({
  amount: 999,
  currency: 'usd',
  description: 'Example charge',
  source: token,
});

})

server.listen(3030, () => {
	console.log('server is running on port 3030')
});