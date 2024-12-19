export class Listing{
  constructor(data){
    this.id = data.id
    this.creatorId = data.creatorId
    this.type = data.type
    this.location = data.location
    this.body = data.body
    this.pictures = data.pictures
    this.isResolved = data.isResolved
    this.minBudget = data.minBudget
    this.maxBudget = data.maxBudget
    this.creator = data.creator
    this.createdAt = new Date (data.createdAt)
    this.likeCount = data.likeCount

  }
}