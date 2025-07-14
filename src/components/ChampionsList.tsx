import React, { useState } from 'react';
import { champions } from '../data/champions.expanded';
import { type Champion, ChampionClass } from '../types/Champion';
import ChampionModal from './ChampionModal';
import '/src/css/ChampionsList.css';

const ChampionsList: React.FC = () => {
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="champions-container">
      <h1 className="champions-title">
        Champion's Nexus
      </h1>
      <p className="champions-subtitle">
        Your ultimate MCOC strategy hub - Click any champion for AI-powered analysis
      </p>
      
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

      <ChampionModal 
        champion={selectedChampion}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ChampionsList;