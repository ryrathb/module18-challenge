const router = require('express').Router();
const { getAllThought,
    addThought,
    getThoughtByID,
    updateThought,
    removeThought,
    addReaction,
    removeReaction 
} = require('../../controllers/thought-controller');
const { route } = require('./user-routes');

router.route('/').get(getAllThought);

router.route('/:userId').get(addThought);

router.route('/:thoughtId')
    .get(getThoughtByID)
    .put(updateThought);

router.route('/:userId/:thoughtId')
    .delete(removeThought);

router.route('/:thoughtId/reactions')
    .post(addReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;