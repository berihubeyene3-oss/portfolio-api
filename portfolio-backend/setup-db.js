const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
    console.log('🔧 Setting up database...\n');
    
    try {
        // Connect without database selected
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        });
        
        console.log('✅ Connected to MySQL server');
        
        // Create database
        await connection.query('CREATE DATABASE IF NOT EXISTS portfolio_db');
        console.log('✅ Database "portfolio_db" created or already exists');
        
        // Use the database
        await connection.query('USE portfolio_db');
        console.log('✅ Using database: portfolio_db\n');
        
        // Create Users table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                profile_photo VARCHAR(255) DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Users table created');
        
        // Create Skills table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Skills (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT NOT NULL,
                skill_name VARCHAR(100) NOT NULL,
                level INT CHECK (level >= 0 AND level <= 100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
            )
        `);
        console.log('✅ Skills table created');
        
        // Create Projects table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Projects (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT NOT NULL,
                title VARCHAR(200) NOT NULL,
                description TEXT,
                technologies VARCHAR(500),
                github_link VARCHAR(255),
                demo_link VARCHAR(255),
                image VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
            )
        `);
        console.log('✅ Projects table created');
        
        // Create Blogs table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Blogs (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT NOT NULL,
                title VARCHAR(200) NOT NULL,
                content TEXT NOT NULL,
                tags VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
            )
        `);
        console.log('✅ Blogs table created');
        
        // Create Messages table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Messages (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Messages table created');
        
        // Show all tables
        const [tables] = await connection.query('SHOW TABLES');
        console.log('\n📋 Tables in database:');
        tables.forEach(table => {
            console.log(`   - ${Object.values(table)[0]}`);
        });
        
        await connection.end();
        console.log('\n✨ Database setup complete!');
        
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.error('\n💡 MySQL is not running. Please:');
            console.error('   1. Open XAMPP Control Panel');
            console.error('   2. Click "Start" next to MySQL');
            console.error('   3. Wait for green light');
            console.error('   4. Run this script again');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('\n💡 Wrong username or password. Check .env file');
        }
    }
}

setupDatabase();