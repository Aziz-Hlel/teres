import ENV from '../config/ENV';
import seedUsers from './fakes/users.fake';
import { seedProdUsers } from './prod/users';
import { seedProducts } from './fakes/products.fake';
import eventsInit from '@/events/events.init';
import seedSpecialEvents from './fakes/events.fake';

const seed = async () => {
  if (['production', 'staging'].includes(ENV.NODE_ENV)) {
    console.log('✅ SUCCESS : Seeding of production data completed.');
    const specialEventsSeed = seedSpecialEvents();
    const eventsSeed = eventsInit();
    const prodUsersSeed = seedProdUsers();
    try {
      await Promise.all([specialEventsSeed, eventsSeed, prodUsersSeed]);
    } catch (error) {
      console.error('❌ ERROR : Seeding of production data failed.', error);
      throw error;
    }
    return;
  }
  const userSeed = seedUsers(50);
  const prodUsersSeed = seedProdUsers();
  const productsSeed = seedProducts();

  const eventsSeed = eventsInit();
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
