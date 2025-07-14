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
}

const ChampionModal: React.FC<ChampionModalProps> = ({ champion, isOpen, onClose }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<StrategyQuestion | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<number>(7);
  // const [isAwakened, setIsAwakened] = useState<boolean>(false);
  // const [signatureLevel, setSignatureLevel] = useState<number>(1);

  useEffect(() => {
    if (champion && isOpen) {
      // Set default tier to the highest available tier
      const highestTier = Math.max(...champion.availableTiers);
      setSelectedTier(highestTier);
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

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const getClassCSS = (championClass: ChampionClass): string => {
    return championClass.toLowerCase();
  };

  const handleQuestionSelect = async (question: StrategyQuestion) => {
    if (!champion) return;

    setSelectedQuestion(question);
    setLoading(true);
    setError('');
    setAnalysis('');

    try {
      const response = await getChampionAnalysis(champion.name, question.question);
      
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