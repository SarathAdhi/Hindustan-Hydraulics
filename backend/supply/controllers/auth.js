const Auth = require('../schema/auth');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const privateKey = fs.readFileSync('private.pem');
const bcrypt = require('bcryptjs');
const AppError = require('../../utils/error');


exports.signup = async(req, res, next) => {
    // console.log(req.body.last_name);
    const auth = new Auth({
        uuid: uuidv4().replace(/-/gi, ""),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        role: 'user',
    });
    auth.save().then(result => {
        // console.log(result);
        res.status(201).json({
            "status": "success",
            "data": {
                "email": result.email,
                "tokens": {
                    "access_token": jwt.sign({ uuid: result.uuid, role: role }, privateKey, { algorithm: 'RS256' })
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            "status": "error",
            "data": err
        });
    });;
};

exports.login = async(req, res, next) => {
    // console.log(req.body);
    const { email, password } = req.body;
    // console.log(email, password);
    if (!email || !password) {
        return res.status(400).json({
            "status": "error",
            "data": "Please provide email and password"
        });
    }

    const user = await Auth.findOne({
        email: email
    }).select('+password');
    // await user.verifyPassword(password);
    if (!user || !(await bcrypt.compare(password, user.password))) {

        return res.status(401).json({
            "status": "error",
            "data": "Invalid email or password"
        });
    }

    res.status(200).json({
        "status": "success",
        "data": {

            "email": user.email,
            "tokens": {
                "access_token": jwt.sign({ uuid: user.uuid, role: user.role }, privateKey, { algorithm: 'RS256' })

            },
        }
    });
}

exports.protect = async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({
            "status": "error",
            "data": "You are not logged in! Please log in to get access."
        });
    }

    const decoded = jwt.verify(token, privateKey, { algorithms: ['RS256'] });
    // console.log(decoded);
    const freshUser = await Auth.findOne({
        uuid: decoded.uuid
    });
    if (!freshUser) {
        return res.status(401).json({
            "status": "error",
            "data": "The user belonging to this token does no longer exist."
        });
    }

    //TODO: Implement password changed after token issued logic
    // if (freshUser.changedPasswordAfter(decoded.iat)) {

    req.user = freshUser;
    next();
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        //TODO: Implement hierarchy logic for roles
        if (req.user.role === 'admin') {
            return next();
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                "status": "error",
                "data": "You do not have permission to perform this action"
            });
        }
        next();
    }
}

exports.verifyToken = async(req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            jwt.verify(bearerToken, privateKey, { algorithms: ['RS256'] }, (err, authData) => {
                if (err) {
                    return next(new AppError(err, 403));
                } else {
                    res.status(200).json({
                        "status": "success",
                        "data": { authData }
                    });
                }
            });
        } else {
            res.sendStatus(403);
        }
    } catch (error) {
        return next(new AppError(error, 403));
    }
}