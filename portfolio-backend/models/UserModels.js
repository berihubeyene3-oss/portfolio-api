class User {
    constructor(id, name, email, password, profile_photo, bio, education, cv_url, created_at) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.profile_photo = profile_photo || null;
        this.bio = bio || null;
        this.education = education || null;
        this.cv_url = cv_url || null;
        this.created_at = created_at || new Date();
    }

    // Validation methods
    isValidEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    isValidPassword() {
        return this.password && this.password.length >= 6;
    }

    // Convert database row to User object
    static fromDatabase(row) {
        return new User(
            row.id, row.name, row.email, row.password,
            row.profile_photo, row.bio, row.education,
            row.cv_url, row.created_at
        );
    }

    // Convert to JSON (hide password)
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            profile_photo: this.profile_photo,
            bio: this.bio,
            education: this.education,
            cv_url: this.cv_url,
            created_at: this.created_at
        };
    }
}

module.exports = User;