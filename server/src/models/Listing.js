import { Schema } from "mongoose";


export const ListingSchema = new Schema({
    creatorId: {Type: Schema.ObjectId, required: true, ref: 'Account'},
    type: {type: String, Enumerator: ['construction', 'manufacturing', 'maintenance', 'utilities', 'agriculture', 'skilled trades', 'other'], required: true},
    body: {type: String, required: true, minLength: 15, maxLength: 1000},
    pictures: {type: [String], maxLength: 2000},
    location: {type: Object},
    isResolved: {type: Boolean, required: true, default: false},
    minBudget: {type: Number, min: 0, max: 100000, required: true},
    maxBudget: {type: Number, min: 0, max: 100000, required: true}
},{
    timestamps: true,
    toJSON: {virtuals: true}
}
)

ListingSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})