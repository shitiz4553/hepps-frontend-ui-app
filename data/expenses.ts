/**
 * Expense and balance data for hangouts
 */

export interface Expense {
  id: string;
  hangoutId: string;
  name: string;
  amount: number;
  type: string;
  date: string;
  paidBy: string; // User ID or name
  splitBetween: string[]; // Array of user IDs/names
  splitType: 'equal' | 'unequal';
  customSplits?: { [userId: string]: number }; // For unequal splits
}

export interface Balance {
  hangoutId: string;
  userPaid: number;
  userShare: number;
  netBalance: number; // positive = gets back, negative = owes
  settlements: Settlement[];
}

export interface Settlement {
  from: string;
  to: string;
  amount: number;
}

export interface Activity {
  id: string;
  hangoutId: string;
  type: 'expense_added' | 'hangout_created' | 'companion_added' | 'settled_up';
  actor: string;
  description: string;
  amount?: number;
  timestamp: string;
}

// Sample expenses for "Weekend Road Trip" (h1)
export const expensesData: Expense[] = [
  {
    id: 'e1',
    hangoutId: 'h1',
    name: 'Gas Station Fill-up',
    amount: 150,
    type: 'Fuel',
    date: 'Nov 8, 2:30 PM',
    paidBy: 'You',
    splitBetween: ['You', 'John Smith', 'Mike Johnson'],
    splitType: 'equal',
  },
  {
    id: 'e2',
    hangoutId: 'h1',
    name: 'Lunch at Restaurant',
    amount: 400,
    type: 'Food',
    date: 'Nov 8, 1:15 PM',
    paidBy: 'John Smith',
    splitBetween: ['You', 'John Smith', 'Mike Johnson'],
    splitType: 'equal',
  },
  {
    id: 'e3',
    hangoutId: 'h1',
    name: 'Parking Fee',
    amount: 50,
    type: 'Parking',
    date: 'Nov 8, 11:00 AM',
    paidBy: 'Mike Johnson',
    splitBetween: ['You', 'John Smith', 'Mike Johnson'],
    splitType: 'equal',
  },
  {
    id: 'e4',
    hangoutId: 'h1',
    name: 'Toll Plaza',
    amount: 80,
    type: 'Toll',
    date: 'Nov 7, 9:30 AM',
    paidBy: 'You',
    splitBetween: ['You', 'John Smith', 'Mike Johnson'],
    splitType: 'equal',
  },
  {
    id: 'e5',
    hangoutId: 'h1',
    name: 'Snacks & Coffee',
    amount: 120,
    type: 'Food',
    date: 'Nov 7, 10:45 AM',
    paidBy: 'John Smith',
    splitBetween: ['You', 'John Smith', 'Mike Johnson'],
    splitType: 'equal',
  },
  {
    id: 'e6',
    hangoutId: 'h1',
    name: 'Car Wash',
    amount: 200,
    type: 'Other',
    date: 'Nov 6, 4:00 PM',
    paidBy: 'Mike Johnson',
    splitBetween: ['You', 'John Smith', 'Mike Johnson'],
    splitType: 'equal',
  },
];

// Sample balances for "Weekend Road Trip" (h1)
export const balancesData: Balance = {
  hangoutId: 'h1',
  userPaid: 230, // e1 + e4
  userShare: 333.33, // Total 1000 / 3 people
  netBalance: -103.33, // User owes
  settlements: [
    {
      from: 'You',
      to: 'John Smith',
      amount: 70.00,
    },
    {
      from: 'You',
      to: 'Mike Johnson',
      amount: 33.33,
    },
  ],
};

// Sample activities for "Weekend Road Trip" (h1)
export const activitiesData: Activity[] = [
  {
    id: 'a1',
    hangoutId: 'h1',
    type: 'hangout_created',
    actor: 'You',
    description: 'Created hangout "Weekend Road Trip"',
    timestamp: 'Nov 6, 2:00 PM',
  },
  {
    id: 'a2',
    hangoutId: 'h1',
    type: 'companion_added',
    actor: 'You',
    description: 'Added John Smith',
    timestamp: 'Nov 6, 2:05 PM',
  },
  {
    id: 'a3',
    hangoutId: 'h1',
    type: 'companion_added',
    actor: 'You',
    description: 'Added Mike Johnson',
    timestamp: 'Nov 6, 2:05 PM',
  },
  {
    id: 'a4',
    hangoutId: 'h1',
    type: 'expense_added',
    actor: 'Mike Johnson',
    description: 'Added expense "Car Wash"',
    amount: 200,
    timestamp: 'Nov 6, 4:00 PM',
  },
  {
    id: 'a5',
    hangoutId: 'h1',
    type: 'expense_added',
    actor: 'You',
    description: 'Added expense "Toll Plaza"',
    amount: 80,
    timestamp: 'Nov 7, 9:30 AM',
  },
  {
    id: 'a6',
    hangoutId: 'h1',
    type: 'expense_added',
    actor: 'John Smith',
    description: 'Added expense "Snacks & Coffee"',
    amount: 120,
    timestamp: 'Nov 7, 10:45 AM',
  },
  {
    id: 'a7',
    hangoutId: 'h1',
    type: 'expense_added',
    actor: 'Mike Johnson',
    description: 'Added expense "Parking Fee"',
    amount: 50,
    timestamp: 'Nov 8, 11:00 AM',
  },
  {
    id: 'a8',
    hangoutId: 'h1',
    type: 'expense_added',
    actor: 'John Smith',
    description: 'Added expense "Lunch at Restaurant"',
    amount: 400,
    timestamp: 'Nov 8, 1:15 PM',
  },
  {
    id: 'a9',
    hangoutId: 'h1',
    type: 'expense_added',
    actor: 'You',
    description: 'Added expense "Gas Station Fill-up"',
    amount: 150,
    timestamp: 'Nov 8, 2:30 PM',
  },
];

export const expenseTypes = [
  { id: 'fuel', label: 'Fuel' },
  { id: 'food', label: 'Food' },
  { id: 'parking', label: 'Parking' },
  { id: 'toll', label: 'Toll' },
  { id: 'accommodation', label: 'Accommodation' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'other', label: 'Other' },
];

