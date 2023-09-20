const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, min:1, max:280, },
    createdAt: { type: Date, default: Date.now },
    username: {type: String, requuired: true,},
    reactions: {[reactionSchema]}
});

const handleError = (err) => console.error(err);