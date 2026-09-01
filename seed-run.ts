import { config } from 'dotenv';
config({ path: '.env' });

async function run() {
  console.log('Connecting to Firebase and seeding data...');
  try {
    const { seedAllDataToFirestore } = await import('./lib/seed');
    await seedAllDataToFirestore();
    console.log('Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

run();
