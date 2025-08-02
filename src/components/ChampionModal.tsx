import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { type Champion, type StrategyQuestion, ChampionClass } from '../types/Champion';
import { strategyQuestions } from '../data/questions';
import { getChampionAnalysis } from '../services/openaiService';
import '/src/css/ChampionModal.css';

interface ChampionModalProps {
  champion: Champion | null;
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

const ChampionModal: React.FC<ChampionModalProps> = ({ champion, isOpen, onClose, isMobile = false }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<StrategyQuestion | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<number>(7);
  const [activeTab, setActiveTab] = useState<'info' | 'questions' | 'analysis'>('info');
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  // const [isAwakened, setIsAwakened] = useState<boolean>(false);
  // const [signatureLevel, setSignatureLevel] = useState<number>(1);

  useEffect(() => {
    if (champion && isOpen) {
      // Set default tier to the highest available tier
      const highestTier = Math.max(...champion.availableTiers);
      setSelectedTier(highestTier);
      // Reset question and analysis state for new champion
      setSelectedQuestion(null);
      setAnalysis('');
      setError('');
      setLoading(false);
      // Reset to info tab on mobile
      setActiveTab('info');
      // setIsAwakened(false);
      // setSignatureLevel(1);
    }
  }, [champion, isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Handle mobile back button
    const handlePopState = () => {
      if (isOpen) {
        onClose();
        // Prevent the default back navigation
        window.history.pushState(null, '', window.location.href);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      
      // Add history entry when modal opens
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const getClassCSS = (championClass: ChampionClass): string => {
    return championClass.toLowerCase();
  };

  // Swipe gesture handling for mobile tab navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    const tabs: Array<'info' | 'questions' | 'analysis'> = ['info', 'questions', 'analysis'];
    const currentIndex = tabs.indexOf(activeTab);

    // Left swipe (next tab)
    if (distance > minSwipeDistance && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }

    // Right swipe (previous tab)
    if (distance < -minSwipeDistance && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }

    // Reset touch states
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleQuestionSelect = async (question: StrategyQuestion) => {
    if (!champion) return;

    setSelectedQuestion(question);
    setLoading(true);
    setError('');
    setAnalysis('');

    if (isMobile) {
      setActiveTab('analysis');
    }

    try {
      const response = await getChampionAnalysis(champion.name, question.question, champion.class);
      
      if (response.error) {
        setError(response.error);
      } else {
        setAnalysis(response.answer);
      }
    } catch (err) {
      setError('Failed to get analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !champion) return null;

  // Mobile tabbed interface
  const renderMobileModal = () => {
    return (
      <div className="mobile-modal-backdrop" onClick={onClose}>
        <div 
          className="mobile-modal-container" 
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="mobile-modal-header">
            <button onClick={onClose} className="mobile-close-button">
              ×
            </button>
            <h2 className="mobile-modal-title">{champion.name}</h2>
          </div>

          <div className="mobile-tabs">
            <button 
              className={`mobile-tab ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              Info
            </button>
            <button 
              className={`mobile-tab ${activeTab === 'questions' ? 'active' : ''}`}
              onClick={() => setActiveTab('questions')}
            >
              Questions
            </button>
            <button 
              className={`mobile-tab ${activeTab === 'analysis' ? 'active' : ''}`}
              onClick={() => setActiveTab('analysis')}
            >
              Analysis
            </button>
          </div>

          <div className="mobile-tab-content">
            {activeTab === 'info' && (
              <div className="mobile-character-info">
                <div className={`mobile-character-image-container ${getClassCSS(champion.class)}`}>
                  <img 
                    src={champion.featured_image} 
                    alt={champion.name}
                    className="mobile-character-image"
                  />
                </div>

                <div className={`mobile-character-class-badge ${getClassCSS(champion.class)}`}>
                  {champion.class}
                </div>

                <div className="mobile-tier-selector">
                  <label className="mobile-tier-label">Tier:</label>
                  <select 
                    value={selectedTier} 
                    onChange={(e) => setSelectedTier(Number(e.target.value))}
                    className="mobile-tier-select"
                  >
                    {champion.availableTiers.map(tier => (
                      <option key={tier} value={tier}>{tier}★</option>
                    ))}
                  </select>
                </div>

                <div className="mobile-character-stats">
                  <h4 className="mobile-stats-title">Base Stats</h4>
                  {champion.stats[selectedTier] && (
                    <div className="mobile-stats-grid">
                      <div className="mobile-stat-item">
                        <span className="mobile-stat-label">Health:</span>
                        <span className="mobile-stat-value">{champion.stats[selectedTier].health.toLocaleString()}</span>
                      </div>
                      <div className="mobile-stat-item">
                        <span className="mobile-stat-label">Attack:</span>
                        <span className="mobile-stat-value">{champion.stats[selectedTier].attack.toLocaleString()}</span>
                      </div>
                      <div className="mobile-stat-item">
                        <span className="mobile-stat-label">Defense:</span>
                        <span className="mobile-stat-value">{champion.stats[selectedTier].defense.toLocaleString()}</span>
                      </div>
                      <div className="mobile-stat-item">
                        <span className="mobile-stat-label">Crit Rating:</span>
                        <span className="mobile-stat-value">{champion.stats[selectedTier].criticalRating.toLocaleString()}</span>
                      </div>
                      <div className="mobile-stat-item">
                        <span className="mobile-stat-label">Crit Damage:</span>
                        <span className="mobile-stat-value">{champion.stats[selectedTier].criticalDamageRating.toLocaleString()}</span>
                      </div>
                      <div className="mobile-stat-item">
                        <span className="mobile-stat-label">Armor:</span>
                        <span className="mobile-stat-value">{champion.stats[selectedTier].armor.toLocaleString()}</span>
                      </div>
                      <div className="mobile-stat-item">
                        <span className="mobile-stat-label">Block Prof:</span>
                        <span className="mobile-stat-value">{champion.stats[selectedTier].blockProficiency.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>

                <p className="mobile-character-description">
                  {champion.description}
                </p>
              </div>
            )}

            {activeTab === 'questions' && (
              <div className="mobile-questions">
                <div className="mobile-questions-container">
                  {strategyQuestions.map((question) => (
                    <button
                      key={question.id}
                      onClick={() => handleQuestionSelect(question)}
                      className={`mobile-question-button ${selectedQuestion?.id === question.id ? 'selected' : ''}`}
                    >
                      {question.question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analysis' && (
              <div className="mobile-answer">
                {!selectedQuestion && (
                  <div className="mobile-answer-placeholder">
                    Go to Questions tab and select a question to get AI-powered analysis
                  </div>
                )}

                {loading && (
                  <div className="mobile-answer-loading">
                    <div className="mobile-loading-spinner"></div>
                    <p className="mobile-loading-text">
                      Getting analysis from Gemini...
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mobile-answer-error">
                    <strong>Error:</strong> {error}
                  </div>
                )}

                {analysis && !loading && (
                  <div className="mobile-answer-content">
                    {analysis}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (isMobile) {
    return createPortal(renderMobileModal(), document.body);
  }

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-button">
          ×
        </button>

        {/* Left Column - Character Info */}
        <div className="modal-character-info">
          <div className={`character-image-container ${getClassCSS(champion.class)}`}>
            <img 
              src={champion.featured_image} 
              alt={champion.name}
              className="character-image"
            />
          </div>

          <h2 className="character-name">
            {champion.name}
          </h2>

          <div className={`character-class-badge ${getClassCSS(champion.class)}`}>
            {champion.class}
          </div>

          {/* Tier Selector */}
          <div className="tier-selector">
            <label className="tier-label">Tier:</label>
            <select 
              value={selectedTier} 
              onChange={(e) => setSelectedTier(Number(e.target.value))}
              className="tier-select"
            >
              {champion.availableTiers.map(tier => (
                <option key={tier} value={tier}>{tier}★</option>
              ))}
            </select>
          </div>

          {/* Stats Display */}
          <div className="character-stats">
            <h4 className="stats-title">Base Stats</h4>
            {champion.stats[selectedTier] && (
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Health:</span>
                  <span className="stat-value">{champion.stats[selectedTier].health.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Attack:</span>
                  <span className="stat-value">{champion.stats[selectedTier].attack.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Defense:</span>
                  <span className="stat-value">{champion.stats[selectedTier].defense.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Crit Rating:</span>
                  <span className="stat-value">{champion.stats[selectedTier].criticalRating.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Crit Damage:</span>
                  <span className="stat-value">{champion.stats[selectedTier].criticalDamageRating.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Armor:</span>
                  <span className="stat-value">{champion.stats[selectedTier].armor.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Block Prof:</span>
                  <span className="stat-value">{champion.stats[selectedTier].blockProficiency.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          <p className="character-description">
            {champion.description}
          </p>
        </div>

        {/* Middle Column - Questions */}
        <div className="modal-questions">
          <h3 className="questions-title">
            Strategy Questions
          </h3>

          <div className="questions-container">
            {strategyQuestions.map((question) => (
              <button
                key={question.id}
                onClick={() => handleQuestionSelect(question)}
                className={`question-button ${selectedQuestion?.id === question.id ? 'selected' : ''}`}
              >
                {question.question}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Answer */}
        <div className="modal-answer">
          <h3 className="answer-title">
            AI Analysis
          </h3>

          {!selectedQuestion && (
            <div className="answer-placeholder">
              Select a question to get AI-powered analysis
            </div>
          )}

          {loading && (
            <div className="answer-loading">
              <div className="loading-spinner"></div>
              <p className="loading-text">
                Getting analysis from Gemini...
              </p>
            </div>
          )}

          {error && (
            <div className="answer-error">
              <strong>Error:</strong> {error}
            </div>
          )}

          {analysis && !loading && (
            <div className="answer-content">
              {analysis}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ChampionModal;