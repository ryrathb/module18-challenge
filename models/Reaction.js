const { Schema, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

const reactionSchema = new Schema(
    {
        reaction_id: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        body: {
            type: String,
            required: true,
            maxlength: 400
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: value => formatDate(value)
        }
    },
    {
        toJSON: {
            getter: true
        },
        id: false
    }
);

module.exports = reactionSchema;