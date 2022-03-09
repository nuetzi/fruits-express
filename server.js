require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Fruit = require('./models/fruits.js');
const methodOverride = require('method-override');

const port = process.env.PORT || 3000;

// Middleware -- Goes near the top
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


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
        res.redirect('/fruits');
    });
});


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


app.get('/fruits/:id/edit', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{          //find the fruit
      if(!err){
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


// GET: Show one
app.get('/fruits/:id', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        res.render('Show', {
            fruit:foundFruit
        });
    });
});


// DELETE: Delete one
app.delete('/fruits/:id', (req, res) => {
    Fruit.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/fruits');            //redirect back to fruits index
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