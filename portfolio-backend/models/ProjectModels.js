class Project {
    constructor(id, user_id, title, description, technologies, github_link, demo_link, image, created_at) {
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.description = description;
        this.technologies = technologies;
        this.github_link = github_link || null;
        this.demo_link = demo_link || null;
        this.image = image || null;
        this.created_at = created_at || new Date();
    }

    static fromDatabase(row) {
        return new Project(
            row.id, row.user_id, row.title, row.description,
            row.technologies, row.github_link, row.demo_link,
            row.image, row.created_at
        );
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            technologies: this.technologies,
            github_link: this.github_link,
            demo_link: this.demo_link,
            image: this.image,
            created_at: this.created_at
        };
    }
}

module.exports = Project;