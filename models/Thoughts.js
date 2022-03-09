const { Schema, model } = require('mongoose');
const date = require('../utils/date');
const reactionsSchema = require('./Reactions')
const thoughtsSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: 'You need to leave a thought!',
        minlength: 1,
        maxlength: 280
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
      },
      username: {
        type: String,
        required: true
      },
      reactions: [reactionsSchema]
    },
    {
      toJSON: {
        getters: true
      },
      id: false
    }
  );
  thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });
  const Thought = model('Thought', thoughtsSchema);






  module.exports = Thought;