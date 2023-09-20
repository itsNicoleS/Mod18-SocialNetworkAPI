const mongoose = require('mongoose');

const reactionSchemaSchema = new mongoose.Schema({
    reactionID: {
       type: ObjectId, 
            default: new mongoose.Types.ObjectId
},
reactionBody: { type: String, required: true, max: 280, },
username: { type: String, requuired: true, },
createdAt: { type: Date, default: Date.now },
});

const handleError = (err) => console.error(err);