import React from 'react';
import { LeaderboardEntry } from '../types';
import Leaderboard from './Leaderboard';

interface LeaderboardDisplayProps {
  data: LeaderboardEntry[];
}

const LeaderboardDisplay: React.FC<LeaderboardDisplayProps> = ({ data }) => {
  return (
    <div className="space-y-8">
       <h2 className="text-3xl font-bold text-center text-slate-200 mb-6">Live Leaderboards</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Leaderboard title="Overall Leading – Guest" data={data} metricKey="guestCount" limit={5} metricLabel="Guest" />
        <Leaderboard title="Overall Leading – Sales" data={data} metricKey="salesCount" limit={5} metricLabel="Sales" />
        <Leaderboard title="Overall Leading – Leader" data={data} metricKey="reportSalesCount" limit={5} metricLabel="Sales" />
        <Leaderboard title="Overall Leading – Top Leader" data={data} metricKey="topLeaderSalesCount" limit={7} metricLabel="Sales" />
      </div>
    </div>
  );
};

export default LeaderboardDisplay;