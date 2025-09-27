import React, { useState } from 'react';
import { ALLOWED_USERS } from '../constants';
import { AllowedUser } from '../types';

interface LoginProps {
  onLogin: (user: AllowedUser) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedUser, setSelectedUser] = useState<AllowedUser>(ALLOWED_USERS[0]);

  const handleLogin = () => {
    onLogin(selectedUser);
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-sm p-8 space-y-6 bg-slate-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">
          TARGET MEETING
        </h1>
        <div>
          <label htmlFor="user-select" className="block text-sm font-medium text-slate-300">
            Select User
          </label>
          <select
            id="user-select"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value as AllowedUser)}
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          >
            {ALLOWED_USERS.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleLogin}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-colors duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;