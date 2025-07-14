import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { champions } from '../data/champions.expanded';
import { strategyQuestions } from '../data/questions';
import { getChampionAnalysis } from '../services/openaiService';
import { type Champion, type StrategyQuestion, ChampionClass } from '../types/Champion';

const ChampionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [champion, setChampion] = useState<Champion | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<StrategyQuestion | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id) {
      const foundChampion = champions.find(c => c.id === id);
      setChampion(foundChampion || null);
    }
  }, [id]);

  const getClassColor = (championClass: ChampionClass): string => {
    switch (championClass) {
      case ChampionClass.COSMIC:
        return '#4A90E2';
      case ChampionClass.TECH:
        return '#50E3C2';
      case ChampionClass.MUTANT:
        return '#F5A623';
      case ChampionClass.SKILL:
        return '#D0021B';
      case ChampionClass.SCIENCE:
        return '#7ED321';
      case ChampionClass.MYSTIC:
        return '#9013FE';
      default:
        return '#666';
    }
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

  if (!champion) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Champion not found</h2>
        <Link to="/" style={{ color: '#4A90E2', textDecoration: 'none' }}>
          ← Back to Champions List
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Link to="/" style={{ 
        color: '#4A90E2', 
        textDecoration: 'none', 
        marginBottom: '20px', 
        display: 'inline-block' 
      }}>
        ← Back to Champions List
      </Link>

      <div style={{ 
        backgroundColor: '#fff', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '30px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: '0 0 15px 0', color: '#333' }}>
          {champion.name}
        </h1>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '15px' 
        }}>
          <span style={{
            backgroundColor: getClassColor(champion.class),
            color: 'white',
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 'bold',
            marginRight: '15px'
          }}>
            {champion.class}
          </span>
          <span style={{ color: '#666', fontSize: '18px' }}>
            {'★'.repeat(champion.stars)}
          </span>
        </div>
        
        <p style={{ 
          margin: '0', 
          color: '#666', 
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          {champion.description}
        </p>
      </div>

      <div style={{ 
        backgroundColor: '#fff', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>
          Strategy Questions
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '15px',
          marginBottom: '30px'
        }}>
          {strategyQuestions.map((question) => (
            <button
              key={question.id}
              onClick={() => handleQuestionSelect(question)}
              style={{
                backgroundColor: selectedQuestion?.id === question.id ? '#4A90E2' : '#f8f9fa',
                color: selectedQuestion?.id === question.id ? 'white' : '#333',
                border: '1px solid #ddd',
                borderRadius: '6px',
                padding: '15px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '14px',
                lineHeight: '1.4',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (selectedQuestion?.id !== question.id) {
                  e.currentTarget.style.backgroundColor = '#e9ecef';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedQuestion?.id !== question.id) {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                }
              }}
            >
              {question.question}
            </button>
          ))}
        </div>

        {selectedQuestion && (
          <div style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #ddd',
            borderRadius: '6px',
            padding: '20px'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
              Analysis for: {selectedQuestion.question}
            </h3>
            
            {loading && (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ 
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  border: '3px solid #f3f3f3',
                  borderTop: '3px solid #4A90E2',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}>
                </div>
                <p style={{ margin: '10px 0 0 0', color: '#666' }}>
                  Getting analysis from Gemini...
                </p>
              </div>
            )}
            
            {error && (
              <div style={{
                backgroundColor: '#f8d7da',
                border: '1px solid #f5c6cb',
                borderRadius: '4px',
                padding: '15px',
                color: '#721c24'
              }}>
                <strong>Error:</strong> {error}
              </div>
            )}
            
            {analysis && !loading && (
              <div style={{
                backgroundColor: '#d4edda',
                border: '1px solid #c3e6cb',
                borderRadius: '4px',
                padding: '15px',
                color: '#155724',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.5'
              }}>
                {analysis}
              </div>
            )}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ChampionDetail;