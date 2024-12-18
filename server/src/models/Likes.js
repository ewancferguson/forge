import { Schema } from "mongoose";

export const LikesSchema = new Schema({
  listingId: { type: Schema.ObjectId, required: true },
  accountId: { type: Schema.ObjectId, required: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
}

)

LikesSchema.virtual('account', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})


LikesSchema.virtual('listing', {
  localField: 'listingId',
  ref: 'Listing',
  foreignField: '_id',
  justOne: true
})

