const mongoose = require('mongoose');

//validate email
var validateEmail = function (email) {
    var re = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}$/;
    return re.test(email)
};

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
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//virtual 
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})
const User = mongoose.model('user', userSchema);
module.exports = User;