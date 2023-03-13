const { User, Thought } = require("../models");

module.exports = {
    getll(req, res) {

        Thought.find({})
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },

    Create(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: "No record find!" })
                    : res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },

    
    Getsinglerecord(req, res) {
       
        Thought.findOne({ _id: req.params.thoughtId })
            
            .select("-__v")
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: "No record find!" })
                    : res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },

    
    updateThought( req, res) {
        
        Thought.findOneAndUpdate(
           
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: "No record find!" })
                    : res.json(thoughtData)
            )
            .catch(err => res.json(err));
    },

    
    Removethought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then((thoughtData) =>
        !thoughtData
            ? res.status(404).json({ message: "No record find!" })
            : res.json(thoughtData)
    )
    .catch(err => res.json(err));
    },

    CreateR(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: "No record find!" })
                    : res.json(thoughtData)
            )
            .catch(err => res.json(err));
    },

    
    Removereaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: "No record find!" })
                    : res.json(thoughtData)
            )
            .catch(err => res.json(err));
    }

};
