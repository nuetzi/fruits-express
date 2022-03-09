require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Fruit = require('./models/fruits.js');
const methodOverride = require('method-override');

const port = process.env.PORT || 3000;

// Middleware -- Executes for all routes, so it goes near the top
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));  //tells express to try to match requests with files in the directory called 'public'


// Setup view engine above routes
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());


// SEED values
app.get('/fruits/seed', (req, res) => {
    Fruit.create([
        {
            name:'grapefruit',
            color:'pink',
            readyToEat:true
        },
        {
            name:'grape',
            color:'purple',
            readyToEat:false
        },
        {
            name:'avocado',
            color:'green',
            readyToEat:false
        }
    ], (err, data) => {
        res.redirect('/fruits')
    });
});


// INDEX route: Shows ALL
app.get('/fruits', (req, res)=>{
    Fruit.find({}, (error, allFruits)=>{
        res.render('Index', {fruits: allFruits});
    });
});


// Create a page that will allow us to create a new fruit
// Goes above the SHOW route
app.get('/fruits/new', (req, res) => {
    res.render('New');
});


// POST -- New fruit; CREATE route
app.post('/fruits/', (req, res)=>{
    if(req.body.readyToEat === 'on') {      // If checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;         // Do some data correction
    } else {                                // If not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;        // Do some data correction
    }
    Fruit.create(req.body, (error, createdFruit)=>{
        res.redirect('/fruits');
    });
});


// Add a SHOW route
app.get('/fruits/:id', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        res.render('Show', {fruit: foundFruit});
    });
});


// DELETE route -- Goes beneath SHOW route
app.delete('/fruits/:id', (req, res) => {
    Fruit.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/fruits');            //redirect back to fruits index
    });
});


// EDIT route - Gets the form, prepopulated, to edit the fruit
// Goes beneath the DELETE route
app.get('/fruits/:id/edit', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {          //find the fruit
      if(!err) {
        res.render(
    		  'Edit',
    		{
    			fruit: foundFruit               //pass in found fruit
    		}
    	);
    } else {
      res.send({ msg: err.message })
    }
    });
});


// PUT route -- Second part of the EDIT route
app.put('/fruits/:id', (req, res)=>{
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Fruit.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
        res.redirect('/fruits');
    });
});



// Connect to mongo database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to mongo');
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});