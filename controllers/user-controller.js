const { User, Thought } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(error => {
                console.log(error);
                res.status(400).json(error);
            });
    },
    getUserByID({ params }, res) {
        User.findOne({ _id: params.id })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that specific ID :(' });
                    return;
                }
                res.json(userData);
            })
            .catch(error => {
                console.log(error);
                res.status(400).json(error);
            });
    },
    createUser({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user found with that specific ID :(' });
                    return;
                }
                res.json(userData);
            })
            .catch(error => {
                res.status(400).json(error);
            });
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that specific ID :(' });
                    return;
                }
                res.json(userData);
            })
            .catch(error => res.status(400).json(error));
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user found with that specific ID :(' }); 
                }
            })
            .then(() => {
                res.json({ message: 'User is gone!!' });
            })
            .catch(error => res.status(400).json(error));
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendID } }, { runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that specific ID :(' });
                    return;
                }
                res.json(userData);
            })
            .catch(error => res.status(400).json(error));
    },
    removeFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: {friends: params.friendID } }, { runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(error => res.status(400).json(error));
    },
}

module.exports = userController;