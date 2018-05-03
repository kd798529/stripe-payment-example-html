const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const stripe = require('stripe')('sk_test_vsxsVedMiX98SQfxctlOpxn1');

const server = express();


server.set('view engine', 'hbs');
server.set('views', __dirname + '/views')
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));



server.get('/', (req, res) => {
	res.render('index', {

  })
});

server.get('/success', (req, res) => {
  res.render('success', {

  })
})

server.post('/charge', (req, res) => {
  const token = req.body.stripeToken;
  const chargeAmount = req.body.chargeAmount;
  const charge = stripe.charges.create({
    amount: chargeAmount,
    currency: "usd",
    source: token
  }, (err, charge) => {
    if(err && err.type ==="StripeCardError"){
      console.log('your card was declined');
    }
  })
  console.log('your payment was successful');
  res.redirect('/success');
});




server.listen(3030, () => {
	console.log('stripe is running')
});
