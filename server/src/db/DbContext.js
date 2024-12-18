import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { ListingSchema } from '../models/Listing';
import { ServiceSchema } from '../models/Services';
import { CommentSchema } from '../models/Comment';
import { ReviewSchema } from '../models/Review';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Listing = mongoose.model('Listing', ListingSchema);
  Service = mongoose.model('Service', ServiceSchema);
  Comment = mongoose.model('Comment', CommentSchema);
  Review = mongoose.model('Review', ReviewSchema)
}

export const dbContext = new DbContext()
