const router = require('express').Router();
const { getAllThought,
    createThought,
    getThoughtByID,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction 
} = require('../../controllers/thought-controller');


router.route('/')
    .get(getAllThought)
    .post(createThought);

router.route('/:id')
    .get(getThoughtByID)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
    .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;