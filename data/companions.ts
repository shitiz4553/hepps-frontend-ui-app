/**
 * Companion data for hangouts
 */

export interface Companion {
  id: string;
  name: string;
  avatar?: string;
  phone?: string;
}

export const companionsData: Companion[] = [
  {
    id: 'c1',
    name: 'John Smith',
    phone: '+1 555-0101',
  },
  {
    id: 'c2',
    name: 'Mike Johnson',
    phone: '+1 555-0102',
  },
  {
    id: 'c3',
    name: 'Sarah Williams',
    phone: '+1 555-0103',
  },
  {
    id: 'c4',
    name: 'Emily Davis',
    phone: '+1 555-0104',
  },
  {
    id: 'c5',
    name: 'David Brown',
    phone: '+1 555-0105',
  },
  {
    id: 'c6',
    name: 'Jessica Wilson',
    phone: '+1 555-0106',
  },
  {
    id: 'c7',
    name: 'Robert Taylor',
    phone: '+1 555-0107',
  },
  {
    id: 'c8',
    name: 'Lisa Anderson',
    phone: '+1 555-0108',
  },
  {
    id: 'c9',
    name: 'James Martinez',
    phone: '+1 555-0109',
  },
  {
    id: 'c10',
    name: 'Maria Garcia',
    phone: '+1 555-0110',
  },
];

export const vehiclesData = [
  { id: 'v1', label: 'Honda Civic 2020 - ABC123' },
  { id: 'v2', label: 'Toyota Camry 2021 - XYZ789' },
  { id: 'v3', label: 'Tesla Model 3 2022 - TES456' },
  { id: 'v4', label: 'Ford F-150 2019 - FRD321' },
];

