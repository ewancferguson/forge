import { Schema } from "mongoose";

export const MessageSchema = new Schema(
    {
        body: { type: String, minLength: 1, maxLength: 500, required: true, trim: true },
        creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
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
MessageSchema.virtual('chat', {
    localField: 'chatId',
    ref: 'Chat',
    foreignField: '_id',
    justOne: true,
});
