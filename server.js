// const mongoose = require('mongoose');
// const mondoDB = require('mongoDB'); 
const express = require('express');
const db = require('./config/connection');

const app = express();

const User = require('./models/user');
const Thought = require('./models/thought');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

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
    console.log('test');
    console.log(req.body);
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

        res.status(200).json(user);

    } catch (err) {
        console.error(err);
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
        //ADD MORE DESCRIPOTVIVE for deletion success. 
        res.status(200).json(deleteUser);
    } catch (err) {
        res.status(500).send({ message: err })
    }

});


app.post('/api/users/:userId/friends/:friendId', async (req, res) => {

    const exampleURL = "localholst1111/api/users/potatoe/friends/678910"
    try {
        const userId = req.params.userId;//12345
        const friendId = req.params.friendId;

        //find user by id
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "No here!" });
        }

        //find friend by id
        const friend = await User.findById(friendId);
        if (!friend) {
            return res.status(404).json({ message: "No here!" });
        }

        const userUpdate = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { friends: friendId } },
            { new: true }
        );

        res.status(200).json({ message: "Friend added!" })
    } catch (err) {
        res.status(500).send({ message: err })
    }

});

app.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
    try {
        //remove friend from User list. 
        const userId = req.params.userId;
        const friendId = req.params.friendId;

        const user = await User.findById(userId);

        const userDelete = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { friends: friendId } },
            { new: true }
        );

        res.status(200).json({ message: "fuck that friend." })
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
        //create thought
        const thought = await Thought.create(req.body);

        const user = await User.findOneAndUpdate(
            {_id: req.body.userId},
            { $push: { thoughts: thought._id } },
            { new: true }
        )

        //respond with created thought
        res.status(201).json(user);
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err })
    }

});

app.put('/api/thoughts/:thoughtId', async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const { thoughtText } = req.body;

        //find and update thought by id
        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            { thoughtText },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ Message: "No THOTS here!" })
        }

        res.status(200).json(thought);


    } catch (err) {
        res.status(500).send({ message: err })
    }

});

app.delete('/api/thoughts/:thoughtId', async (req, res) => {
    try {
        //delete by thoughtId
        const thoughtID = req.params.thoughtId;
        const deletedThought = await Thought.findByIdAndDelete(thoughtId);

        if (!deletedThought) {
            return res.status(404).json({ message: "No THOTS here!" })
        }

    } catch (err) {
        res.status(500).send({ message: err })
    }

});

app.post('/api/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
        //create reaction stored in thoughts reactions array
        const thoughtId = req.params.thoughtId;
        const thought = await Thought.findOneAndUpdate(
            {_id: thoughtId}, 
            {$push: {reactions: req.body}}, 
            {new: true}
        )

        res.json(thought)

    } catch (err) {
        res.status(500).send({ message: err })
    }

});

app.delete('/api/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
       //create reaction stored in thoughts reactions array
       const thoughtId = req.params.thoughtId;
       const thought = await Thought.findOneAndUpdate(
           {_id: thoughtId}, 
           {$pull: {reactions: {reactionID: req.params.reactionId}}}, 
           {new: true}
       )

       res.json(thought)
    } catch (err) {
        res.status(500).send({ message: err })
    }

});







db.once('open', () => {
    app.listen(3001, () => {
        console.log("API is watching you");
        console.log("yay!");
    });
});

