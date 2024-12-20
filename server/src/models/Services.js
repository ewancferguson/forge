import { Schema } from "mongoose";
import { pointSchema } from "./Location";


export const ServiceSchema = new Schema({
    creatorId: {type: Schema.ObjectId, required: true, ref: 'Account'},
    type: {type: String, Enumerator: ['construction', 'manufacturing', 'maintenance', 'utilities', 'agriculture', 'skilled trades', 'other'], required: true},
    location: {type: pointSchema},
    body: {type: String, minLength: 15, maxLength: 1000, required: true},
    pictures: [{type: String, maxLength: 2000}]
},{
    timestamps: true,
    toJSON: {virtuals: true}
})

ServiceSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

