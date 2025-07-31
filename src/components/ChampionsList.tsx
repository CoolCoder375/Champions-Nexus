import React, { useState, useEffect } from 'react';
import { champions } from '../data/champions.expanded';
import { type Champion, ChampionClass } from '../types/Champion';
import ChampionModal from './ChampionModal';
import '/src/css/ChampionsList.css';

const ChampionsList: React.FC = () => {
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ChampionClass>(ChampionClass.COSMIC);
  // Remove sidebar state since it's always visible on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getClassCSS = (championClass: ChampionClass): string => {
    return championClass.toLowerCase();
  };

  const handleChampionClick = (champion: Champion) => {
    setSelectedChampion(champion);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedChampion(null);
  };

  const handleClassSelect = (championClass: ChampionClass) => {
    setSelectedClass(championClass);
  };

  // Group champions by class
  const championsByClass = champions.reduce((acc, champion) => {
    if (!acc[champion.class]) {
      acc[champion.class] = [];
    }
    acc[champion.class].push(champion);
    return acc;
  }, {} as Record<ChampionClass, Champion[]>);

  // Define class order for consistent layout
  const classOrder: ChampionClass[] = [
    ChampionClass.COSMIC,
    ChampionClass.TECH,
    ChampionClass.MUTANT,
    ChampionClass.SKILL,
    ChampionClass.SCIENCE,
    ChampionClass.MYSTIC
  ];

  // Mobile view with permanent sidebar
  const renderMobileView = () => {
    return (
      <div className="mobile-layout">
        {/* Left Sidebar - Always Visible */}
        <div className="mobile-sidebar">
          <div className="sidebar-title">
            <h3>Classes</h3>
          </div>
          <div className="sidebar-classes-list">
            {classOrder.map((championClass) => (
              <button
                key={championClass}
                onClick={() => handleClassSelect(championClass)}
                className={`class-button ${getClassCSS(championClass)} ${selectedClass === championClass ? 'active' : ''}`}
              >
                <span className="class-name">{championClass}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="mobile-main-content">
          <div className="mobile-champions-grid">
            {(championsByClass[selectedClass] || []).map((champion) => (
              <div 
                key={champion.id}
                onClick={() => handleChampionClick(champion)}
                className={`mobile-champion-card ${getClassCSS(champion.class)}`}
              >
                <img 
                  src={champion.image} 
                  alt={champion.name}
                  className="mobile-champion-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="champions-container">
      <h1 className="champions-title">
        Champion's Nexus
      </h1>
      <p className="champions-subtitle">
        Your ultimate MCOC strategy hub - Click any champion for AI-powered analysis
      </p>
      
      {isMobile ? (
        renderMobileView()
      ) : (
        <div className="champions-class-grid">
          {classOrder.map((championClass) => (
            <div key={championClass} className="class-column">
              <div className={`class-header ${getClassCSS(championClass)}`}>
                <h3 className="class-title">{championClass}</h3>
              </div>
              <div className="class-champions">
                {championsByClass[championClass]?.map((champion) => (
                  <div 
                    key={champion.id}
                    onClick={() => handleChampionClick(champion)}
                    className={`champion-card ${getClassCSS(champion.class)}`}
                  >
                    <img 
                      src={champion.image} 
                      alt={champion.name}
                      className="champion-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <ChampionModal 
        champion={selectedChampion}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isMobile={isMobile}
      />
    </div>
  );
};

export default ChampionsList;