import { Schema } from "mongoose";

export const LikesSchema = new Schema({
  listingId: { type: Schema.ObjectId, ref: 'Listing' },
  accountId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  serviceId: {type: Schema.ObjectId, ref: 'Service'}
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

LikesSchema.virtual('service', {
  localField: 'serviceId',
  ref: 'Service',
  foreignField: '_id',
  justOne: true
})
