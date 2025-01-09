export class Follower{
    constructor(data){
        this.id = data.id
        this.followerId = data.followerId
        this.followingId = data.followingId
        this.followerName = data.follower.name
        this.followerPicture = data.follower.picture
    }
}