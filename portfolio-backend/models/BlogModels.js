class Blog {
    constructor(id, user_id, title, content, tags, created_at) {
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.content = content;
        this.tags = tags || null;
        this.created_at = created_at || new Date();
    }

    static fromDatabase(row) {
        return new Blog(
            row.id, row.user_id, row.title, row.content,
            row.tags, row.created_at
        );
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            tags: this.tags,
            created_at: this.created_at
        };
    }
}

module.exports = Blog;