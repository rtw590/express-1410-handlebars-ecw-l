var express = require('express');
var router = express.Router();
const Tutorial = require('../models/tutorial');
var Cart = require('../models/cart');

router.use(express.static('public'))

router.get('/', function(req, res, next){
    Tutorial.find(function(err, docs) {
        var tutorialChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i+= chunkSize) {
            tutorialChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('tutorials', {title: 'Tutorials', tutorials: tutorialChunks});
    });
});

// Get Single Tutorial
router.get('/:id', function(req, res){
    Tutorial.findById(req.params.id, function(err, tutorial){
        res.render('tutorial', {
            tutorial: tutorial
        });
    })
});


// First Attempt to work
router.get('/add-to-cart/:id', function(req, res, next) {
    var tutorialId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log(req.body);
    console.log(req.body.PWYW);

    Tutorial.findById(tutorialId, function(err, tutorial) {
        if (err) {
            console.log(err);
            return res.send('There was an error');
        }
        cart.add(tutorial, tutorial.id);
        req.session.cart = cart;
        console.log(req.session.cart)
        res.redirect('/')
    });
});

// Add Submit POST Route
router.post('/add', function(req, res){
    let tutorial = new Tutorial();
    tutorial.title = req.body.title;
    tutorial.imgPath = req.body.imgPath;
    tutorial.youtubeID = req.body.youtubeID;
    tutorial.imgPath = req.body.imgPath;
    tutorial.shortDesc = req.body.shortDesc;
    tutorial.longDesc = req.body.longDesc;
    tutorial.filesNeeded1Title = req.body.filesNeeded1Title;
    tutorial.filesNeeded1 = req.body.filesNeeded1;
    tutorial.filesNeeded2Title = req.body.filesNeeded2Title;
    tutorial.filesNeeded2 = req.body.filesNeeded2;
    tutorial.filesNeeded3Title = req.body.filesNeeded3Title;
    tutorial.filesNeeded3 = req.body.filesNeeded3;
    tutorial.filesNeeded4Title = req.body.filesNeeded4Title;
    tutorial.filesNeeded4 = req.body.filesNeeded4;
    tutorial.ecwid = req.body.ecwid;

    tutorial.save(function(err){
    if(err){
        console.log(err);
        return;
    } else {
        res.redirect('/');
    }
    });
});

module.exports = router;
