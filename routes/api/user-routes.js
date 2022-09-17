const router = require('express').Router();
const {
    AllUsers,
    CollectUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/Controller-user');

router.route('/').get(AllUsers).post(createUser);

router.route('/:id').get(CollectUserById).put(updateUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;