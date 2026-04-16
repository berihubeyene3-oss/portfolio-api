const { testConnection } = require('./config/db');
require('dotenv').config();

console.log('🔍 Testing database connection...\n');
console.log('📝 Configuration:');
console.log(`   Host: ${process.env.DB_HOST}`);
console.log(`   User: ${process.env.DB_USER}`);
console.log(`   Password: ${process.env.DB_PASSWORD ? '***' : '(empty)'}`);
console.log(`   Database: ${process.env.DB_NAME}`);
console.log(`   Port: ${process.env.DB_PORT}\n`);

// Test the connection
testConnection().then(success => {
    if (success) {
        console.log('\n✨ Database is ready to use!');
    } else {
        console.log('\n⚠️  Please fix the issues above.');
        console.log('\n📌 Next steps:');
        console.log('   1. Make sure MySQL is running');
        console.log('   2. Check your .env file credentials');
        console.log('   3. Run: node setup-db.js to create tables');
    }
    process.exit(0);
}).catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
});