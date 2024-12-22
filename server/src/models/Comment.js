import { Schema } from "mongoose";


export const CommentSchema = new Schema({
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    listingId: { type: Schema.ObjectId, ref: 'Listing' },
    serviceId: { type: Schema.ObjectId, ref: 'Service' },
    body: { type: String, minLength: 1, maxLength: 500, required: true },
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

CommentSchema.virtual('listing', {
    localField: 'listingId',
    ref: 'Listing',
    foreignField: '_id',
    justOne: true
})

CommentSchema.virtual('service', {
    localField: 'serviceId',
    ref: 'Service',
    foreignField: '_id',
    justOne: true
})