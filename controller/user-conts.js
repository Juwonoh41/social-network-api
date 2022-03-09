const {Users, Thoughts} = require('../models')

const uCont = {
    getUsers(req, res) {
        Users.find()
          .select('-__v')
          .then((dbUser) => {
            res.json(dbUser);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

    getSingleUser(req, res) {
        Users.findOne({ _id: req.params.id })
          .select('-__v')
          .populate('friends')
          .populate('thoughts')
          .then((dbUser)=>{
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
    createUser(req, res) {
        Users.create(req.body)
          .then((dbUser) => {
            res.json(dbUser);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
}

module.exports = uCont