export class Chat {
    constructor(data = {}) {
        this.id = data.id || '';
        this.participants = data.participants || [];
        this.participantInfo = data.participant;
        this.creatorId = data.creatorId || '';
        this.messageHistory = data.messageHistory || [];
        this.creator = data.creator || null;
        this.createdAt = data.createdAt || null;
        this.updatedAt = data.updatedAt || null;
    }
}
