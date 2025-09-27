import React from 'react';
import { AllowedUser } from '../types';
import LogoutIcon from './icons/LogoutIcon';

interface HeaderProps {
    currentUser: AllowedUser;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
    return (
        <header className="flex justify-between items-center pb-4 border-b border-slate-700">
            <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">
                TARGET MEETING
            </h1>
            <div className="flex items-center space-x-4">
                <span className="text-sm sm:text-base text-slate-400 hidden sm:block">Welcome, <span className="font-bold text-slate-200">{currentUser}</span></span>
                <button 
                    onClick={onLogout}
                    className="flex items-center space-x-2 bg-slate-700 hover:bg-red-600 text-slate-200 hover:text-white px-3 py-2 rounded-md transition-colors duration-200 text-sm"
                    aria-label="Logout"
                >
                    <LogoutIcon />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        </header>
    );
};

export default Header;