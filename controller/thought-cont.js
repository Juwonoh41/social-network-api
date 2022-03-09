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
}

module.exports = thoughtsCont;