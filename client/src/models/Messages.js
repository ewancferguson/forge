export class Message {
    constructor(data = {}) {
        this.id = data.id || '';
        this.body = data.body || '';
        this.creatorId = data.creatorId || '';
        this.chatId = data.chatId || '';
        this.deleted = data.deleted || false;
        this.status = data.status || 'sent';
        this.attachments = data.attachments || [];
        this.creator = data.creator || null;
        this.chat = data.chat || null;
        this.createdAt = data.createdAt || null;
        this.updatedAt = data.updatedAt || null;

    }

    get formatTimeStamp() {
        if (!this.createdAt) {
            return 'Invalid Date';
        }

        const date = new Date(this.createdAt);


        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${month} ${day}, ${time}`;
    }


}
