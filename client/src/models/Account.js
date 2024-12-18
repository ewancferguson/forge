export class Account {
constructor(data){
  this.id = data.id
  this.name = data.name
  this.email = data.email
  this.picture = data.picture
  this.isBusiness = data.isBusiness
  this.rating = data.rating
  this.coverImg = data.coverImg
  this.linkedIn = data.linkedIn
  this.facebook = data.facebook
  this.website = data.website
}
    // TODO add additional properties if needed

    // isBusiness: { type: Boolean, required: true, default: false },
    // coverImg: { type: String, maxLength: 2000 },
    // linkedIn: { type: String, maxLength: 2000 },
    // facebook: { type: String, maxLength: 2000 },
    // website: { type: String, maxLength: 2000 },
    // reviewId: { type: Schema.ObjectId, ref: 'Rating' }
  
}
