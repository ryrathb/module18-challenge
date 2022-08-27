const { Thought } = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
            .populate('reactions')
            .then(thoughtData => res,json(thoughtData))
            .catch(error => {
                console.log(error);
                res.status(400).json(error);
            });
    },
    getThoughtByID({ params }, res) {
        Thought.findOne({ _id: params.thoughtID })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with that specific ID :(' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(error => {
                console.log(error);
                res.status(400).json(error);
            });
    },
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userID },
                    { $push: { thought: _id } },
                    { new: true }
                );
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that specific ID :(' });
                    return;
                }
                res.json(userData);
            })
            .catch(error => res.status(400).json(error));
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with that specific ID :(' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with that specific ID :(' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that specific ID :(' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'No thought found with that specific ID :(' });
                }
                res.json(thoughtData);
            })
            .catch(error => res.json(error));
    },
    removeReaction({ params }, res) {
        console.log(params.thoughtId, params.reactionId);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then(thoughtData => res.json(thoughtData))
            .catch(error => res.json(error));
    }
};

module.exports = thoughtController;