/**
 * Centralized data for all categories and their places
 */

export interface PlaceService {
  name: string;
  price: string;
  duration?: string;
  description?: string;
}

export interface DayHours {
  day: string;
  hours: string;
}

export interface Review {
  id: string;
  userName: string;
  title: string;
  comment: string;
  timeAgo: string;
  isPositive: boolean; // true for thumbs up, false for thumbs down
}

export interface Place {
  id: string;
  name: string;
  address: string;
  distance: string;
  timeToReach: string;
  rating: number;
  reviews: number;
  image?: string;
  logo?: string;
  isOpen: boolean;
  phone?: string;
  priceLevel?: '$' | '$$' | '$$$';
  likes?: number;
  dislikes?: number;
  description?: string;
  openingHours?: string;
  openingHoursTable?: DayHours[];
  services?: PlaceService[];
  userReviews?: Review[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Service {
  places: Place[];
}

export interface Category {
  [serviceName: string]: Service;
}

export interface PlacesData {
  fuel: Category;
  repair: Category;
  tire: Category;
}

export const placesData: PlacesData = {
  fuel: {
    petrol: {
      places: [
        {
          id: 'p1',
          name: 'Shell Gas Station',
          address: '123 Main Street, Downtown',
          distance: '0.8 km',
          timeToReach: '3 min',
          rating: 4.5,
          reviews: 234,
          isOpen: true,
          phone: '+1 555-0101',
          priceLevel: '$$',
          likes: 189,
          dislikes: 12,
          description: 'Premium fuel station with quick service and clean facilities. Open 24/7 for your convenience.',
          openingHours: 'Open 24 hours',
          coordinates: {
            latitude: 40.7128,
            longitude: -74.0060,
          },
          services: [
            { name: 'Regular Petrol', price: '$3.45/gallon', duration: '5 min' },
            { name: 'Premium Petrol', price: '$3.95/gallon', duration: '5 min' },
            { name: 'Diesel', price: '$3.75/gallon', duration: '5 min' },
            { name: 'Car Wash', price: '$15.00', duration: '15 min' },
            { name: 'Air Pump', price: 'Free', duration: '5 min' },
            { name: 'Vacuum Service', price: '$2.00', duration: '10 min' },
          ],
          openingHoursTable: [
            { day: 'Monday', hours: 'Open 24 Hours' },
            { day: 'Tuesday', hours: 'Open 24 Hours' },
            { day: 'Wednesday', hours: 'Open 24 Hours' },
            { day: 'Thursday', hours: 'Open 24 Hours' },
            { day: 'Friday', hours: 'Open 24 Hours' },
            { day: 'Saturday', hours: 'Open 24 Hours' },
            { day: 'Sunday', hours: 'Open 24 Hours' },
          ],
          userReviews: [
            {
              id: 'r1',
              userName: 'John D.',
              title: 'Great service and clean facility',
              comment: 'Always stop here for gas. Staff is friendly and the pumps work great. Car wash does a good job too!',
              timeAgo: '2 days ago',
              isPositive: true,
            },
            {
              id: 'r2',
              userName: 'Sarah M.',
              title: 'Quick and convenient',
              comment: 'Perfect location and quick service. Never have to wait long.',
              timeAgo: '1 week ago',
              isPositive: true,
            },
            {
              id: 'r3',
              userName: 'Mike R.',
              title: 'Prices are a bit high',
              comment: 'Service is good but fuel prices are higher compared to other stations nearby.',
              timeAgo: '2 weeks ago',
              isPositive: false,
            },
          ],
        },
        {
          id: 'p2',
          name: 'BP Fuel Center',
          address: '456 Oak Avenue, North Side',
          distance: '1.2 km',
          timeToReach: '5 min',
          rating: 4.3,
          reviews: 189,
          isOpen: true,
          phone: '+1 555-0102',
          priceLevel: '$',
          likes: 156,
          dislikes: 8,
          description: 'Affordable fuel prices with loyalty rewards program. Friendly staff and quick service.',
          openingHours: '6:00 AM - 11:00 PM',
          coordinates: {
            latitude: 40.7200,
            longitude: -74.0100,
          },
          services: [
            { name: 'Regular Petrol', price: '$3.25/gallon', duration: '5 min' },
            { name: 'Premium Petrol', price: '$3.75/gallon', duration: '5 min' },
            { name: 'Diesel', price: '$3.55/gallon', duration: '5 min' },
            { name: 'Convenience Store', price: 'Varies' },
            { name: 'ATM Service', price: 'Free' },
          ],
          openingHoursTable: [
            { day: 'Monday', hours: '6:00 AM - 11:00 PM' },
            { day: 'Tuesday', hours: '6:00 AM - 11:00 PM' },
            { day: 'Wednesday', hours: '6:00 AM - 11:00 PM' },
            { day: 'Thursday', hours: '6:00 AM - 11:00 PM' },
            { day: 'Friday', hours: '6:00 AM - 11:00 PM' },
            { day: 'Saturday', hours: '6:00 AM - 11:00 PM' },
            { day: 'Sunday', hours: '7:00 AM - 10:00 PM' },
          ],
          userReviews: [
            {
              id: 'r1',
              userName: 'Alex P.',
              title: 'Best prices in the area',
              comment: 'Cheapest gas prices and great loyalty program. The convenience store has everything I need.',
              timeAgo: '3 days ago',
              isPositive: true,
            },
            {
              id: 'r2',
              userName: 'Lisa K.',
              title: 'Always my first choice',
              comment: 'Friendly staff and well-maintained pumps. Love the rewards program!',
              timeAgo: '5 days ago',
              isPositive: true,
            },
          ],
        },
        {
          id: 'p3',
          name: 'Chevron Station',
          address: '789 Park Road, East District',
          distance: '2.1 km',
          timeToReach: '8 min',
          rating: 4.7,
          reviews: 312,
          isOpen: false,
          phone: '+1 555-0103',
          priceLevel: '$$',
          likes: 267,
          dislikes: 12,
          description: 'Premium fuel station with excellent service. Currently closed for maintenance.',
          openingHours: '7:00 AM - 10:00 PM',
          coordinates: {
            latitude: 40.7320,
            longitude: -73.9850,
          },
          services: [
            { name: 'Regular Petrol', price: '$3.45/gallon', duration: '5 min' },
            { name: 'Premium Petrol', price: '$4.05/gallon', duration: '5 min' },
            { name: 'Diesel', price: '$3.85/gallon', duration: '5 min' },
            { name: 'Techron Fuel System Cleaner', price: '$8.99', duration: '5 min' },
            { name: 'Car Wash Premium', price: '$25.00', duration: '20 min' },
            { name: 'Oil Check', price: 'Free', duration: '10 min' },
          ],
          openingHoursTable: [
            { day: 'Monday', hours: '7:00 AM - 10:00 PM' },
            { day: 'Tuesday', hours: '7:00 AM - 10:00 PM' },
            { day: 'Wednesday', hours: '7:00 AM - 10:00 PM' },
            { day: 'Thursday', hours: '7:00 AM - 10:00 PM' },
            { day: 'Friday', hours: '7:00 AM - 10:00 PM' },
            { day: 'Saturday', hours: '8:00 AM - 9:00 PM' },
            { day: 'Sunday', hours: 'Closed' },
          ],
          userReviews: [
            {
              id: 'r1',
              userName: 'Tom H.',
              title: 'Currently closed for maintenance',
              comment: 'Used to be my favorite station but it has been closed for weeks now. Hope they reopen soon.',
              timeAgo: '1 day ago',
              isPositive: false,
            },
            {
              id: 'r2',
              userName: 'Rachel S.',
              title: 'Premium quality when open',
              comment: 'Great premium fuel and excellent service. Worth the wait for reopening.',
              timeAgo: '3 weeks ago',
              isPositive: true,
            },
          ],
        },
        {
          id: 'p4',
          name: 'ExxonMobil',
          address: '321 River Street, West End',
          distance: '3.5 km',
          timeToReach: '12 min',
          rating: 4.2,
          reviews: 156,
          isOpen: true,
          phone: '+1 555-0104',
          priceLevel: '$$$',
          likes: 134,
          dislikes: 18,
          description: 'Full-service gas station with convenience store and snacks. Premium location.',
          openingHours: '24 Hours',
          coordinates: {
            latitude: 40.7050,
            longitude: -74.0200,
          },
          services: [
            { name: 'Regular Petrol', price: '$3.55/gallon', duration: '5 min' },
            { name: 'Premium Petrol', price: '$4.15/gallon', duration: '5 min' },
            { name: 'Diesel', price: '$3.95/gallon', duration: '5 min' },
            { name: 'Full Service Fill', price: '+$2.00', duration: '10 min' },
            { name: 'Windshield Cleaning', price: 'Free', duration: '5 min' },
            { name: 'Convenience Store', price: 'Varies' },
            { name: 'Coffee Bar', price: '$2-5', duration: '2 min' },
          ],
          openingHoursTable: [
            { day: 'Monday', hours: 'Open 24 Hours' },
            { day: 'Tuesday', hours: 'Open 24 Hours' },
            { day: 'Wednesday', hours: 'Open 24 Hours' },
            { day: 'Thursday', hours: 'Open 24 Hours' },
            { day: 'Friday', hours: 'Open 24 Hours' },
            { day: 'Saturday', hours: 'Open 24 Hours' },
            { day: 'Sunday', hours: 'Open 24 Hours' },
          ],
          userReviews: [
            {
              id: 'r1',
              userName: 'David L.',
              title: 'Open 24/7 - lifesaver!',
              comment: 'Love that this place is always open. Saved me multiple times on late night drives. Coffee bar is a nice touch.',
              timeAgo: '4 days ago',
              isPositive: true,
            },
            {
              id: 'r2',
              userName: 'Emma W.',
              title: 'Convenient but pricey',
              comment: 'Very convenient location and great store, but prices are higher than other stations.',
              timeAgo: '1 week ago',
              isPositive: false,
            },
            {
              id: 'r3',
              userName: 'Chris B.',
              title: 'Full service is worth it',
              comment: 'Pay a bit extra for full service and its totally worth it. Staff is super helpful.',
              timeAgo: '2 weeks ago',
              isPositive: true,
            },
          ],
        },
      ],
    },
    cng: {
      places: [
        {
          id: 'c1',
          name: 'Green CNG Station',
          address: '890 Eco Boulevard, Green Zone',
          distance: '1.5 km',
          timeToReach: '6 min',
          rating: 4.6,
          reviews: 178,
          isOpen: true,
          phone: '+1 555-0201',
          priceLevel: '$',
          likes: 165,
          dislikes: 5,
          description: 'Eco-friendly CNG station with fast filling technology. Clean and well-maintained facility.',
          openingHours: '6:00 AM - 10:00 PM',
          coordinates: {
            latitude: 40.7280,
            longitude: -73.9920,
          },
          services: [
            { name: 'CNG Fill-up', price: '$2.15/kg', duration: '8 min' },
            { name: 'Fast Fill Technology', price: '$2.25/kg', duration: '5 min' },
            { name: 'CNG System Check', price: '$15.00', duration: '20 min' },
            { name: 'Leak Detection', price: '$25.00', duration: '30 min' },
            { name: 'Filter Replacement', price: '$35.00', duration: '25 min' },
            { name: 'Air Pressure Check', price: 'Free', duration: '5 min' },
          ],
          openingHoursTable: [
            { day: 'Monday', hours: '6:00 AM - 10:00 PM' },
            { day: 'Tuesday', hours: '6:00 AM - 10:00 PM' },
            { day: 'Wednesday', hours: '6:00 AM - 10:00 PM' },
            { day: 'Thursday', hours: '6:00 AM - 10:00 PM' },
            { day: 'Friday', hours: '6:00 AM - 10:00 PM' },
            { day: 'Saturday', hours: '7:00 AM - 9:00 PM' },
            { day: 'Sunday', hours: '7:00 AM - 8:00 PM' },
          ],
          userReviews: [
            {
              id: 'r1',
              userName: 'Raj K.',
              title: 'Best CNG station around',
              comment: 'Clean facility, fast filling, and reasonable prices. The staff knows their stuff about CNG systems.',
              timeAgo: '1 day ago',
              isPositive: true,
            },
            {
              id: 'r2',
              userName: 'Priya S.',
              title: 'Eco-friendly choice',
              comment: 'Great CNG station with modern equipment. Happy to support an eco-friendly option.',
              timeAgo: '5 days ago',
              isPositive: true,
            },
          ],
        },
        {
          id: 'c2',
          name: 'City CNG Hub',
          address: '234 Metro Drive, City Center',
          distance: '2.8 km',
          timeToReach: '10 min',
          rating: 4.4,
          reviews: 203,
          isOpen: true,
          phone: '+1 555-0202',
          priceLevel: '$$',
          likes: 187,
          dislikes: 11,
          description: 'Large CNG station in the heart of the city. Multiple pumps for quick service.',
          openingHours: '5:00 AM - 11:00 PM',
          coordinates: {
            latitude: 40.7150,
            longitude: -74.0050,
          },
          services: [
            { name: 'CNG Fill-up', price: '$2.35/kg', duration: '8 min' },
            { name: 'Express Lane Fill', price: '$2.45/kg', duration: '5 min' },
            { name: 'CNG Kit Installation', price: '$1,200.00', duration: '6-8 hours', description: 'Complete kit with warranty' },
            { name: 'Annual CNG System Service', price: '$85.00', duration: '1 hour' },
            { name: 'Safety Inspection', price: '$30.00', duration: '30 min' },
            { name: 'Valve Replacement', price: '$45.00', duration: '40 min' },
            { name: 'Waiting Lounge', price: 'Free' },
          ],
          openingHoursTable: [
            { day: 'Monday', hours: '5:00 AM - 11:00 PM' },
            { day: 'Tuesday', hours: '5:00 AM - 11:00 PM' },
            { day: 'Wednesday', hours: '5:00 AM - 11:00 PM' },
            { day: 'Thursday', hours: '5:00 AM - 11:00 PM' },
            { day: 'Friday', hours: '5:00 AM - 11:00 PM' },
            { day: 'Saturday', hours: '6:00 AM - 11:00 PM' },
            { day: 'Sunday', hours: '6:00 AM - 10:00 PM' },
          ],
          userReviews: [
            {
              id: 'r1',
              userName: 'Amit T.',
              title: 'Multiple pumps, no waiting',
              comment: 'Large station with plenty of pumps. Never have to wait in line. Express lane is super fast!',
              timeAgo: '2 days ago',
              isPositive: true,
            },
            {
              id: 'r2',
              userName: 'Neha M.',
              title: 'Professional CNG kit installation',
              comment: 'Got my CNG kit installed here. Very professional work with proper documentation. Highly recommend!',
              timeAgo: '1 week ago',
              isPositive: true,
            },
            {
              id: 'r3',
              userName: 'Vikram R.',
              title: 'Slightly expensive',
              comment: 'Good service but prices are on the higher side compared to other CNG stations.',
              timeAgo: '10 days ago',
              isPositive: false,
            },
          ],
        },
      ],
    },
  },
  repair: {
    engineRepair: {
      places: [
        {
          id: 'er1',
          name: 'Auto Expert Engine Service',
          address: '567 Workshop Lane, Industrial Area',
          distance: '1.1 km',
          timeToReach: '4 min',
          rating: 4.8,
          reviews: 421,
          isOpen: true,
          phone: '+1 555-0301',
          priceLevel: '$$',
          likes: 389,
          dislikes: 15,
          description: 'Professional engine repair and diagnostics. ASE certified technicians with 20+ years experience.',
          openingHours: '8:00 AM - 6:00 PM (Mon-Sat)',
          coordinates: {
            latitude: 40.7150,
            longitude: -74.0080,
          },
          services: [
            { name: 'Engine Diagnostics', price: '$85.00', duration: '1 hour', description: 'Complete engine system scan' },
            { name: 'Oil Change', price: '$45.00', duration: '30 min', description: 'Full synthetic oil change' },
            { name: 'Spark Plug Replacement', price: '$120.00', duration: '1 hour' },
            { name: 'Timing Belt Replacement', price: '$450.00', duration: '3 hours' },
            { name: 'Engine Overhaul', price: '$2,500.00', duration: '2-3 days', description: 'Complete engine rebuild' },
            { name: 'Coolant System Flush', price: '$95.00', duration: '45 min' },
            { name: 'Air Filter Replacement', price: '$35.00', duration: '15 min' },
          ],
          openingHoursTable: [
            { day: 'Monday', hours: '8:00 AM - 6:00 PM' },
            { day: 'Tuesday', hours: '8:00 AM - 6:00 PM' },
            { day: 'Wednesday', hours: '8:00 AM - 6:00 PM' },
            { day: 'Thursday', hours: '8:00 AM - 6:00 PM' },
            { day: 'Friday', hours: '8:00 AM - 6:00 PM' },
            { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
            { day: 'Sunday', hours: 'Closed' },
          ],
          userReviews: [
            {
              id: 'r1',
              userName: 'Robert J.',
              title: 'Expert diagnosis and repair',
              comment: 'They found the issue other shops missed. Fair pricing and excellent work. My engine runs like new!',
              timeAgo: '3 days ago',
              isPositive: true,
            },
            {
              id: 'r2',
              userName: 'Maria G.',
              title: 'Trustworthy mechanics',
              comment: 'Finally found a shop I can trust. They explain everything clearly and dont oversell services.',
              timeAgo: '1 week ago',
              isPositive: true,
            },
            {
              id: 'r3',
              userName: 'Steve M.',
              title: 'Quality work takes time',
              comment: 'Great work but took longer than estimated. Still happy with the results though.',
              timeAgo: '2 weeks ago',
              isPositive: true,
            },
          ],
        },
        {
          id: 'er2',
          name: 'Quick Fix Motors',
          address: '890 Repair Street, South Side',
          distance: '2.3 km',
          timeToReach: '9 min',
          rating: 4.5,
          reviews: 289,
          isOpen: true,
          phone: '+1 555-0302',
          priceLevel: '$',
          likes: 256,
          dislikes: 14,
          description: 'Fast and affordable engine repair services. Walk-in friendly with quick turnaround.',
          openingHours: '8:00 AM - 7:00 PM',
          coordinates: {
            latitude: 40.7080,
            longitude: -74.0120,
          },
          services: [
            { name: 'Engine Diagnostic', price: '$45.00', duration: '30 min' },
            { name: 'Oil Change', price: '$35.00', duration: '20 min' },
            { name: 'Spark Plug Replacement', price: '$65.00', duration: '40 min' },
            { name: 'Timing Belt Replacement', price: '$350.00', duration: '3 hours' },
            { name: 'Water Pump Repair', price: '$180.00', duration: '2 hours' },
            { name: 'Engine Mount Replacement', price: '$125.00', duration: '1.5 hours' },
            { name: 'Battery Check', price: 'Free', duration: '10 min' },
          ],
          openingHoursTable: [
            { day: 'Monday', hours: '8:00 AM - 7:00 PM' },
            { day: 'Tuesday', hours: '8:00 AM - 7:00 PM' },
            { day: 'Wednesday', hours: '8:00 AM - 7:00 PM' },
            { day: 'Thursday', hours: '8:00 AM - 7:00 PM' },
            { day: 'Friday', hours: '8:00 AM - 7:00 PM' },
            { day: 'Saturday', hours: '9:00 AM - 5:00 PM' },
            { day: 'Sunday', hours: '10:00 AM - 3:00 PM' },
          ],
          userReviews: [
            {
              id: 'r1',
              userName: 'Jennifer L.',
              title: 'Fast and affordable',
              comment: 'Got my oil change done in 20 minutes. Great prices and friendly service. Will come back!',
              timeAgo: '2 days ago',
              isPositive: true,
            },
            {
              id: 'r2',
              userName: 'Carlos R.',
              title: 'Walk-in friendly',
              comment: 'No appointment needed! Just walked in and they took care of my car right away. Very convenient.',
              timeAgo: '5 days ago',
              isPositive: true,
            },
          ],
        },
      ],
    },
    acRepair: {
      places: [
        {
          id: 'ac1',
          name: 'Cool Air Auto AC',
          address: '123 Climate Road, Cool District',
          distance: '0.9 km',
          timeToReach: '4 min',
          rating: 4.7,
          reviews: 267,
          isOpen: true,
          phone: '+1 555-0401',
          priceLevel: '$$',
          likes: 245,
          dislikes: 9,
          description: 'AC specialists with certified technicians. Quick service and 1-year warranty on repairs.',
          openingHours: '9:00 AM - 6:00 PM',
          coordinates: {
            latitude: 40.7350,
            longitude: -73.9900,
          },
          services: [
            { name: 'AC Gas Refill', price: '$65.00', duration: '30 min' },
            { name: 'AC Compressor Repair', price: '$250.00', duration: '3 hours' },
            { name: 'AC Condenser Replacement', price: '$180.00', duration: '2 hours' },
            { name: 'Blower Motor Repair', price: '$95.00', duration: '1 hour' },
            { name: 'AC System Flush', price: '$75.00', duration: '45 min' },
            { name: 'Leak Detection & Seal', price: '$55.00', duration: '40 min' },
            { name: 'AC Filter Replacement', price: '$25.00', duration: '15 min' },
            { name: 'Full AC Service', price: '$150.00', duration: '2 hours', description: 'Complete system check and service' },
          ],
          openingHoursTable: [
            { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
            { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
            { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
            { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
            { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
            { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
            { day: 'Sunday', hours: 'Closed' },
          ],
          userReviews: [
            {
              id: 'r1',
              userName: 'Patricia K.',
              title: 'AC working perfectly now',
              comment: 'My AC was barely blowing cold air. They fixed it in under an hour and its ice cold now! Great service.',
              timeAgo: '1 day ago',
              isPositive: true,
            },
            {
              id: 'r2',
              userName: 'Kevin S.',
              title: 'Warranty gives peace of mind',
              comment: 'Appreciate the 1-year warranty on repairs. Shows they stand behind their work.',
              timeAgo: '6 days ago',
              isPositive: true,
            },
            {
              id: 'r3',
              userName: 'Nancy T.',
              title: 'Certified technicians',
              comment: 'Professional and knowledgeable staff. They explained everything that needed to be done.',
              timeAgo: '2 weeks ago',
              isPositive: true,
            },
          ],
        },
      ],
    },
    transmission: {
      places: [
        {
          id: 't1',
          name: 'Transmission Masters',
          address: '456 Gearbox Avenue, Tech Zone',
          distance: '1.7 km',
          timeToReach: '7 min',
          rating: 4.9,
          reviews: 512,
          isOpen: true,
          phone: '+1 555-0501',
          priceLevel: '$$$',
          likes: 478,
          dislikes: 6,
          description: 'Expert transmission repair with lifetime warranty. State-of-the-art diagnostic equipment.',
          openingHours: '8:00 AM - 6:00 PM',
          coordinates: {
            latitude: 40.7220,
            longitude: -73.9950,
          },
          services: [
            { name: 'Transmission Diagnostic', price: '$85.00', duration: '1 hour' },
            { name: 'Transmission Fluid Change', price: '$120.00', duration: '1 hour' },
            { name: 'Transmission Filter Replacement', price: '$95.00', duration: '45 min' },
            { name: 'Clutch Repair', price: '$450.00', duration: '4-5 hours' },
            { name: 'Automatic Transmission Repair', price: '$1,800.00', duration: '2-3 days', description: 'Full rebuild with warranty' },
            { name: 'Manual Transmission Repair', price: '$1,200.00', duration: '2 days', description: 'Complete overhaul' },
            { name: 'Gear Shift Cable Replacement', price: '$145.00', duration: '1.5 hours' },
            { name: 'Torque Converter Replacement', price: '$650.00', duration: '5 hours' },
            { name: 'Free Test Drive Diagnostic', price: 'Free', duration: '20 min' },
          ],
          openingHoursTable: [
            { day: 'Monday', hours: '8:00 AM - 6:00 PM' },
            { day: 'Tuesday', hours: '8:00 AM - 6:00 PM' },
            { day: 'Wednesday', hours: '8:00 AM - 6:00 PM' },
            { day: 'Thursday', hours: '8:00 AM - 6:00 PM' },
            { day: 'Friday', hours: '8:00 AM - 6:00 PM' },
            { day: 'Saturday', hours: '9:00 AM - 3:00 PM' },
            { day: 'Sunday', hours: 'Closed' },
          ],
          userReviews: [
            {
              id: 'r1',
              userName: 'Michael B.',
              title: 'Lifetime warranty - amazing!',
              comment: 'Got my transmission rebuilt here 2 years ago. Still working perfectly. The lifetime warranty is incredible.',
              timeAgo: '4 days ago',
              isPositive: true,
            },
            {
              id: 'r2',
              userName: 'Angela D.',
              title: 'Experts in transmission',
              comment: 'These guys really know transmissions. Diagnosed the problem accurately and fixed it right the first time.',
              timeAgo: '1 week ago',
              isPositive: true,
            },
            {
              id: 'r3',
              userName: 'James W.',
              title: 'Top-notch equipment',
              comment: 'State-of-the-art diagnostic tools. You can tell they invest in quality equipment and training.',
              timeAgo: '10 days ago',
              isPositive: true,
            },
          ],
        },
      ],
    },
  },
  tire: {
    puncture: {
      places: [
        {
          id: 'punc1',
          name: '24/7 Tire Rescue',
          address: '789 Emergency Road, Express Zone',
          distance: '0.5 km',
          timeToReach: '2 min',
          rating: 4.4,
          reviews: 198,
          isOpen: true,
          phone: '+1 555-0601',
          priceLevel: '$',
          likes: 178,
          dislikes: 7,
          description: 'Emergency puncture repair available 24/7. Mobile service available for roadside assistance.',
          openingHours: '24 Hours',
          coordinates: {
            latitude: 40.7380,
            longitude: -73.9880,
          },
          services: [
            { name: 'Puncture Repair', price: '$15.00', duration: '20 min' },
            { name: 'Tire Patch', price: '$12.00', duration: '15 min' },
            { name: 'Roadside Assistance', price: '$35.00', duration: '30 min', description: 'We come to you' },
            { name: 'Tire Balancing', price: '$25.00', duration: '30 min' },
            { name: 'Valve Replacement', price: '$8.00', duration: '10 min' },
            { name: 'Emergency Tire Change', price: '$20.00', duration: '15 min' },
            { name: 'Air Pressure Check', price: 'Free', duration: '5 min' },
          ],
          openingHoursTable: [
            { day: 'Monday', hours: 'Open 24 Hours' },
            { day: 'Tuesday', hours: 'Open 24 Hours' },
            { day: 'Wednesday', hours: 'Open 24 Hours' },
            { day: 'Thursday', hours: 'Open 24 Hours' },
            { day: 'Friday', hours: 'Open 24 Hours' },
            { day: 'Saturday', hours: 'Open 24 Hours' },
            { day: 'Sunday', hours: 'Open 24 Hours' },
          ],
          userReviews: [
            {
              id: 'r1',
              userName: 'Daniel F.',
              title: 'Saved me at midnight!',
              comment: 'Got a flat tire at 11:45 PM. Called them and they came to my location within 20 minutes. True lifesavers!',
              timeAgo: '1 day ago',
              isPositive: true,
            },
            {
              id: 'r2',
              userName: 'Sophia L.',
              title: '24/7 service is real',
              comment: 'Needed help on Sunday morning. They were there and fixed my puncture quickly. Great service!',
              timeAgo: '4 days ago',
              isPositive: true,
            },
          ],
        },
        {
          id: 'punc2',
          name: 'Quick Puncture Fix',
          address: '234 Fast Lane, Speed District',
          distance: '1.3 km',
          timeToReach: '5 min',
          rating: 4.6,
          reviews: 234,
          isOpen: true,
          phone: '+1 555-0602',
          priceLevel: '$',
          likes: 212,
          dislikes: 8,
          description: 'Fast puncture repair while you wait. No appointment necessary.',
          openingHours: '7:00 AM - 9:00 PM',
          coordinates: {
            latitude: 40.7250,
            longitude: -73.9980,
          },
          services: [
            { name: 'Quick Puncture Repair', price: '$18.00', duration: '15 min' },
            { name: 'Tire Plugging', price: '$14.00', duration: '12 min' },
            { name: 'Sidewall Repair', price: '$25.00', duration: '25 min' },
            { name: 'Tire Rotation', price: '$30.00', duration: '30 min' },
            { name: 'Wheel Alignment Check', price: '$20.00', duration: '20 min' },
            { name: 'Tire Inspection', price: 'Free', duration: '10 min' },
          ],
          openingHoursTable: [
            { day: 'Monday', hours: '7:00 AM - 9:00 PM' },
            { day: 'Tuesday', hours: '7:00 AM - 9:00 PM' },
            { day: 'Wednesday', hours: '7:00 AM - 9:00 PM' },
            { day: 'Thursday', hours: '7:00 AM - 9:00 PM' },
            { day: 'Friday', hours: '7:00 AM - 9:00 PM' },
            { day: 'Saturday', hours: '8:00 AM - 8:00 PM' },
            { day: 'Sunday', hours: '9:00 AM - 6:00 PM' },
          ],
          userReviews: [
            {
              id: 'r1',
              userName: 'Ryan P.',
              title: 'Super quick repair',
              comment: 'In and out in 15 minutes. No appointment needed. They know what theyre doing!',
              timeAgo: '2 days ago',
              isPositive: true,
            },
            {
              id: 'r2',
              userName: 'Jessica H.',
              title: 'Fair pricing',
              comment: 'Reasonable prices for puncture repair. Good quality work and friendly staff.',
              timeAgo: '1 week ago',
              isPositive: true,
            },
          ],
        },
      ],
    },
    usedTire: {
      places: [
        {
          id: 'ut1',
          name: 'Budget Tire Shop',
          address: '567 Economy Street, Affordable Zone',
          distance: '2.0 km',
          timeToReach: '8 min',
          rating: 4.1,
          reviews: 145,
          isOpen: true,
          phone: '+1 555-0701',
          priceLevel: '$',
          likes: 123,
          dislikes: 15,
          description: 'Affordable used tires with good tread. Great for budget-conscious drivers.',
          openingHours: '9:00 AM - 6:00 PM',
          coordinates: {
            latitude: 40.7100,
            longitude: -74.0080,
          },
          services: [
            { name: 'Used Tire - Small (13-15")', price: '$25.00', duration: '20 min' },
            { name: 'Used Tire - Medium (16-17")', price: '$35.00', duration: '20 min' },
            { name: 'Used Tire - Large (18-20")', price: '$45.00', duration: '20 min' },
            { name: 'Tire Installation', price: '$15.00/tire', duration: '15 min' },
            { name: 'Tire Balancing', price: '$10.00/tire', duration: '10 min' },
            { name: 'Valve Stem Replacement', price: '$5.00', duration: '5 min' },
            { name: 'Set of 4 Tires Package', price: '$120.00', duration: '1 hour', description: 'Includes installation' },
          ],
          openingHoursTable: [
            { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
            { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
            { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
            { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
            { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
            { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
            { day: 'Sunday', hours: 'Closed' },
          ],
          userReviews: [
            {
              id: 'r1',
              userName: 'Mark T.',
              title: 'Good deals on used tires',
              comment: 'Found a great set of used tires with plenty of tread left. Perfect for my budget!',
              timeAgo: '3 days ago',
              isPositive: true,
            },
            {
              id: 'r2',
              userName: 'Laura B.',
              title: 'Hit or miss on quality',
              comment: 'Prices are good but tire quality varies. Make sure to inspect them carefully before buying.',
              timeAgo: '1 week ago',
              isPositive: false,
            },
          ],
        },
      ],
    },
    newTire: {
      places: [
        {
          id: 'nt1',
          name: 'Premium Tire Center',
          address: '890 Quality Boulevard, Premium District',
          distance: '1.8 km',
          timeToReach: '7 min',
          rating: 4.8,
          reviews: 398,
          isOpen: true,
          phone: '+1 555-0801',
          priceLevel: '$$$',
          likes: 367,
          dislikes: 8,
          description: 'Premium brand tires with lifetime warranty. Expert installation and wheel alignment services.',
          openingHours: '8:00 AM - 8:00 PM',
          coordinates: {
            latitude: 40.7300,
            longitude: -73.9910,
          },
          services: [
            { name: 'Michelin Tire - Small (13-15")', price: '$120.00', duration: '30 min' },
            { name: 'Michelin Tire - Medium (16-17")', price: '$165.00', duration: '30 min' },
            { name: 'Michelin Tire - Large (18-20")', price: '$220.00', duration: '30 min' },
            { name: 'Bridgestone Premium Tire', price: '$180.00', duration: '30 min' },
            { name: 'Professional Installation', price: '$25.00/tire', duration: '20 min' },
            { name: 'Wheel Alignment', price: '$85.00', duration: '1 hour' },
            { name: 'Tire Rotation & Balance', price: '$55.00', duration: '45 min' },
            { name: 'Nitrogen Tire Fill', price: '$40.00', duration: '30 min', description: 'Better pressure retention' },
            { name: 'TPMS Service', price: '$35.00', duration: '20 min' },
          ],
          openingHoursTable: [
            { day: 'Monday', hours: '8:00 AM - 8:00 PM' },
            { day: 'Tuesday', hours: '8:00 AM - 8:00 PM' },
            { day: 'Wednesday', hours: '8:00 AM - 8:00 PM' },
            { day: 'Thursday', hours: '8:00 AM - 8:00 PM' },
            { day: 'Friday', hours: '8:00 AM - 8:00 PM' },
            { day: 'Saturday', hours: '9:00 AM - 7:00 PM' },
            { day: 'Sunday', hours: '10:00 AM - 5:00 PM' },
          ],
          userReviews: [
            {
              id: 'r1',
              userName: 'William C.',
              title: 'Premium quality tires',
              comment: 'Got Michelin tires installed. Excellent service and professional installation. Worth every penny!',
              timeAgo: '2 days ago',
              isPositive: true,
            },
            {
              id: 'r2',
              userName: 'Amanda R.',
              title: 'Lifetime warranty is great',
              comment: 'The lifetime warranty on tire rotation and balancing is an excellent value. Highly recommend!',
              timeAgo: '5 days ago',
              isPositive: true,
            },
            {
              id: 'r3',
              userName: 'Gary M.',
              title: 'Expert staff',
              comment: 'Staff really knows their tires. Helped me choose the perfect set for my driving needs.',
              timeAgo: '1 week ago',
              isPositive: true,
            },
          ],
        },
        {
          id: 'nt2',
          name: 'Tire World',
          address: '123 Rubber Road, Wheel Zone',
          distance: '2.5 km',
          timeToReach: '10 min',
          rating: 4.7,
          reviews: 456,
          isOpen: true,
          phone: '+1 555-0802',
          priceLevel: '$$',
          likes: 412,
          dislikes: 12,
          description: 'Wide selection of quality tires at competitive prices. Free rotation for life.',
          openingHours: '8:00 AM - 7:00 PM',
          coordinates: {
            latitude: 40.7180,
            longitude: -74.0020,
          },
          services: [
            { name: 'Goodyear Tire - Small (13-15")', price: '$85.00', duration: '25 min' },
            { name: 'Goodyear Tire - Medium (16-17")', price: '$110.00', duration: '25 min' },
            { name: 'Goodyear Tire - Large (18-20")', price: '$145.00', duration: '25 min' },
            { name: 'Continental Tire', price: '$125.00', duration: '25 min' },
            { name: 'All-Season Tire Package', price: '$400.00', duration: '2 hours', description: 'Set of 4 with installation' },
            { name: 'Winter Tire Package', price: '$480.00', duration: '2 hours', description: 'Set of 4 with installation' },
            { name: 'Tire Installation', price: '$20.00/tire', duration: '15 min' },
            { name: 'Computerized Wheel Balance', price: '$15.00/tire', duration: '15 min' },
            { name: 'Free Lifetime Rotation', price: 'Free', duration: '30 min', description: 'With tire purchase' },
          ],
          openingHoursTable: [
            { day: 'Monday', hours: '8:00 AM - 7:00 PM' },
            { day: 'Tuesday', hours: '8:00 AM - 7:00 PM' },
            { day: 'Wednesday', hours: '8:00 AM - 7:00 PM' },
            { day: 'Thursday', hours: '8:00 AM - 7:00 PM' },
            { day: 'Friday', hours: '8:00 AM - 7:00 PM' },
            { day: 'Saturday', hours: '9:00 AM - 6:00 PM' },
            { day: 'Sunday', hours: '10:00 AM - 4:00 PM' },
          ],
          userReviews: [
            {
              id: 'r1',
              userName: 'Brian K.',
              title: 'Wide selection of tires',
              comment: 'Great variety of tire brands and sizes. Found exactly what I needed at a good price.',
              timeAgo: '1 day ago',
              isPositive: true,
            },
            {
              id: 'r2',
              userName: 'Michelle S.',
              title: 'Free rotation for life!',
              comment: 'The free lifetime tire rotation is amazing. I come back every 6 months and they take care of it.',
              timeAgo: '6 days ago',
              isPositive: true,
            },
            {
              id: 'r3',
              userName: 'Paul D.',
              title: 'Good value for money',
              comment: 'Not the cheapest but not the most expensive either. Good balance of quality and price.',
              timeAgo: '2 weeks ago',
              isPositive: true,
            },
          ],
        },
      ],
    },
  },
};

// Helper function to get places by category and service
export function getPlacesByService(category: keyof PlacesData, service: string): Place[] {
  const categoryData = placesData[category];
  const serviceData = categoryData?.[service];
  return serviceData?.places || [];
}

