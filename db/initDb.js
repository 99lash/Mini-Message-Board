const fs = require('fs');
const path = require('path');
const db = require('./index');

async function initializeDatabase() {
  const sql = fs.readFileSync(path.join(__dirname, 'database.sql')).toString();

  try {
    await db.query(sql);
    console.log('✅ Tables initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize tables:', err);
  } finally {
    process.exit(0);
  }
}

initializeDatabase();