export class Comment {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.listingId = data.listingId
    this.body = data.body
    this.creator = data.creator
    this.listing = data.listing
  }
}