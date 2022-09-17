const { User, Thought } = require('../models');

const userController = {

    // GET /api/users
    AllUsers (req, res) {
        try {
            User.find({})
             .select('-__v')
             .then(dbUserData => res.json(dbUserData))
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }

    },

    // GET /api/users/:id
    CollectUserById({ params }, res) {
        try {
            User.findOne({ _id: params.id }).populate([
            { path: 'thoughts', select: "-__v" },
            { path: 'friends', select: "-__v" }
        ])
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
        
    },

    // POST /api/users
  
    createUser({ body }, res) {

        try {
            User.create(body).then(dbUserData => res.json(dbUserData))
        } catch (error) {
            res.status(404).json(err)
        }
    },

    // PUT /api/users/:id
   
    updateUser({ params, body }, res) {
        try {
            User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: false })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
        } catch (error) {
            res.status(404).json(error)
        }
       
    },

    // DELETE /api/users/:id
    deleteUser({ params }, res) {
        // delete the user
        try {
            User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id'});
                    return;
                }
              // update User after delete 
                User.updateMany(
                    { _id : {$in: dbUserData.friends } },
                    { $pull: { friends: params.id } }
                )
                .then(() => {
                    Thought.deleteMany({ username : dbUserData.username })
                    .then(() => {
                        res.json({message: "Successfully deleted user"});
                    })
                    .catch(err => res.status(400).json(err));
                })
                .catch(err => res.status(400).json(err));
            })
        } catch (error) {
            res.status(400).json(error)
        }
    },

    // POST /api/users/:userId/friends/:friendId
    addFriend({ params }, res) {
        try {
            User.findOneAndUpdate(
                { _id: params.userId },
                { $addToSet: { friends: params.friendId } },
                { new: true, runValidators: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this userId' });
                    return;
                }
                // add userId to friendId's friend list
                User.findOneAndUpdate(
                    { _id: params.friendId },
                    { $addToSet: { friends: params.userId } },
                    { new: true, runValidators: true }
                )
                .then(dbUserData2 => {
                    if(!dbUserData2) {
                        res.status(404).json({ message: 'No user found with this friendId' })
                        return;
                    }
                    res.json(dbUserData);
                })
                .catch(err => res.json(err));
            })
        } catch (error) {
            res.status(404).json(error)
        }
    },

    // DELETE /api/users/:userId/friends/:friendId
    deleteFriend({ params }, res) {
        try {
            User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true, runValidators: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this userId' });
                    return;
                }
                // remove userId from friendId's friend list
                User.findOneAndUpdate(
                    { _id: params.friendId },
                    { $pull: { friends: params.userId } },
                    { new: true, runValidators: true }
                )
                .then(dbUserData2 => {
                    if(!dbUserData2) {
                        res.status(404).json({ message: 'No user found with this friendId' })
                        return;
                    }
                    res.json({message: 'Successfully deleted the friend'});
                })
                .catch(err => res.json(err));
            })
        } catch (error) {
            res.status(404).json(error)
        }
    }
}

module.exports = userController;