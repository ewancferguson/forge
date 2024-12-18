import { Schema } from "mongoose";


export const ReviewSchema = new Schema({
    creatorId: {type: Schema.ObjectId, required: true, ref: 'Account'},
    body: {type: String, required: true, minLength: 1, maxLength: 500},
    rating: {type: Number, min: 1, max: 5, required: true},
    accountId: {type: Schema.ObjectId, required: true, ref: 'Account'}


},{
    timestamps: true,
    toJSON: {virtuals: true}
})

ReviewSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})
ReviewSchema.virtual('account', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})