import { Schema } from "mongoose";

export const MessageSchema = new Schema(
    {
        body: { type: String, minLength: 5, maxLength: 500, required: true, trim: true },
        creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
        accountId: { type: Schema.ObjectId, required: true, ref: 'Account' },
        listingId: { type: Schema.ObjectId, required: true, ref: 'Listing' },
        chatId: { type: Schema.ObjectId, required: true, ref: 'Chat' },
        deleted: { type: Boolean, default: false },
        status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
        attachments: [{ type: String }],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

MessageSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true,
});
MessageSchema.virtual('account', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true,
});
MessageSchema.virtual('listing', {
    localField: 'listingId',
    ref: 'Listing',
    foreignField: '_id',
    justOne: true,
});
MessageSchema.virtual('chat', {
    localField: 'chatId',
    ref: 'Chat',
    foreignField: '_id',
    justOne: true,
});
