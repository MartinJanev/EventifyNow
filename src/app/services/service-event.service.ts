import { Injectable } from '@angular/core';
import { Firestore,collectionData,collection } from '@angular/fire/firestore';
import { Eventdata } from '../../interface/event-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceEventService {

  constructor(private firestore: Firestore) { }

  isAdmin(): boolean { // Check if the user is an admin for deleting events in Details section - ne raboti
    const userEmail = 'admin';
    const userPassword = 'admin';
    return userEmail === 'admin' && userPassword === 'admin';

  }

  getEvents() :Observable<Eventdata[]>{ // Get all events from Firestore - ne uspeva da se prikazat
    const eventCollection = collection(this.firestore, 'events');
    return collectionData(eventCollection,{idField:'id'});
  }

  //Podolu e celata niza od nastani od koja se scrapaat podatocite
  protected eventDataList: Eventdata[] = [
    // Add the following data to the eventDataList array - fix the data for each event
    {
      id: 0,
      name:'Che Trcame',
      city: 'Prilep',
      country: 'Macedonia',
      photo: '/assets/che-trcame.jpg',
      startDate: new Date('2024-09-01'),
      startTime: '08:00',
      description: 'Let`s Run 2024! Every step is a victory! Sign up today for Che Trchame 2024. Promotional prices until July 20. This year, on September 1, Prilep will be the center of sports events in Macedonia! Be a part of Che Trchame - Prilep, register by July 20th at a promotional price!',
      organizer: 'Che Trchame',
      price: 700
    },
    {
      id: 1,
      name: ' Chupino Trail',
      city: 'Blatec, Vinica',
      country: 'Macedonia',
      photo: '/assets/chupino-trail.jpg',
      startDate: new Date('2024-09-01'),
      startTime: '08:00',
      description:'Chupino trail is an international trail running event that takes place in Plachkovica mountain, with its start and finish line in Vinica. This year, it`s happening on September 1st. The event is organized by a team of enthusiasts "The Running Squad" and the Municipality of Vinica. The race course passes through the beautiful nature of Plachkovica mountain.',
      organizer: 'The Running Squad',
      price: 1200
    },
    {
      id: 2,
      name: 'Ed Sheeran in Belgrade',
      city: 'Belgrade',
      country: 'Serbia',
      photo: '/assets/ed-sheeran-belgrade.jpg',
      startDate: new Date('2024-08-17'),
      startTime: '20:00',
      description:'Exciting news! Ed Sheeran is back with fresh tour dates for the Mathematics Tour in 2024! Kicking off the year with a spectacular Asian leg, Ed will then light up the European stages all summer long. Get ready to experience the magic of Ed and his guitars live in action - don`t miss out on this incredible musical journey. He is also coming to Belgrade on August 17th, 2024. Check out the tour dates below and secure your tickets today!',
      organizer: 'Ed Sheeran',
      price: 5000,
    },
    {
      id: 3,
      name: 'Ed Sheeran in Sofia',
      city: 'Sofia',
      country: 'Bulgaria',
      photo: '/assets/ed-sheeran-sofia.jpg',
      startDate: new Date('2024-08-31'),
      startTime: '20:00',
      description:'Exciting news! Ed Sheeran is back with fresh tour dates for the Mathematics Tour in 2024! Kicking off the year with a spectacular Asian leg, Ed will then light up the European stages all summer long. Get ready to experience the magic of Ed and his guitars live in action - don`t miss out on this incredible musical journey. He is also coming to Sofia on August 31st, 2024. Check out the tour dates below and secure your tickets today!',
      organizer: 'Ed Sheeran',
      price: 6000,
    },
    {
      id: 4,
      name: 'Ed Sheeran in Zagreb',
      city: 'Zagreb',
      country: 'Croatia',
      photo: '/assets/ed-sheeran-zagreb.jpg',
      startDate: new Date('2024-08-04'),
      startTime: '20:00',
      description:'Exciting news! Ed Sheeran is back with fresh tour dates for the Mathematics Tour in 2024! Kicking off the year with a spectacular Asian leg, Ed will then light up the European stages all summer long. Get ready to experience the magic of Ed and his guitars live in action - don`t miss out on this incredible musical journey. He is also coming to Zagreb on August 04th, 2024. Check out the tour dates below and secure your tickets today!',
      organizer: 'Ed Sheeran',
      price: 9000,
    },
    {
      id: 5,
      name: 'Heat Macedonia',
      city: 'Prespa',
      country: 'Macedonia',
      photo: '/assets/heat-macedonia.png',
      startDate: new Date('2024-07-27'),
      startTime: '20:00',
      description:'Are you ready for a hot summer in Prespa? 🔥Come and have an unforgettable experience at Coca Resort / Slivnica Beach on July 27th and enjoy the rhythm of electronic music on the sandy shore of Prespa Lake. Lineup: Ammo Avenue,Andrew Meller,Joss and N. Joshevski',
      organizer: 'Heat Macedonia',
      price: 355,
    },
    {
      id: 6,
      name: 'Shtipska Pastramajlijada',
      city: 'Shtip',
      country: 'Macedonia',
      photo: '/assets/stipska-pastramajlijada.jpg',
      startDate: new Date('2024-09-22'),
      startTime: '18:00',
      description:'The city under the Isar is preparing for the Shtip pastramajlija event, which will be held on September 21st and 22nd.\n At the event, the purpose of which is the promotion of the culinary brand of the city - the pastramajlija of Stip, famous Macedonian and foreign performers will perform this year, and the main musical stars will be Danijela Martinović and Sasha Kovacević.',
      organizer: 'Municipality of Shtip',
      price: 0,
    },
    {
      id: 7,
      name: 'Ohrid Calling',
      city: 'Ohrid',
      country: 'Macedonia',
      photo: '/assets/ohrid-calling.jpg',
      startDate: new Date('2024-07-31'),
      startTime: '20:00',
      description:'THIS YEAR`S FESTIVAL IS HISTORIC:LAST FESTIVAL EDITION IN KASARNA! Dear Ohrid Calling army, Despite having the most attractive headliner lineup to ever play at Kasarna, there is one more thing that makes this year`s festival edition historic for us, for you, and for all the artists playing the festival: We have been informed by the City of Ohrid that Kasarna will undergo investments and innovations due to which we probably won`t be able to have Ohrid Calling take place at Kasarna in 2025. Thanks to you, the loyal fans of the festival, as well as the help of the City of Ohrid, in the past 5 years, we have managed to turn Kasarna into a place of good music, a real festival experience, and a place where all of us have made memories we will never forget. With our hearts full, we are ending one festival chapter, and starting September, we are starting to prepare for the 10 year jubilee of Ohrid Calling! Let`s make this last year at Kasarna a festival edition we will never forget!',
      organizer: 'Municipality of Ohrid',
      price: 4500,
    },
    {
      id: 8,
      name: 'Skopje Jazz Festival',
      city: 'Skopje',
      country: 'Macedonia',
      photo: '/assets/skopje-jazz-festival.jpg',
      startDate: new Date('2024-10-19'),
      startTime: '19:00',
      description:'The Skopje Jazz Festival is one of the leading cultural manifestations in Macedonia, with a tradition of 42 consecutive years and an outstanding reputation in Europe and the world. It is counted among the leading jazz festivals in Europe. The festival started in 1982, and its history includes the performances of the most famous names of American and European jazz, Latin American and African music, as well as the best Macedonian musicians. The Skopje Jazz Festival is a member of the prestigious association "Europe Jazz Network".',
      organizer: 'Institution for artistic activities',
      price: 400,
    },
    {
      id: 9,
      name: 'Mandra Festival',
      city: 'Dojran',
      country: 'Macedonia',
      photo: '/assets/mandra-festival.jpg',
      startDate: new Date('2024-08-01'),
      startTime: '20:00',
      description:'Mandra Festival is an open-air music festival, which will offer the audience the best of the Balkans. The festival will be held in Star Dojran. Tickets in sales through the network of kupikarta.com, Jugoton, Rose Vero 2, Sandwich shop Gino Dojran and Tourist Info Center Dojran.',
      organizer: 'Municipality of Dojran',
      price: 500,
    },
    {
      id: 10,
      name: 'Vevcani Carnival',
      city: 'Vevcani',
      country: 'Macedonia',
      photo: '/assets/vevcani-karneval.jpg',
      startDate: new Date('2025-01-12'),
      startTime:'07:00',
      description:'Vevcani Carnival — one of the most famous events in Vevcani. Written sources testify that the carnival is at least 1,460 years old, but there are archaeological findings that point to data that the carnival has existed for at least 2,200 years. Today, the carnival is an interesting and unusual interweaving of pagan and Christian customs. Traditionally, the participants try to avoid the introduction of modern carnival elements, but in recent years, organized by the Municipality and the Ministry of Culture, order has been introduced in this otherwise chaotic timeless event.',
      organizer: 'People of Vevcani',
      price: 0,
    },
    {
      id: 11,
      name: 'Trail Race Kopaonik',
      city: 'Kopaonik',
      country: 'Kosovo',
      photo: '/assets/trail-kopaonik.png',
      startDate: new Date('2024-07-26'),
      startTime:'10:00',
      description: 'We invite you to be a part of the biggest trail adventure on the grounds of the Kopaonik National Park this year, during which, in addition to the race itself, there will be a large number of additional activities that we will talk about in detail in the coming days.',
      organizer: 'Trail Race Kopaonik',
      price: 2500,
    },
    {
      id: 12,
      name: 'Trcaj Be',
      city: 'Bitola',
      country: 'Macedonia',
      photo: '/assets/trcaj-be.jpg',
      startDate: new Date('2024-09-22'),
      startTime:'08:00',
      description:'"Trcaj Be" is not an athletic club, but an initiative that celebrates everyone who crosses the finish line, regardless of their ranking. Their goal is to create satisfied runners and help them run their first and fastest kilometers. The runners of Bitola with "Trcaj Be" are creating a new sports story for the city, starting with the first city race on 15.09.2019 with 770 competitors. In the following years, they organized two more editions, adding a 21 km race and the Balkan Half Marathon Championship. "Trcaj Be" has the power to change the lives of Bitola residents, encouraging physical and spiritual transformation through running.',
      organizer: 'Municipality of Bitola',
      price: 1000,
    },
    {
      id: 13,
      name: 'Kicevo Run',
      city: 'Kicevo',
      country: 'Macedonia',
      photo: '/assets/k-run.jpg',
      startDate: new Date('2024-10-27'),
      startTime:'08:00',
      description:'Join us for the Kichevo Town Square Run on October 27, 2024! The event features a 10K race starting at 9:00 AM and a 5K race kicking off at 9:05 AM. Register by October 22, 2024, to secure your spot in this exciting event. Participants will enjoy a variety of perks, including start numbers with chips for accurate timing, professional Pic2Go photos, refreshment stations along the route, online results and diplomas, finisher medals, Drifit t-shirts, and gifts from our sponsors. Don`t miss out on this fantastic opportunity to compete and enjoy a festive day in the heart of Kichevo!',
      organizer: 'Municipality of Kichevo',
      price: 800,
    },
    {
      id: 14,
      name: 'Wizz Air Skopje Marathon',
      city: 'Skopje',
      country: 'Macedonia',
      photo: '/assets/skopje-marathon.jpg',
      startDate: new Date('2024-10-06'),
      startTime:'08:00',
      description:'The Skopje Marathon is a highly anticipated running event that has gained global recognition since its revival in 2007.\n\nThis prestigious event, which is now a proud member of AIMS, offers three challenging races - the marathon, half marathon, and a 5K humanitarian race. Every year, the event attracts a growing number of participants from all over the world.\n\n Notable past participants have included world record holder Wilson Kipsang from Kenya in 2014, the Estonian triplets Luik in 2017, and UK`s Paula Radcliffe, who held the women`s world record for an impressive 17 years.\nThis is an opportunity for runners to showcase their skills and compete at an international level.',
      organizer: 'Sport Union of Skopje',
      price: 1500,
    },
    {
      id: 15,
      name: 'Obstacle Course Racing',
      city: 'Skopje',
      country: 'Macedonia',
      photo: '/assets/ocr-skopje.png',
      startDate: new Date('2024-10-27'),
      startTime:'11:00',
      description:'This race in Skopje for the fourth time in the country will unite runners for an unforgettable adventure. That is why we are honored to offer you real adrenaline, a test of your fitness and enjoyment of nature. Being on the starting line is sometimes a sufficient goal". It is with great pleasure that we announce OCR SKOPJE 2024! Jumping over vertical walls, climbing ropes, crawling through mud, carrying loads, spear shooting, running through shallow streams, steeps, adrenaline, fun, happiness, pain and pleasure are just some of the things you will experience at OCR SKOPJE 2024! The race will be in Skopje, the exact location is a secret! You will be notified on your email one month before the event. address! The location will be easily accessible, with the possibility of parking, toilets and places to store your equipment.',
      organizer: 'OTAKU Skopje',
      price: 2000,
    },
    {
      id: 16,
      name: 'Paradise Music Festival ',
      photo: '/assets/paradise-festival.jpg',
      startDate: new Date('2024-07-26'),
      startTime: '20:00',
      city: 'Vinica',
      country: 'Macdeonia',
      description: 'And this year, just for you, Paradise Music Festival 2 at CITY STADIUM - VINICA',
      organizer: 'Frozen Production',
      price: 400,
    },
    {
      id: 17,
      name: 'Lenny Kravitz Concert',
      photo: '/assets/lenny-kravitz.jpg',
      startDate: new Date('2024-08-04'),
      startTime: '22:00',
      city: 'Ohrid',
      country: 'Macedonia',
      description:'BREAKING NEWS: MACEDONIA IS THE WORLD AGAIN, AND OHRID IS THE MOST BEAUTIFUL PLACE IN IT! LENNY KRAVITZ RETURNS TO OHRID FOR THE ILINDEN HOLIDAYS! 4 - TH AUGUST - HEART OF HERBAL SPRINGS. When it comes to concerts, there is a legend in Macedonia that quickly turned into an urban myth. And that is: "There were concerts here, but none of them were nearly as good as Lenny\`s at the stadium in Ohrid." Well, yes - there was something inexplicable that night in the air and on stage, and especially in the audience. No one can ever, anywhere, \"arrange\" a special evening when it comes to concerts. It happens rarely and by itself. Well, for all those who were present then, for those who listened, for those who were children then and in the meantime grew up and loved him, we decided to bring Lenny Kravitz back to Ohrid, in the same place and almost at the same time, for the Ilinden holidays , on the 4th of August.',
      organizer: 'Avalon Production',
      price: 3000,
    },
    {
      id: 18,
      name: 'Krusevo 5km',
      photo: '/assets/krusevo-5km.png',
      startDate: new Date('2024-09-07'),
      startTime: '18:00',
      city: 'Krusevo',
      country: 'Macedonia',
      description: 'Race for Independence Krusevo 5km. This year, in cooperation with the Delta Athletic Club and the Athletic Federation of Macedonia, the 4th edition of the highest race on the Balkans will be held on 07.09 through the streets of Krushevo. For the first time in this edition of the race, in addition to the individual prizes, there are cash prizes for the best three teams in the men`s and women`s competition. So hurry up and register your team of three contestants‼️',
      organizer: 'NGO Center for Human Relations Krushevo',
      price: 800,
    }

  ];

  getAllEvents(): Eventdata[] { // Get all events from the eventDataList array - gi sortira po datum
    this.eventDataList = this.eventDataList.sort((a, b) => Number(a.startDate) - Number(b.startDate));
    return this.eventDataList;
  }

  getEventById(id: number): Eventdata | undefined {
    return this.eventDataList.find(event => event.id === id);
  }
}
