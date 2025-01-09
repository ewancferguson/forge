import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { ListingSchema } from '../models/Listing';
import { ServiceSchema } from '../models/Services';
import { CommentSchema } from '../models/Comment';
import { ReviewSchema } from '../models/Review';
import { MessageSchema } from '../models/Message';
import { LikesSchema } from '../models/Likes';
import { FollowersSchema } from '../models/Followers';
import { ChatSchema } from '../models/Chat';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Listing = mongoose.model('Listing', ListingSchema);
  Service = mongoose.model('Service', ServiceSchema);
  Comment = mongoose.model('Comment', CommentSchema);
  Review = mongoose.model('Review', ReviewSchema);
  Message = mongoose.model('Message', MessageSchema);
  Chat = mongoose.model('Chat', ChatSchema)
  Like = mongoose.model('Like', LikesSchema);
  Follower = mongoose.model('Follower', FollowersSchema);
}

export const dbContext = new DbContext()
