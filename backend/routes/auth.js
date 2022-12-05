var express = require('express');
var router = express.Router();
var Auth = require('../schema/auth');

var mongoose = require('mongoose');

router.post('/signup', (req, res, next) => {
    // console.log(req.body);
    const auth = new Auth({ name: req.body.name, email: req.body.email, mobile: req.body.mobile, role: req.body.role });
    auth.save().then(result => {
        console.log(result);
        res.status(201).json({
            "status": "success",
            "data": req.body
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            "status": "error",
            "data": err
        });
    });
});

router.post('/login', (req, res, next) => {
    // console.log(req.body);
    var doc = Auth.findOne({
        email: req.body.email
    }, (err, doc) => {
        if (err) {
            console.log(err);
        }
        console.log(doc);
        res.status(200).json({ "status": "success", "data": doc })
    });


});

module.exports = router;