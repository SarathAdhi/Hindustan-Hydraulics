const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/hindustan'
    // const db = "mongodb+srv://root:zuvaLabs@zuvalabs.bgzsah1.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async() => {
    try {
        await mongoose.connect(
            db, {
                useNewUrlParser: true
            }
        );

        console.log('MongoDB is Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;