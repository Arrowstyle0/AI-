import React, { useState, useRef, useEffect } from 'react';
import { Chat } from '@google/genai';
import { createChat } from './services/geminiService';
import { Message } from './types';
import Header from './components/Header';
import MessageList from './components/AnalysisResult'; // File has been repurposed to export MessageList
import MessageInput from './components/ErrorInput'; // File has been repurposed to export MessageInput

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    // Initialize the chat session when the component mounts
    chatRef.current = createChat();
    // Add a welcome message
    setMessages([{ role: 'model', parts: [{ text: "Hello! How can I help you today?" }] }]);
  }, []);
  
  const sendMessage = async (messageText: string) => {
    if (!chatRef.current) return;
    
    setIsLoading(true);
    setError(null);
    
    const userMessage: Message = { role: 'user', parts: [{ text: messageText }] };
    setMessages(prev => [...prev, userMessage]);

    try {
      const stream = await chatRef.current.sendMessageStream({ message: messageText });
      
      let modelResponse = '';
      // Add a placeholder for the model's response
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: '' }] }]);

      // Stream the response and update the last message
      for await (const chunk of stream) {
        modelResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].parts[0].text = modelResponse;
          return newMessages;
        });
      }
    } catch (err: any) {
      const errorMessage = err.message || 'An unknown error occurred.';
      setError(errorMessage);
      setMessages(prev => {
         const newMessages = [...prev];
         // Replace the placeholder with an error message
         newMessages[newMessages.length - 1] = { role: 'model', parts: [{ text: `Sorry, something went wrong: ${errorMessage}` }] };
         return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans animated-gradient">
      <Header />
      <MessageList messages={messages} isLoading={isLoading} />
      {error && (
        <div className="w-full max-w-3xl mx-auto p-2 mb-2 bg-red-900/70 border border-red-600 text-red-200 rounded-lg text-center text-sm">
          <strong>An error occurred. Please try again.</strong>
        </div>
      )}
      <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;