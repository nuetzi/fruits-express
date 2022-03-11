const Fruit = require('../models/fruits.js');

const dataController = {
    index(req, res, next) {
        Fruit.find({}, (error, allFruits) => {
            if(error) {
                res.status(404).send({ msg: error.message });
            } else {
                res.locals.data.fruits = allFruits;
                next();
            };
        });
    },

    create(req, res, next) {
        req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
        // Use Model to create Fruit Document
        Fruit.create(req.body, (error, createdFruit) => {
            // Once created - respond to client
            if(error) {
                res.status(404).send({ msg: error.message });
            } else {
                res.locals.data.fruit = createdFruit;
                next();
            };
        });
    },

    show(req, res, next) {
        Fruit.findById(req.params.id, (error, foundFruit) => {
            if(error){
                res.status(404).send({ msg: error.message });
            } else {
                res.locals.data.fruit = foundFruit;
                next();
            };
        });
    },

    update(req, res, next) {
        req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
        Fruit.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedFruit) => {
            if(error) {
                res.status(404).send({ msg: error.message });
            } else {
                res.locals.data.fruit = updatedFruit;
                next();
            };
        });
    },

    destroy(req, res, next){
        Fruit.findByIdAndRemove(req.params.id, (error, fruit) => {
            if(error) {
                res.status(404).send({ msg: error.message });
            } else {
                res.locals.data.fruit = fruit;
                next();
            };
        });
    }
};

module.exports = dataController;