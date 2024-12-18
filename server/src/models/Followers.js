import { Schema } from "mongoose";

export const FollowersSchema = new Schema({
  followingId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  followerId: { type: Schema.ObjectId, required: true, ref: 'Account' }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
}
)


FollowersSchema.virtual('following', {
  localField: 'followingId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

FollowersSchema.virtual('follower', {
  localField: 'followerId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})