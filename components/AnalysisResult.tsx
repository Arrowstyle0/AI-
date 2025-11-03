import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import BotIcon from './icons/StethoscopeIcon'; // File has been repurposed to export BotIcon
import UserIcon from './icons/AlertTriangleIcon'; // File has been repurposed to export UserIcon

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto">
      {messages.map((msg, index) => (
        <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''} message-pop-in`}>
          {msg.role === 'model' && (
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 border border-gray-700">
              <BotIcon className="w-5 h-5 text-cyan-400" />
            </div>
          )}
          <div className={`max-w-xl p-3 rounded-2xl ${
            msg.role === 'user'
              ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-br-none'
              : 'bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700'
          }`}>
            <p className="whitespace-pre-wrap">{msg.parts.map(part => part.text).join('')}</p>
          </div>
           {msg.role === 'user' && (
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 border border-gray-700">
              <UserIcon className="w-5 h-5 text-gray-300" />
            </div>
          )}
        </div>
      ))}
       {isLoading && messages[messages.length - 1]?.role === 'user' && (
        <div className="flex items-start gap-4 message-pop-in">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 border border-gray-700">
            <BotIcon className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="max-w-xl p-3 rounded-2xl bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;