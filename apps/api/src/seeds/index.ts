import ENV from '../config/ENV';
import seedUsers from './fakes/users.fake';
import { seedProdUsers } from './prod/users';
import { seedProducts } from './fakes/products.fake';
import eventsInit from '@/events/events.init';
import seedSpecialEvents from './fakes/events.fake';

const seed = async () => {
  if (['production', 'staging'].includes(ENV.NODE_ENV)) {
    console.log('ℹ️ NOTE : Skipped seeding in production environment.');
    return;
  }
  const userSeed = seedUsers(50);
  const prodUsersSeed = seedProdUsers();
  const eventsSeed = eventsInit();

  const productsSeed = seedProducts();
  const specialEventsSeed = seedSpecialEvents();

  try {
    await Promise.all([userSeed, prodUsersSeed, productsSeed, eventsSeed, specialEventsSeed]);
  } catch (error) {
    console.error('❌ ERROR : Seeding failed.', error);
    throw error;
  }
  console.log('✅ SUCCESS : Seeding completed.');
};

export default seed;
