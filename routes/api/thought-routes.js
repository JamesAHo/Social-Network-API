const router = require('express').Router();

const {CreateThought, GetThoughts, ThoughtID, updateThought, RemoveThought,MoreReactions, RemoveReaction} = require('../../controllers/Controller-thought')


router.route('/').get(GetThoughts).post(CreateThought);
router.route('/:id').get(ThoughtID).put(updateThought).delete(RemoveThought);
router.route('/:thoughtId/reactions/').post(MoreReactions).delete(RemoveReaction);


module.exports = router;