import React from 'react';
import BotIcon from './icons/StethoscopeIcon'; // File has been repurposed to export BotIcon

const Header: React.FC = () => {
  return (
    <header className="text-center p-4 flex-shrink-0 bg-black/30 backdrop-blur-sm border-b border-gray-800/50 z-10">
      <div className="inline-flex items-center gap-3">
        <BotIcon className="w-8 h-8 text-cyan-400" />
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
          Gemini Chat
        </h1>
      </div>
    </header>
  );
};

export default Header;