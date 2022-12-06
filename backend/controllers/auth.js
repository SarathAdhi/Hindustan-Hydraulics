const Auth = require('../schema/auth');


exports.signup = (req, res, next) => {
    console.log(req.body);
    Auth.create(req.body).then(result => {
        console.log(result);
        res.status(201).json({
            "status": "success",
            "data": result
        });
        // const auth = new Auth({ name: req.body.name, email: req.body.email, mobile: req.body.mobile, role: req.body.role });
        // auth.save().then(result => {
        //     console.log(result);
        //     res.status(201).json({
        //         "status": "success",
        //         "data": req.body
        //     });
        // }).catch(err => {
        //     console.log(err);
        //     res.status(500).json({
        //         "status": "error",
        //         "data": err
        //     });
        // });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            "status": "error",
            "data": err
        });
    });
};

exports.login = (req, res, next) => {
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


};