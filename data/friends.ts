export interface Friend {
  id: string;
  name: string;
  phone: string;
  status: 'connected' | 'invited' | 'blocked';
}

export const friendsData: Friend[] = [
  // Connected Friends
  {
    id: 'f1',
    name: 'David Brown',
    phone: '+91 98765 43211',
    status: 'connected',
  },
  {
    id: 'f2',
    name: 'Sarah Williams',
    phone: '+91 98765 43212',
    status: 'connected',
  },
  {
    id: 'f3',
    name: 'Emily Davis',
    phone: '+91 98765 43213',
    status: 'connected',
  },
  {
    id: 'f4',
    name: 'James Martinez',
    phone: '+91 98765 43214',
    status: 'connected',
  },
  {
    id: 'f5',
    name: 'Maria Garcia',
    phone: '+91 98765 43215',
    status: 'connected',
  },
  // Invited Friends
  {
    id: 'f6',
    name: 'Robert Taylor',
    phone: '+91 98765 43216',
    status: 'invited',
  },
  {
    id: 'f7',
    name: 'Lisa Anderson',
    phone: '+91 98765 43217',
    status: 'invited',
  },
  // Blocked Friends
  {
    id: 'f8',
    name: 'John Blocked',
    phone: '+91 98765 43218',
    status: 'blocked',
  },
];

