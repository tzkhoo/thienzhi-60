import { useEffect, useState } from 'react';
import { userInfo } from "@/data/user-data";
import CircularGallery from './CircularGallery';
import CountUpCard from './CountUpCard';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const awardsItems = [
    { image: "/1.png", text: "Image 1" },
    { image: "/2.png", text: "Image 2" },
    { image: "/3.png", text: "Image 3" },
    { image: "/4.png", text: "Image 4" },
    { image: "/5.png", text: "Image 5" },
    { image: "/6.png", text: "Image 6" },
    { image: "/7.png", text: "Image 7" },
    { image: "/8.png", text: "Image 8" },
    { image: "/9.png", text: "Image 9" },
  ];

  return (
    <section id="home" className="min-h-screen flex flex-col justify-between relative overflow-hidden pt-8 pb-8">
      <div className="container mx-auto px-6 text-center relative z-10 flex-grow flex flex-col justify-center">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="relative">
            <div className="relative mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight animate-title-glow animate-title-float">
                {userInfo.name}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {userInfo.summary_1}
              </p>
            </div>

            {/* Count Up Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <CountUpCard 
                end={9}
                label="Gold/Silver medals won"
                duration={2}
              />
              <CountUpCard 
                end={25}
                label="Case Comp & Hackathon Joined"
                duration={2.5}
              />
              <CountUpCard 
                end={250000}
                label="Cash Prize Awarded"
                prefix="HKD"
                duration={3}
              />
            </div>

            <div className="relative mx-auto mt-4 w-full max-w-5xl">
              <div className="h-48 md:h-56 lg:h-64">
                <CircularGallery 
                  items={awardsItems}
                  bend={0} 
                  borderRadius={0.11} 
                  autoScroll
                  autoScrollSpeed={0.03}
                  scrollEase={0.06}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mt-3 md:mt-4 px-4 sm:px-0">
              <button 
                onClick={() => window.open(userInfo.contact.linkedin, '_blank', 'noopener,noreferrer')}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-primary/25 text-sm sm:text-base"
              >
                LinkedIn
              </button>
              <button 
                className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm sm:text-base"
                onClick={() => window.open('/cv', '_blank', 'noopener,noreferrer')}
              >
                Thien Zhi's CV
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced cosmic energy field */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Pulsing energy core */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full animate-pulse blur-xl"></div>
        
        {/* Rotating energy rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-primary/20 rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-accent/15 rounded-full animate-spin-slow animation-delay-2000" style={{animationDirection: 'reverse'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-primary/10 rounded-full animate-spin-slow animation-delay-1000"></div>
        
        {/* Floating energy particles */}
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 bg-primary/40 rounded-full blur-sm animate-float-${i % 4}`}
            style={{
              left: `${30 + (i * 10)}%`,
              top: `${40 + (i % 3) * 15}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
        
        {/* Energy streaks */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-48 bg-gradient-to-t from-transparent via-primary/30 to-transparent animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-t from-transparent via-accent/20 to-transparent animate-spin-slow animation-delay-1000" style={{animationDirection: 'reverse'}}></div>
      </div>
    </section>
  );
};

export default Hero;