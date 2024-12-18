import { Schema } from "mongoose";


export const MessageSchema = new Schema({
    body: {type: String, minLength: 5, maxLength: 500, required: true},
    creatorId: {type: Schema.ObjectId, required: true, ref: 'Account'},
    time: {type: Date, required: true},
    listingId: {type: Schema.ObjectId, required: true, ref: 'Listing'},
    accountId: {type: Schema.ObjectId, required: true, ref: 'Account'}

},{
    timestamps: true,
    toJSON: {virtuals: true}
})

MessageSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})
MessageSchema.virtual('account', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})
MessageSchema.virtual('listing', {
    localField: 'listingId',
    ref: 'Listing',
    foreignField: '_id',
    justOne: true
})