const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionID: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    reactionBody: { type: String, required: true, max: 280, },
    username: { type: String, required: true, },
    createdAt: { type: Date, default: Date.now },
});

const thoughtSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, min: 1, max: 280, },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [reactionSchema]
});



//virtual
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;