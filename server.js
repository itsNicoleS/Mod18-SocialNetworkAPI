const mongoose = require('mongoose');
// const mondoDB = require('mongoDB'); 
const express = require('express');
const db = require('./config/connection');

const app = express();


const User = require('./models/user');
const Thought = require('./models/thought');

//GETS and PUTS and shit go here. 
//api/users = GET all users
app.get('/api/users', async (req, res) => {
    try {
        const result = await User.find();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({ message: err })

    }
});


///api/users = GET a single user, by ID and thought n friend data
app.get('/api/users/:userId', async (req, res) => {
    try {
        const result = await User.findOne({ _id: req.params.userId });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({ message: err })

    }
});

//POST a new user
app.post('/api/users', async (req, res) => {
    try {
        var user = await User.create(req.body);
        res.status(200).send("user created successfully: " + user._id);

    } catch (err) {
        res.status(500).send({ message: err })

    }
});

//PUT update User by ID, 
app.put('/api/users/:userId', async (req, res) => {
    try {
        // find and update user heredo updates here         
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        if (!user) {
            return res.status(404).json({ message: "User no here!" })
        }

        res.status(200).send("yay you did it");

    } catch (err) {
        res.status(500).send({ message: err })

    }
});
//DELETE user by ID, 
app.delete('/api/users/:userId', async (req, res) => {
    try {
        //delete user with userID
        const deleteUser = await User.findOneAndDelete({ _id: req.params.userId });
        if (!deleteUser) {
            return res.status(404).json({ message: "No here!" })
        }

        //BONUS delete users thoughts on delete:user CASCADE
        //await Thought.deleteMany({ userId: req.params.userId });

    } catch (err) {
        res.status(500).send({ message: err })
    }

});


app.post('/api/users/:userId/friends/:friendId', async (req, res) => {
    try {
        // user_id = friend_id 
    } catch (err) {
        res.status(500).send({ message: err })
    }

});

app.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
    try {
        //remove friend from User list.  
    } catch (err) {
        res.status(500).send({ message: err })
    }

});

app.get('/api/thoughts', async (req, res) => {
    try {
        const result = await Thought.find();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({ message: err })
    }

});

app.get('/api/thoughts/:thoughtId', async (req, res) => {
    try {
        const result = await Thought.findOne({ _id: req.params.thoughtId })
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({ message: err })
    }

});

app.post('/api/thoughts', async (req, res) => {
    try {
        //create new thought (push created thoughtID to users THOT array)
    } catch (err) {
        res.status(500).send({ message: err })
    }

});

app.put('/api/thoughts/:thoughtId', async (req, res) => {
    try {
        //update thoughjkfdg hpidaufgh by ID
    } catch (err) {
        res.status(500).send({ message: err })
    }

});

app.delete('/api/thoughts/:thoughtId', async (req, res) => {
    try {
        //delete by thoughtId
    } catch (err) {
        res.status(500).send({ message: err })
    }

});

app.post('/api/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
        //create raction stored in thoughts reactions array
    } catch (err) {
        res.status(500).send({ message: err })
    }

});

app.delete('/api/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        //delete reaction by Id
    } catch (err) {
        res.status(500).send({ message: err })
    }

});







db.once('open', () => {
    app.listen(3001, () => {
        console.log("API is watching you");
    });
});


console.log("yay!");
