const { User, Thought }  = require('../models');

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .sort({ _id: -1 })
            .then(thoughtData => res,json(thoughtData))
            .catch(error => {
                console.log(error);
                res.status(400).json(error);
            });
    },
    getThoughtByID({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
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
    createThought({ body }, res) {
        Thought.create({ thoughtText: body.thoughtText, username: body.username })
            .then(({ _id }) => {
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
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
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with that specific ID :(' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with that specific ID :(' });
                }
                return User.findOneAndUpdate(
                    { thoughts: params.id },
                    { $pull: { thoughts: params.id } },
                    { new: true }
                );
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'Thought deleted but the id was not recognized' });
                    return;
                }
                res.json({ message: "thought deleted" });
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
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(thoughtData => res.json(thoughtData))
            .catch(error => res.json(error));
    }
};

module.exports = thoughtController;