import mongoose, { Schema } from "mongoose";

export const ChatSchema = new Schema(
    {
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
        creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);


ChatSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true,
});
ChatSchema.virtual('participant', {
    localField: 'participants',
    ref: 'Account',
    foreignField: '_id',
    justOne: true,
});