export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  make: string;
  registrationNumber: string;
  vehicleType: string;
  fuelType: string;
  fuelBrandPreference?: string;
  batteryBrandPreference?: string;
}

export const vehiclesData: Vehicle[] = [
  {
    id: 'v1',
    name: 'My Daily Ride',
    brand: 'Honda',
    make: 'City',
    registrationNumber: 'DL 01 AB 1234',
    vehicleType: 'Car',
    fuelType: 'Petrol',
    fuelBrandPreference: 'Shell',
    batteryBrandPreference: 'Exide',
  },
  {
    id: 'v2',
    name: 'Weekend Cruiser',
    brand: 'Maruti',
    make: 'Swift',
    registrationNumber: 'DL 02 CD 5678',
    vehicleType: 'Car',
    fuelType: 'Diesel',
    fuelBrandPreference: 'HP',
    batteryBrandPreference: 'Amaron',
  },
];

export const vehicleTypes = ['Car', 'Bike', 'Scooter', 'Truck', 'SUV'];
export const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'CNG', 'Hybrid'];
export const fuelBrands = ['Shell', 'HP', 'Bharat Petroleum', 'Indian Oil', 'Reliance'];
export const batteryBrands = ['Exide', 'Amaron', 'Luminous', 'Livguard', 'SF Sonic'];

