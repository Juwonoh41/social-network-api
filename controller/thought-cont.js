const {Users, Thoughts} = require('../models')

const thoughtsCont = {
    getThoughts(req, res) {
        Thoughts.find()
          .sort({ createdAt: -1 })
          .then((dbThought) => {
            res.json(dbThought);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      
      getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
          .then((dbThought) => {
            if (!dbThought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThought);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      
      createThought(req, res) {
        Thoughts.create(req.body)
          .then((dbThought) => {
            return Users.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: dbThought._id } },
              { new: true }
            );
          })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'No user with this id' });
            }
    
            res.json({ message: 'Created' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      updateThought(req, res) {
        Thoughts.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
          .then((dbThought) => {
            if (!dbThought) {
              return res.status(404).json({ message: 'Wrong id' });
            }
            res.json(dbThought);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      // delete thought
      deleteThought(req, res) {
        Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
          .then((dbThought) => {
            if (!dbThought) {
              return res.status(404).json({ message: 'Wrong Id' });
            }
    
            // remove thought id from user's `thoughts` field
            return Users.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            );
          })
          .then((dbUser) => {
            if (!dbUser) {
              return res.status(404).json({ message: 'Wrong id' });
            }
            res.json({ message: 'Deleted!' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      addReaction(req, res) {
        Thoughts.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((dbThought) => {
            if (!dbThought) {
              return res.status(404).json({ message: 'Wrong Id' });
            }
            res.json(dbThought);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      // remove reaction from a thought
      removeReaction(req, res) {
        Thoughts.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((dbThought) => {
            if (!dbThought) {
              return res.status(404).json({ message: 'Wrong Id' });
            }
            res.json(dbThought);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    
}

module.exports = thoughtsCont;