const { db } = require('./db');

async function main() {
  const profiles = await db.all('SELECT id, name, intro_video_key, intro_video_status FROM profiles;');
  console.log(profiles);
}

main().catch(console.error);
