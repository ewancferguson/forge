

export class Review{
  constructor(data){
this.id = data.id
this.creatorId = data.creatorId
this.body = data.body 
this.rating = data.rating
this.accountId= data.accountId
this.createdAt = data.createdAt
this.updatedAt = data.updatedAt
this.creator = data.creator 
this.account = data.account
  }
}