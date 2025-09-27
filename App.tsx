import React, { useState, useCallback, useMemo } from 'react';
import { AllowedUser, LeaderboardEntry, DataEntry } from './types';
import Login from './components/Login';
import DataEntryForm from './components/DataEntryForm';
import LeaderboardDisplay from './components/LeaderboardDisplay';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AllowedUser | null>(null);
  // Start with an empty array instead of mock data.
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  const handleLogin = useCallback((user: AllowedUser) => {
    setCurrentUser(user);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const handleDataSubmit = useCallback((newEntry: { name: string; guestCount: number; salesCount: number; reportSalesCount: number; topLeaderSalesCount: number; }) => {
    if (!currentUser) return;

    const { name, ...counts } = newEntry;
    const normalizedName = name.trim();
    
    setLeaderboardData(prevData => {
      const existingEntryIndex = prevData.findIndex(p => p.name.toLowerCase() === normalizedName.toLowerCase());
      
      const dataLog: DataEntry = {
        ...counts,
        timestamp: new Date().toISOString(),
        addedBy: currentUser,
      };

      if (existingEntryIndex > -1) {
        const updatedData = [...prevData];
        const existingEntry = updatedData[existingEntryIndex];
        updatedData[existingEntryIndex] = {
          ...existingEntry,
          guestCount: existingEntry.guestCount + counts.guestCount,
          salesCount: existingEntry.salesCount + counts.salesCount,
          reportSalesCount: existingEntry.reportSalesCount + counts.reportSalesCount,
          topLeaderSalesCount: existingEntry.topLeaderSalesCount + counts.topLeaderSalesCount,
          history: [...existingEntry.history, dataLog],
        };
        return updatedData;
      } else {
        const newPerson: LeaderboardEntry = {
          id: crypto.randomUUID(),
          name: normalizedName,
          ...counts,
          history: [dataLog],
        };
        return [...prevData, newPerson];
      }
    });
  }, [currentUser]);

  const handleEraseAllData = () => {
    if (window.confirm('Are you sure you want to erase all leaderboard data? This action cannot be undone.')) {
      setLeaderboardData([]);
    }
  };
  
  const allNames = useMemo(() => {
    return [...new Set(leaderboardData.map(entry => entry.name))].sort();
  }, [leaderboardData]);

  const sortedLeaderboardData = useMemo(() => {
    // This is a shallow copy, but sufficient for sorting
    return [...leaderboardData];
  }, [leaderboardData]);

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-6 lg:p-8">
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <main className="container mx-auto mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <DataEntryForm 
              onDataSubmit={handleDataSubmit} 
              onEraseAllData={handleEraseAllData} 
              allNames={allNames} 
            />
          </div>
          <div className="lg:col-span-2">
            <LeaderboardDisplay data={sortedLeaderboardData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;