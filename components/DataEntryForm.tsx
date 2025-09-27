import React, { useState } from 'react';

interface DataEntryFormProps {
  onDataSubmit: (data: { name: string; guestCount: number; salesCount: number; reportSalesCount: number; topLeaderSalesCount: number; }) => void;
  onEraseAllData: () => void;
  allNames: string[];
}

const DataEntryForm: React.FC<DataEntryFormProps> = ({ onDataSubmit, onEraseAllData, allNames }) => {
  const [name, setName] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [salesCount, setSalesCount] = useState('');
  const [reportSalesCount, setReportSalesCount] = useState('');
  const [topLeaderSalesCount, setTopLeaderSalesCount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (value.trim()) {
      const filtered = allNames.filter(personName => 
        personName.toLowerCase().includes(value.toLowerCase()) && 
        personName.toLowerCase() !== value.toLowerCase()
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setName(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    const guestNum = parseInt(guestCount) || 0;
    const salesNum = parseInt(salesCount) || 0;
    const reportSalesNum = parseInt(reportSalesCount) || 0;
    const topLeaderSalesNum = parseInt(topLeaderSalesCount) || 0;

    if (guestNum < 0 || salesNum < 0 || reportSalesNum < 0 || topLeaderSalesNum < 0) {
      setError('Counts cannot be negative.');
      return;
    }

    onDataSubmit({ 
      name: name.trim(), 
      guestCount: guestNum, 
      salesCount: salesNum, 
      reportSalesCount: reportSalesNum,
      topLeaderSalesCount: topLeaderSalesNum,
    });
    
    setError(null);
    setSuccess(`Successfully added data for ${name.trim()}.`);
    setName('');
    setGuestCount('');
    setSalesCount('');
    setReportSalesCount('');
    setTopLeaderSalesCount('');
    setSuggestions([]);

    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg sticky top-8">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">Data Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label htmlFor="name" className="block text-sm font-medium text-slate-300">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            onBlur={() => setTimeout(() => setSuggestions([]), 150)}
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="Enter person's name"
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-slate-600 border border-slate-500 rounded-md mt-1 max-h-48 overflow-y-auto shadow-lg">
              {suggestions.slice(0, 7).map((suggestion, index) => (
                <li
                  key={index}
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-2 cursor-pointer hover:bg-cyan-700 transition-colors duration-150"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label htmlFor="guestCount" className="block text-sm font-medium text-slate-300">Guest Count</label>
          <input
            type="number"
            id="guestCount"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="0"
            min="0"
          />
        </div>
        <div>
          <label htmlFor="salesCount" className="block text-sm font-medium text-slate-300">Sales Count</label>
          <input
            type="number"
            id="salesCount"
            value={salesCount}
            onChange={(e) => setSalesCount(e.target.value)}
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="0"
            min="0"
          />
        </div>
        <div>
          <label htmlFor="reportSalesCount" className="block text-sm font-medium text-slate-300">Report Sales Count</label>
          <input
            type="number"
            id="reportSalesCount"
            value={reportSalesCount}
            onChange={(e) => setReportSalesCount(e.target.value)}
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="0"
            min="0"
          />
        </div>
        <div>
          <label htmlFor="topLeaderSalesCount" className="block text-sm font-medium text-slate-300">Top Leader Sales Count</label>
          <input
            type="number"
            id="topLeaderSalesCount"
            value={topLeaderSalesCount}
            onChange={(e) => setTopLeaderSalesCount(e.target.value)}
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="0"
            min="0"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-colors duration-200"
        >
          Submit Data
        </button>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-400 text-sm mt-2">{success}</p>}
      </form>
       <p className="text-xs text-slate-500 mt-4">Note: If a name already exists, the new counts will be added to their current total.</p>

       <div className="mt-6 pt-6 border-t border-slate-700">
          <button
            type="button"
            onClick={onEraseAllData}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-red-500 transition-colors duration-200"
          >
            Erase All Data
          </button>
          <p className="text-xs text-slate-500 mt-2 text-center">Warning: This will permanently delete all leaderboard entries.</p>
      </div>
    </div>
  );
};

export default DataEntryForm;