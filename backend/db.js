const mongoose = require('mongoose');
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const url = mongoURL({ host, port, username, password,database });


function mongoURL(options) {
        options = options || {};
        var URL = 'mongodb://';
        if (options.password && options.username) URL += options.username + ':' + options.password + '@';
        URL += (options.host || 'localhost') + ':';
        URL += (options.port || '27017') + '/';
        URL += (options.database || 'admin');
        URL += '?authSource=admin';
        return URL;
}

const connectDB = async() => {
    try {
        await mongoose.connect(
            url, {
                useNewUrlParser: true,
            }
        );

        console.log('MongoDB is Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;