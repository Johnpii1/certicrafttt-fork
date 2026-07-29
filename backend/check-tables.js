const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: '1234',
  port: 5432,
  database: 'certificate_system'
});

async function checkDatabase() {
  try {
    await client.connect();
    console.log("✅ Successfully connected to database 'certificate_system'");
    
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    if (res.rows.length === 0) {
      console.log("⚠️ No tables found. The backend hasn't synced the models yet. Make sure to run START.bat and check the backend terminal for errors.");
    } else {
      console.log("✅ Database has the following tables created by Sequelize:");
      res.rows.forEach(row => console.log(`  - ${row.table_name}`));
      console.log("\nEverything is set up correctly!");
    }
  } catch (err) {
    console.error('❌ Error checking database:', err.message);
  } finally {
    await client.end();
  }
}

checkDatabase();
