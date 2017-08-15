var express = require('express');
var router = express.Router();
var model = require('../models');

router.get('/', function(req, res) {
    res.redirect('/burgers');
});

router.get('/burgers', function(req, res) {
    model.burger.findAll().then(function(data) {
        var hbsObject = { burgers: data };
        res.render('index', hbsObject);
    });
});

router.post('/burgers/create', function(req, res) {
    model.burger.create({
        burger_name: req.body.b_name,
        devoured: req.body.devoured
    }).then(function() {
        res.redirect('/burgers');
    });
});

router.post('/burgers/update/:id', function(req, res) {

    model.burger.update({
        devoured: req.body.devoured
    }, { where: { id: req.params.id } }).then(function(data) {
        res.redirect('/burgers');
    }).error(function(err) {
        console.log("Update failed");
    });
});

router.delete('/burgers/delete/:id', function(req, res) {
    model.burger.destroy({
        where: { id: req.params.id }
    }).then(function() {
        res.redirect('/burgers');
    });
});

module.exports = router;