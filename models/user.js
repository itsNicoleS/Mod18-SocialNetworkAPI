const mongoose = require('mongoose');

//validate email
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var EmailSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Hey fat fingers, this is not a fuckin email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Hey fat fingers, this is not a fuckin email address']
    }
});

//schema 
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true },
    email: {
        type: String, required: true, unique: true,
        validator: {
            validateEmail,
            message: 'Invalid'
        }
    },
    thoughts: { thoughtId: { type: mongoose.Schema.Types.ObjectId, ref: 'Thought' } },
    friends: { userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }
});

const handleError = (err) => console.error(err);