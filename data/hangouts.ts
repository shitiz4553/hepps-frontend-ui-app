/**
 * Hangout data
 */

import type { Companion } from './companions';

export interface Hangout {
  id: string;
  name: string;
  companions: Companion[];
  vehicle: string;
  createdAt: string;
  isPinned: boolean;
  lastActivity?: string;
}

export const hangoutsData: Hangout[] = [
  {
    id: 'h1',
    name: 'Weekend Road Trip',
    companions: [
      { id: 'c1', name: 'John Smith', phone: '+1 555-0101' },
      { id: 'c2', name: 'Mike Johnson', phone: '+1 555-0102' },
    ],
    vehicle: 'Honda Civic 2020 - ABC123',
    createdAt: '2 days ago',
    isPinned: true,
    lastActivity: 'Active 2h ago',
  },
  {
    id: 'h2',
    name: 'Beach Day Trip',
    companions: [
      { id: 'c3', name: 'Sarah Williams', phone: '+1 555-0103' },
      { id: 'c4', name: 'Emily Davis', phone: '+1 555-0104' },
      { id: 'c5', name: 'David Brown', phone: '+1 555-0105' },
    ],
    vehicle: 'Toyota Camry 2021 - XYZ789',
    createdAt: '1 week ago',
    isPinned: true,
    lastActivity: 'Active 1d ago',
  },
  {
    id: 'h3',
    name: 'City Tour',
    companions: [
      { id: 'c6', name: 'Jessica Wilson', phone: '+1 555-0106' },
    ],
    vehicle: 'Tesla Model 3 2022 - TES456',
    createdAt: '3 days ago',
    isPinned: false,
    lastActivity: 'Active 5h ago',
  },
  {
    id: 'h4',
    name: 'Mountain Adventure',
    companions: [
      { id: 'c7', name: 'Robert Taylor', phone: '+1 555-0107' },
      { id: 'c8', name: 'Lisa Anderson', phone: '+1 555-0108' },
    ],
    vehicle: 'Ford F-150 2019 - FRD321',
    createdAt: '5 days ago',
    isPinned: false,
    lastActivity: 'Active 3d ago',
  },
];

