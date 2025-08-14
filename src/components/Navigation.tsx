import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeroSection, setIsHeroSection] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      const heroHeight = heroSection?.offsetHeight || 0;
      const scrollPosition = window.scrollY;
      
      setIsScrolled(scrollPosition > 50);
      setIsHeroSection(scrollPosition < heroHeight - 100);
      
      // Check which section is currently in view
      if (location.pathname === '/') {
        const sections = ['education', 'experience', 'case-comp', 'community', 'skills'];
        const scrollPosition = window.scrollY + 200; // Offset for better detection
        
        let currentSection = 'home';
        
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              currentSection = sectionId;
              break;
            }
          }
        }
        
        setActiveSection(currentSection);
      } else if (location.pathname === '/projects') {
        setActiveSection('projects');
      } else if (location.pathname === '/awards') {
        setActiveSection('awards');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call immediately to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // We're already on home page, just scroll
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };



  const handleHomeClick = () => {
    navigate('/');
    setActiveSection('home');
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const getNavItemStyle = (sectionId: string) => {
    const isActive = activeSection === sectionId || 
      (location.pathname === '/projects' && sectionId === 'projects') ||
      (location.pathname === '/awards' && sectionId === 'awards');
    
    return `text-gray-300 transition-all duration-500 ease-out transform px-3 py-1.5 rounded-full text-sm font-medium relative ${
      isActive 
        ? 'text-primary scale-105' 
        : 'hover:text-white hover:scale-105 hover:bg-primary/10'
    }`;
  };

  const getActiveIndicatorStyle = () => {
    const navItems = [
      { id: 'home', name: 'Me', width: 36 },
      { id: 'education', name: 'Education', width: 82 },
      { id: 'experience', name: 'Experience', width: 88 },
      { id: 'case-comp', name: 'Case Comp', width: 88 },
      { id: 'community', name: 'Community', width: 90 },
      { id: 'skills', name: 'Skills', width: 56 },
      { id: 'projects', name: 'Projects', width: 72 },
      { id: 'awards', name: 'Awards', width: 68 }
    ];
    
    const currentActive = location.pathname === '/projects' ? 'projects' : 
                         location.pathname === '/awards' ? 'awards' : activeSection;
    
    const activeIndex = navItems.findIndex(item => item.id === currentActive);
    
    if (activeIndex === -1) return { left: '0px', width: '0px', opacity: 0 };
    
    // Calculate cumulative position
    let leftOffset = 24; // Base padding
    for (let i = 0; i < activeIndex; i++) {
      leftOffset += navItems[i].width + 16; // width + gap
    }
    
    return {
      left: `${leftOffset}px`,
      width: `${navItems[activeIndex].width}px`,
      opacity: 1
    };
  };

  const getCurrentSectionName = () => {
    if (location.pathname === '/projects') return 'Projects';
    if (location.pathname === '/awards') return 'Awards';
    
    switch (activeSection) {
      case 'education': return 'Education';
      case 'experience': return 'Experience';
      case 'case-comp': return 'Case Comp';
      case 'community': return 'Community';
      case 'skills': return 'Skills';
      default: return 'Me';
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`hidden md:block fixed z-50 transition-all duration-500 ${
        isHeroSection 
          ? 'top-6 right-6' 
          : 'top-4 left-1/2 transform -translate-x-1/2'
      }`}>
        <div className={`transition-all duration-500 backdrop-blur-md border ${
          isHeroSection 
            ? 'w-12 h-12 rounded-full bg-slate-900/90 border-slate-700/50 shadow-2xl shadow-primary/10 flex items-center justify-center cursor-pointer group hover:w-auto hover:px-4'
            : `px-6 py-3 rounded-full ${
                isScrolled 
                  ? 'bg-slate-900/90 border-slate-700/50 shadow-2xl shadow-primary/10' 
                  : 'bg-slate-800/60 border-slate-600/30 shadow-lg'
              }`
        }`}>
          {isHeroSection ? (
            <div className="flex items-center justify-center space-x-2 overflow-hidden w-full h-full">
              <Menu className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-primary font-bold text-sm whitespace-nowrap transition-opacity duration-300">
                Menu
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-5 relative">
              {/* Sliding rounded highlight */}
              <div 
                className="absolute bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full transition-all duration-500 ease-out shadow-lg shadow-primary/25"
                style={{
                  ...getActiveIndicatorStyle(),
                  height: '36px',
                  top: '2px'
                }}
              />
              
              <button
                onClick={handleHomeClick}
                className={`text-sm transition-all duration-500 px-3 py-1.5 rounded-full relative z-10 ${
                  activeSection === 'home' 
                    ? 'text-primary font-bold' 
                    : 'text-gray-300 hover:text-white font-normal'
                }`}
              >
                Me
              </button>
              <div className="flex items-center space-x-5">
                {[
                  { name: 'Education', action: () => scrollToSection('education'), id: 'education' },
                  { name: 'Experience', action: () => scrollToSection('experience'), id: 'experience' },
                  { name: 'Case\u00A0Comp', action: () => scrollToSection('case-comp'), id: 'case-comp' },
                  { name: 'Community', action: () => scrollToSection('community'), id: 'community' },
                  { name: 'Skills', action: () => scrollToSection('skills'), id: 'skills' },
                  { name: 'Projects', action: () => navigate('/projects'), id: 'projects' },
                  { name: 'Awards', action: () => navigate('/awards'), id: 'awards' }
                ].map((item) => {
                  const isActive = activeSection === item.id || 
                    (location.pathname === '/projects' && item.id === 'projects') ||
                    (location.pathname === '/awards' && item.id === 'awards');
                  
                  return (
                    <button
                      key={item.name}
                      onClick={item.action}
                      className={`text-gray-300 transition-all duration-500 ease-out transform px-3 py-1.5 rounded-full text-sm relative z-10 ${
                        isActive 
                          ? 'text-primary font-bold scale-105' 
                          : 'hover:text-white hover:scale-105 font-normal'
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-4 right-4 z-50">
        <div className={`flex items-center space-x-3 px-4 py-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-900/90 border-slate-700/50 shadow-2xl shadow-primary/10' 
            : 'bg-slate-800/60 border-slate-600/30 shadow-lg'
        }`}>
          <span className="text-primary font-bold text-lg">{getCurrentSectionName()}</span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-xl overflow-hidden">
            <button
              onClick={() => {
                handleHomeClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-white hover:bg-primary/20 hover:text-primary transition-colors"
            >
              Me
            </button>
            {[
              { name: 'Education', action: () => scrollToSection('education') },
              { name: 'Experience', action: () => scrollToSection('experience') },
              { name: 'Case Comp', action: () => scrollToSection('case-comp') },
              { name: 'Community', action: () => scrollToSection('community') },
              { name: 'Skills', action: () => scrollToSection('skills') },
              { name: 'Projects', action: () => navigate('/projects') },
              { name: 'Awards', action: () => navigate('/awards') }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  item.action();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-white hover:bg-primary/20 hover:text-primary transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
