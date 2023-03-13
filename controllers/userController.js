
const { User, Thought } = require("../models");


module.exports = {

  // Get user routes
  getUser(req, res) {
    User.find({})
    .select("-__v")
    .lean().populate('friends','username')
    .lean().populate("thoughts","thoughtText")
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // user create route
  Create(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Get single user route
  Getsingleuser(req, res) {
    User.findOne({ _id: req.params.userId })
      .lean().populate('friends','username')
      .lean().populate("thoughts","thoughtText")
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with that ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // update user route
  Edituser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete user route
  Removeuser(req, res) {
    console.log(req.params.id)
    User.findOneAndDelete({ _id: req.params.userId },)
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this ID!" })
          : res.json(user)
      )
      .catch(err => res.status(400).json(err));
  },

  // add friend route
  Createfrind(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true })

      .populate({ path: 'friends', select: ('-__v') })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this ID!" })
          : res.json(user)
      )
      .catch(err => res.json(err));
  },

  // Remove friend route
  Removefriend(req, res) {

    User.findOneAndUpdate(
      { _id: req.params.userId },
      
      { $pull: { friends: req.params.friendId } },
      { runValidators: true,new: true })
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this ID!" })
          : res.json(user)
      )
      .catch(err => res.status(400).json(err));
  }

};
