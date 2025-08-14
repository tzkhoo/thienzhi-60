import { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Advanced AI Agent activated! I'm Thien Zhi's personal assistant. How can I help you today?", 
      isBot: true, 
      timestamp: new Date() 
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thanks for your message! I'm currently in development. Please feel free to reach out to Thien Zhi directly through the contact methods on the website.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="relative group"
            aria-label="Open chat"
          >
            {/* Particle Effects Container */}
            <div className="absolute inset-0 overflow-visible">
              {/* Golden particles flowing from edges */}
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                    transform: `translate(${(Math.random() - 0.5) * 60}px, ${(Math.random() - 0.5) * 60}px)`
                  }}
                />
              ))}
            </div>
            
            {/* Main Button */}
            <div className="relative w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-2 border-yellow-400/60 shadow-xl hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300" style={{ animation: 'bounce 3s infinite' }}>
              {/* Golden edge glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 via-yellow-300/10 to-yellow-400/20 animate-pulse" />
              
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              {/* Periodic flash effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent transform -skew-x-12 animate-flash opacity-0" 
                   style={{ 
                     animationDuration: '5s',
                     animationIterationCount: 'infinite',
                     animationTimingFunction: 'ease-in-out'
                   }} />
            </div>
          </button>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6">
          <div className="relative w-full max-w-md h-[50vh] bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl md:rounded-2xl border-2 border-yellow-400/60 shadow-2xl shadow-yellow-400/10 overflow-hidden flex flex-col">
            {/* Golden edge effects */}
            <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 pointer-events-none" />
            
            {/* Periodic screen flash */}
            <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent transform -skew-x-12 animate-flash opacity-0 pointer-events-none"
                 style={{ 
                   animationDuration: '5s',
                   animationIterationCount: 'infinite',
                   animationTimingFunction: 'ease-in-out'
                  }} />

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 p-2 z-10 bg-slate-800/80 rounded-full"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Messages */}
            <div className="relative flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 ${msg.isBot ? 'justify-start' : 'justify-end flex-row-reverse space-x-reverse'}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.isBot 
                      ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' 
                      : 'bg-gradient-to-br from-blue-500 to-blue-700'
                  }`}>
                    {msg.isBot ? (
                      <span className="text-slate-900 font-bold text-sm">TZ</span>
                    ) : (
                      <span className="text-white font-bold text-sm">U</span>
                    )}
                  </div>
                  
                  {/* Message bubble */}
                  <div className="flex flex-col max-w-xs lg:max-w-md">
                    {/* Name */}
                    <span className={`text-xs mb-1 ${msg.isBot ? 'text-yellow-400' : 'text-blue-400'}`}>
                      {msg.isBot ? 'Thien Zhi AI' : 'You'}
                    </span>
                    
                    {/* Message content */}
                    <div
                      className={`px-4 py-3 rounded-lg ${
                        msg.isBot
                          ? 'bg-slate-700 text-white border border-yellow-400/30 rounded-tl-none'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.isBot ? 'text-gray-400' : 'text-blue-100'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="relative p-4 bg-slate-800/50 flex-shrink-0">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg border border-yellow-400/30 focus:outline-none focus:border-yellow-400 placeholder-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 flex items-center justify-center"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Floating particles around edges */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl md:rounded-2xl">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
                  style={{
                    left: i < 6 ? '0%' : '100%',
                    top: `${(i % 6) * 20}%`,
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                    transform: `translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20}px)`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;