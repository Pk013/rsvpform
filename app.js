let express = require('express');
let mongoose = require('mongoose');

const port = 3000
const app = express();

mongoose.connect('mongodb://localhost:27017/rsvp', { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection:'));

app.use(express.static('public/'));
app.use(express.urlencoded())
app.set('view engine', 'pug')


const responseSchema = mongoose.Schema({
    name: String,
    email: String,
    attending: String,
    guests: Number,
})

const Response = mongoose.model('Response', responseSchema, 'responses');

app.get('/', function(req, res) {
    res.render('main', { Document: "PKs big bash yalllllll" })
})


app.get('/guest', function(req, res) {
    Response.find(function(err, guests) {
        if (err) return console.error(err);
        console.log(guests);
        res.render('guest', {
            Document: "Guest List",
            Guests: guests
        })
    });
})

app.post('/reply', function(req, res, next) {

    console.log('in db call', req.body)
    let guest = new Response({
        name: req.body.name,
        email: req.body.email,
        attending: req.body.attend,
        guests: req.body.numGuests
    })

    guest.save();

    res.render('response', { Document: "PKs big bash yalllllll" })
})






app.listen(port, function() { console.log("I am working") });