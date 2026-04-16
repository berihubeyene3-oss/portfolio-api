class Message {
    constructor(id, name, email, message, created_at) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.message = message;
        this.created_at = created_at || new Date();
    }

    static fromDatabase(row) {
        return new Message(
            row.id, row.name, row.email,
            row.message, row.created_at
        );
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            message: this.message,
            created_at: this.created_at
        };
    }
}

module.exports = Message;