export class Profile{
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
}