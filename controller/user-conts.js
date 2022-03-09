const {Users, Thoughts} = require('../models')

const uCont = {
    getUsers(req, res) {
        Users.find()
          .select('-__v')
          .then((dbUserData) => {
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

    getSingleUser(req, res) {
        Users.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('friends')
          .populate('thoughts')
          .then((dbUser) => {
            if (!dbUser) {
              return res.status(404).json({ message: 'Wrong id' });
            }
            res.json(dbUser);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
}