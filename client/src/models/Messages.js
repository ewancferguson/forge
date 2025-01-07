export class Message {
    constructor(data) {
        this.id = crypto.randomUUID()
        this.name = data.name
        this.picture = data.picture
        this.content = data.content
        this.timeStamp = data.timeStamp || new Date()
        this.userId = data.userId
        this.self = data.self || false
    }
}