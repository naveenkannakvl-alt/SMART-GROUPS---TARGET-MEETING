export type AllowedUser = 'Syed' | 'Naveen' | 'Mari' | 'Sarath';

export interface DataEntry {
  timestamp: string;
  addedBy: AllowedUser;
  guestCount: number;
  salesCount: number;
  reportSalesCount: number;
  topLeaderSalesCount: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  guestCount: number;
  salesCount: number;
  reportSalesCount: number;
  topLeaderSalesCount: number;
  history: DataEntry[];
}