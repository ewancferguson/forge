import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    // NOTE If you wish to add additional properties do so here
    isBusiness: {type: Boolean, required: true, default: false},
    coverImg: {type: String, maxLength: 2000},
    linkedIn: {type: String, maxLength: 2000},
    facebook: {type: String, maxLength: 2000},
    website: {type: String, maxLength: 2000},
    reviewId: {type: Schema.ObjectId, required: true, ref: 'Rating'}
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

AccountSchema.virtual('rating', {
  localField: 'reviewId',
  ref: 'Review',
  foreignField: '_id',
  justOne: true
})

