const {User, Thought} = require('../models');

const ControllerThought = {
    // create Thought by POST /api/thoughts
    
    CreateThought({body}, res) {
        try {
            Thought.create(body).then(Thoughtdb => {
                User.findOneAndUpdate({_id: body.userId}, {$push: {thoughts: Thoughtdb._id}}, {new: true}).then(Userdb => {
                    if(!Userdb) {
                        res.status(404).json({message: 'No user found'});
                        return;
                    }
                    res.json(Userdb)
                }).catch(err => res.json(err))
    
            })
        } catch (error) {
            res.status(400).json(error)
        }
    },
    // using GET /api/thoughts
    GetThoughts(req, res) {
        Thought.find({}).populate({path: 'reactions', select: '-__v' }).select('-__v').then(Thoughtdb => res.json(Thoughtdb)).catch(err =>
             res.status(500).json(err))
    },
    // get thought by id
    // GET /api/thoughts/:id
    ThoughtID({params}, res) {
        try {
            Thought.findOne({_id: params.id}).populate({path: 'reactions', select: '-__v'}).select('-__v').then(Thoughtdb => {
                if(!Thoughtdb) {
                    res.status(404).json({message: 'No thought found'});
                    return;
                }
                res.json(Thoughtdb)
            })
        } catch (error) {
            res.status(404).json(error)
        }
        
    },
    // We want to update thought
    // PUT /api/thoughts/:id
    updateThought({params, body}, res) {
        try {
            Thought.findOneAndUpdate({_id: params.id}, body, {new: true}).then(Thoughtdb => {
                if(!Thoughtdb) {
                    res.status(404).json({message: 'No thought found by this id'});
                    return;
                }
                res.json(Thoughtdb)
            })
        } catch (error) {
            res.status(404).json(error)
        }
        
    },
    // We want to delete thought 
    // routes is DELETE /api/thoughts/:id
    RemoveThought({params},res) {
        try {
            Thought.findOneAndDelete({_id: params.id}).then(Thoughtdb =>{
                if(!Thoughtdb) {
                    res.status(404).json({message: "No thought found with this user"});
                    return;
                }
                User.findOneAndUpdate({username: Thoughtdb.username}, {$pull: {thoughts: params.id}}).then(() => {
                    res.json({message: "Successfully delete thought"})
                }).catch(err => res.status(500).json(err));
            })
        } catch (error) {
            res.status(404).json(error)
        }
    }, 
    // we want to add reactions
    // routes /api/thoughts/:id/reactions
    MoreReactions({params, body}, res) {
        try {
            Thought.findOneAndUpdate({_id: params.thoughtId}, {$addToSet: {reactions:body}}, {new:true}).then(Thoughtdb => {
                if(!Thoughtdb) {
                    res.status(404).json({message: 'No thought found by this id'});
                    return;
                }
                res.json(Thoughtdb)
            })
        } catch (error) {
            res.status(404).json(error);
        }
       
    },
    // we want to remove reactions
    // DELETE /api/thoughts/:id/reactions
    RemoveReaction({params, body}, res) {
        try {
            Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: { reactions: {reactionID: body.reactionId}}}, {new: true, runValidators:true}).then(Thoughtdb => {
                if(!Thoughtdb) {
                    res.status(404).json({message: 'No thought found by this id'});
                    return;
                }
                res.json({message: "Deleted Successfully"})
            })
        } catch (error) {
            res.status(404).json(error)
        }
        
    },

    

}
module.exports = ControllerThought; 