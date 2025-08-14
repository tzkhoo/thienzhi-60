import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Advanced AI Agent activated! I'm Thien Zhi's personal assistant. How can I help you today?", 
      isBot: true, 
      timestamp: new Date() 
    }
  ]);
  const chatboxRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;
    
    const userMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage('');
    setIsLoading(true);
    
    try {
      const response = await fetch('https://wonder4.app.n8n.cloud/webhook/ad30832c-1f6b-4293-8eec-85490817e62d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage
        })
      });
      
      const data = await response.json();
      
      const botResponse = {
        id: messages.length + 2,
        text: data.response || "Sorry, I couldn't process your request. Please try again.",
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error calling webhook:', error);
      const errorResponse = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle click outside to close chatbot
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatboxRef.current && !chatboxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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
            {/* Main Button */}
            <div className="relative w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-2 border-yellow-400/60 shadow-xl hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300" style={{ animation: 'bounce 3s infinite' }}>
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6">
          <div ref={chatboxRef} className="relative w-full max-w-md h-[50vh] bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl md:rounded-2xl border-2 border-yellow-400/60 shadow-2xl shadow-yellow-400/10 overflow-hidden flex flex-col">

            {/* Header with close button */}
            <div className="relative flex justify-end p-2 flex-shrink-0">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 bg-slate-800/80 rounded-full"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="relative flex-1 overflow-y-auto px-4 pb-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 ${msg.isBot ? 'justify-start' : 'justify-end flex-row-reverse space-x-reverse'}`}
                >
                  {/* Avatar */}
                  {msg.isBot && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-yellow-400 to-yellow-600">
                      <span className="text-slate-900 font-bold text-sm">TZ</span>
                    </div>
                  )}
                  
                  {/* Message bubble */}
                  <div className={`flex flex-col max-w-xs lg:max-w-md ${msg.isBot ? '' : 'items-end'}`}>
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
                  
                  {/* User Avatar */}
                  {!msg.isBot && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-700">
                      <span className="text-white font-bold text-sm">U</span>
                    </div>
                  )}
                </div>
                ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-start space-x-3 justify-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-yellow-400 to-yellow-600">
                    <span className="text-slate-900 font-bold text-sm">TZ</span>
                  </div>
                  <div className="flex flex-col max-w-xs lg:max-w-md">
                    <span className="text-xs mb-1 text-yellow-400">Thien Zhi AI</span>
                    <div className="px-4 py-3 rounded-lg bg-slate-700 text-white border border-yellow-400/30 rounded-tl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                  disabled={isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;