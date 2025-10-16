import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, Timestamp, getDocs, deleteDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SeedDataService {
  private firestore = inject(Firestore);
  private hasSeeded = false;

  /**
   * Seed dummy events into Firestore
   * @param force - Force seed even if events exist
   */
  async seedEvents(force: boolean = false): Promise<void> {
    if (this.hasSeeded && !force) {
      console.log('Already seeded in this session');
      return;
    }

    try {
      const eventsCollection = collection(this.firestore, 'events');

      if (!force) {
        // Check if events already exist
        const snapshot = await getDocs(eventsCollection);
        if (!snapshot.empty) {
          console.log('Events already exist, skipping seed');
          this.hasSeeded = true;
          return;
        }
      }

      const dummyEvents = [
        {
          name: 'Angular Conference 2024',
          photo: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
          startDate: Timestamp.fromDate(new Date('2024-11-15')),
          startTime: '09:00',
          city: 'Skopje',
          country: 'Macedonia',
          description: 'Join us for the biggest Angular conference in the Balkans! Learn about the latest features, best practices, and network with fellow developers.',
          organizer: 'Angular Macedonia',
          price: 2500,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        },
        {
          name: 'Tech Meetup - AI & Machine Learning',
          photo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
          startDate: Timestamp.fromDate(new Date('2024-11-20')),
          startTime: '18:30',
          city: 'Ohrid',
          country: 'Macedonia',
          description: 'Explore the world of AI and Machine Learning with industry experts. Hands-on workshops and networking opportunities included.',
          organizer: 'Tech Community MK',
          price: 0,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        },
        {
          name: 'Startup Weekend Balkans',
          photo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
          startDate: Timestamp.fromDate(new Date('2024-12-01')),
          startTime: '10:00',
          city: 'Tirana',
          country: 'Albania',
          description: '54 hours to pitch your idea, build a team, and launch your startup! Mentorship from successful entrepreneurs and investors.',
          organizer: 'Startup Albania',
          price: 1500,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        },
        {
          name: 'Web Development Bootcamp',
          photo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
          startDate: Timestamp.fromDate(new Date('2024-11-25')),
          startTime: '14:00',
          city: 'Belgrade',
          country: 'Serbia',
          description: 'Intensive 3-day bootcamp covering HTML, CSS, JavaScript, and modern frameworks. Perfect for beginners and intermediate developers.',
          organizer: 'Code Academy Serbia',
          price: 5000,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        },
        {
          name: 'Music Festival - Summer Vibes',
          photo: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
          startDate: Timestamp.fromDate(new Date('2024-12-15')),
          startTime: '16:00',
          city: 'Pristina',
          country: 'Kosovo',
          description: 'Three days of non-stop music featuring local and international artists. Food trucks, art installations, and camping available.',
          organizer: 'Summer Sounds Productions',
          price: 3500,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        },
        {
          name: 'Blockchain & Cryptocurrency Summit',
          photo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
          startDate: Timestamp.fromDate(new Date('2024-11-30')),
          startTime: '11:00',
          city: 'Sofia',
          country: 'Bulgaria',
          description: 'Deep dive into blockchain technology, DeFi, NFTs, and the future of digital assets. Expert speakers from leading crypto companies.',
          organizer: 'Crypto Bulgaria',
          price: 0,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        },
        {
          name: 'Photography Workshop - Portrait Mastery',
          photo: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800',
          startDate: Timestamp.fromDate(new Date('2024-12-05')),
          startTime: '10:30',
          city: 'Athens',
          country: 'Greece',
          description: 'Learn professional portrait photography techniques from award-winning photographers. Includes hands-on sessions with models.',
          organizer: 'PhotoArt Greece',
          price: 4500,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        },
        {
          name: 'Gaming Tournament - Esports Championship',
          photo: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
          startDate: Timestamp.fromDate(new Date('2024-11-22')),
          startTime: '12:00',
          city: 'Zagreb',
          country: 'Croatia',
          description: 'Compete in the biggest esports tournament in the region! Multiple games, cash prizes, and streaming opportunities.',
          organizer: 'Balkan Esports League',
          price: 1000,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        },
        {
          name: 'Food & Wine Festival',
          photo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
          startDate: Timestamp.fromDate(new Date('2024-12-10')),
          startTime: '17:00',
          city: 'Skopje',
          country: 'Macedonia',
          description: 'Taste the finest wines and culinary creations from local and international chefs. Live music and cooking demonstrations included.',
          organizer: 'Gourmet Events MK',
          price: 2000,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        },
        {
          name: 'Yoga & Wellness Retreat',
          photo: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800',
          startDate: Timestamp.fromDate(new Date('2024-11-28')),
          startTime: '08:00',
          city: 'Ohrid',
          country: 'Macedonia',
          description: 'A weekend of mindfulness, yoga, meditation, and healthy living by the beautiful Ohrid Lake. All levels welcome.',
          organizer: 'Zen Wellness Center',
          price: 0,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        },
      ];

      console.log('🌱 Starting to seed events...');

      for (const event of dummyEvents) {
        try {
          await addDoc(eventsCollection, event);
          console.log(`✅ Added: ${event.name}`);
        } catch (error) {
          console.error(`❌ Failed to add ${event.name}:`, error);
        }
      }

      console.log('✅ Seed data completed!');
      this.hasSeeded = true;
    } catch (error) {
      console.error('❌ Error during seeding:', error);
      throw error;
    }
  }

  /**
   * Delete all events from Firestore
   * Use with caution - this will delete ALL events including user-created ones
   */
  async deleteAllEvents(): Promise<void> {
    try {
      const eventsCollection = collection(this.firestore, 'events');
      const snapshot = await getDocs(eventsCollection);

      if (snapshot.empty) {
        console.log('No events to delete');
        return;
      }

      console.log(`🗑️ Starting to delete ${snapshot.size} events...`);

      let deletedCount = 0;
      for (const docSnapshot of snapshot.docs) {
        try {
          await deleteDoc(doc(this.firestore, 'events', docSnapshot.id));
          deletedCount++;
          console.log(`✅ Deleted event: ${docSnapshot.data()['name']}`);
        } catch (error) {
          console.error(`❌ Failed to delete event ${docSnapshot.id}:`, error);
        }
      }

      console.log(`✅ Deleted ${deletedCount} events!`);
      this.hasSeeded = false;
    } catch (error) {
      console.error('❌ Error during deletion:', error);
      throw error;
    }
  }
}
