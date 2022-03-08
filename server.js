require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Fruit = require('./models/fruits.js');

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));


// Setup view engine above routes
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());


// Create a page that will allow us to create a new fruit
app.get('/fruits/new', (req, res) => {
    res.render('New');
});


// Index route: Show ALL
app.get('/fruits', (req, res)=>{
    Fruit.find({}, (error, allFruits)=>{
        res.render('Index', {
            fruits: allFruits
        });
    });
});


// form POST
app.post('/fruits/', (req, res)=>{
    if(req.body.readyToEat === 'on'){       //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else {                                //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, (error, createdFruit)=>{
        res.send(createdFruit);
        res.redirect('/fruits');
    });
});


app.get('/fruits/:id', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{
        res.render('Show', {
            fruit:foundFruit
        });
    });
});



// Connect to mongo database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('Connected to mongo');
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});