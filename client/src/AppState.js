import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/Listing.js').Listing[]} user info from the database*/
  listings: [],
  /** @type {import('./models/Listing.js').Listing[]} */
  homePageListings: [],
  /** @type {import('./models/Likes.js').Likes[]} */
  likes: [],
  /** @type {import('./models/Profile.js').Profile} user info from the database*/
  activeProfile: null,
  /** @type {import('./models/Listing.js').Listing[]} user info from the database*/
  profileListings: [],
  /** @type {import('./models/Listing.js').Listing} user info from the database*/
  activeListing: null,
  /** @type {import('./models/Comment.js').Comment[]} */
  comments: [],
  /** @type {import('./models/Messages.js').Message[]} */
  Messages: [],
  /** @type {import('./models/Chat.js').Chat[]} */
  Chats: [],
  /** @type {import('./models/Follower.js').Follower[]} */
  profileFollowers: [],
  /** @type {import('./models/Review.js').Review[]} */
  profileReviews: [],

})

