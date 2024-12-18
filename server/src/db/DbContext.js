import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { ListingSchema } from '../models/Listing';
import { ServiceSchema } from '../models/Services';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Listing = mongoose.model('Listing', ListingSchema);
  Service = mongoose.model('Service', ServiceSchema);
  
}

export const dbContext = new DbContext()
