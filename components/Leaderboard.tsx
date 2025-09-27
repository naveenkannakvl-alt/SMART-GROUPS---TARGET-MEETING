
import React from 'react';
import { LeaderboardEntry } from '../types';
import TrophyIcon from './icons/TrophyIcon';

interface LeaderboardProps {
  title: string;
  data: LeaderboardEntry[];
  metricKey: keyof LeaderboardEntry;
  limit: number;
  metricLabel: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ title, data, metricKey, limit, metricLabel }) => {
  const sortedData = [...data]
    .filter(entry => (entry[metricKey] as number) > 0)
    .sort((a, b) => (b[metricKey] as number) - (a[metricKey] as number))
    .slice(0, limit);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-slate-300';
      case 3: return 'text-yellow-600';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
      <h3 className="p-4 text-xl font-bold text-center text-emerald-400 border-b border-slate-700">{title}</h3>
      <div className="overflow-x-auto grow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="p-3 text-center w-1/6 font-semibold tracking-wider text-slate-300">Rank</th>
              <th className="p-3 w-3/6 font-semibold tracking-wider text-slate-300">Name</th>
              <th className="p-3 text-right w-2/6 font-semibold tracking-wider text-slate-300">{metricLabel}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {sortedData.map((entry, index) => {
              const rank = index + 1;
              return (
                <tr key={entry.id} className={`${rank === 1 ? 'bg-emerald-500/10' : ''} hover:bg-slate-700/50 transition-colors`}>
                  <td className={`p-3 text-center font-bold ${getRankColor(rank)}`}>
                    <div className="flex items-center justify-center">
                      {rank === 1 && <TrophyIcon className="w-4 h-4 mr-1.5" />}
                      {rank}
                    </div>
                  </td>
                  <td className="p-3 font-medium text-slate-200">{entry.name}</td>
                  <td className="p-3 text-right font-mono text-cyan-400">{(entry[metricKey] as number).toLocaleString()}</td>
                </tr>
              );
            })}
             {sortedData.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center p-4 text-slate-500">No data available.</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
