import React, { useState, useEffect } from 'react';

function DocumentEditor({ document, onUpdateDocument, onToggleAIAssistant }) {
  const [content, setContent] = useState(document.content || '');
  const [status, setStatus] = useState(document.status);
  const [isSaving, setIsSaving] = useState(false);
  const [showAIToolbar, setShowAIToolbar] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [showAISuggestion, setShowAISuggestion] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [documentAnalytics, setDocumentAnalytics] = useState({
    wordCount: 0,
    readingTime: 0,
    sentiment: 'neutral',
    complexity: 'medium'
  });

  // Calculate document stats on content change
  useEffect(() => {
    if (content) {
      const words = content.trim().split(/\s+/).length;
      const readingTime = Math.max(1, Math.ceil(words / 200));
      
      // Update document analytics
      setDocumentAnalytics({
        wordCount: words,
        readingTime,
        sentiment: calculateSentiment(content),
        complexity: calculateComplexity(content)
      });
    } else {
      setDocumentAnalytics({
        wordCount: 0,
        readingTime: 0,
        sentiment: 'neutral',
        complexity: 'medium'
      });
    }
  }, [content]);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate saving with a delay
    setTimeout(() => {
      onUpdateDocument({
        ...document,
        content,
        status
      });
      setIsSaving(false);
    }, 800);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // Auto-save on status change
    setTimeout(() => {
      onUpdateDocument({
        ...document,
        content,
        status: newStatus
      });
    }, 400);
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText) {
      setSelectedText(selectedText);
      setShowAIToolbar(true);
    } else {
      setShowAIToolbar(false);
    }
  };

  const handleTextareaClick = () => {
    setShowAIToolbar(false);
    setShowAISuggestion(false);
  };

  const triggerAIAction = (actionType) => {
    setIsAnalyzing(true);
    setShowAIToolbar(false);
    
    // Simulate AI processing with a timeout
    setTimeout(() => {
      let result = '';
      switch(actionType) {
        case 'rephrase':
          result = simulateRephrase(selectedText);
          break;
        case 'expand':
          result = simulateExpand(selectedText);
          break;
        case 'simplify':
          result = simulateSimplify(selectedText);
          break;
        case 'translate':
          result = simulateTranslate(selectedText);
          break;
        default:
          result = selectedText;
      }
      
      setAiSuggestion({
        original: selectedText,
        suggestion: result,
        type: actionType
      });
      
      setIsAnalyzing(false);
      setShowAISuggestion(true);
    }, 1500);
  };

  const applySuggestion = () => {
    if (!aiSuggestion) return;
    
    const newContent = content.replace(aiSuggestion.original, aiSuggestion.suggestion);
    setContent(newContent);
    setShowAISuggestion(false);
  };

  const discardSuggestion = () => {
    setShowAISuggestion(false);
  };

  // Helper functions to simulate AI analysis
  const calculateSentiment = (text) => {
    const positiveWords = ['dobry', 'świetny', 'wspaniały', 'korzystny', 'pozytywny', 'zgadzać'];
    const negativeWords = ['zły', 'niekorzystny', 'negatywny', 'problem', 'trudny', 'odmówić'];
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    const words = text.toLowerCase().split(/\s+/);
    
    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) positiveScore++;
      if (negativeWords.some(nw => word.includes(nw))) negativeScore++;
    });
    
    if (positiveScore > negativeScore * 1.5) return 'positive';
    if (negativeScore > positiveScore * 1.5) return 'negative';
    return 'neutral';
  };
  
  const calculateComplexity = (text) => {
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    if (sentences.length === 0) return 'medium';
    
    const avgWordsPerSentence = text.split(/\s+/).length / sentences.length;
    
    if (avgWordsPerSentence > 20) return 'high';
    if (avgWordsPerSentence < 10) return 'low';
    return 'medium';
  };
  
  // AI Functions to simulate text transformations
  const simulateRephrase = (text) => {
    // Simple simulation of rephrasing
    const phrases = [
      'W odniesieniu do powyższego, ',
      'W kontekście omawianej kwestii, ',
      'Biorąc pod uwagę przedstawione argumenty, ',
      'Z perspektywy opisanej sytuacji, '
    ];
    
    return phrases[Math.floor(Math.random() * phrases.length)] + text.toLowerCase();
  };
  
  const simulateExpand = (text) => {
    // Simple simulation of expanding text
    return text + ' Co więcej, należy podkreślić, że powyższe stanowisko jest zgodne z obowiązującymi przepisami prawa oraz powszechnie przyjętą praktyką w tej dziedzinie. Analiza dostępnych danych wskazuje, że przyjęcie takiego rozwiązania przyniesie wymierne korzyści dla wszystkich zainteresowanych stron.';
  };
  
  const simulateSimplify = (text) => {
    // Simple simulation of simplifying text
    return text.split(/[,.;:]/).slice(0, 1).join('. ') + '.';
  };
  
  const simulateTranslate = (text) => {
    // Simulate translation to English (very basic)
    const translations = {
      'umowa': 'agreement',
      'dokument': 'document',
      'praca': 'work',
      'klient': 'client',
      'usługa': 'service',
      'płatność': 'payment'
    };
    
    let translated = text;
    Object.keys(translations).forEach(polish => {
      translated = translated.replace(new RegExp(polish, 'gi'), translations[polish]);
    });
    
    return translated;
  };

  const getSentimentIcon = () => {
    switch(documentAnalytics.sentiment) {
      case 'positive':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        );
      case 'negative':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="15" x2="16" y2="15"></line>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="12" x2="16" y2="12"></line>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        );
    }
  };

  return (
    <div className="document-editor">
      <div className="editor-header">
        <div className="editor-title-section">
          <h2 className="editor-title">{document.title}</h2>
          <div className="document-metrics">
            <div className="metric">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>{documentAnalytics.wordCount} słów</span>
            </div>
            <div className="metric">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{documentAnalytics.readingTime} min czytania</span>
            </div>
            <div className="metric">
              {getSentimentIcon()}
              <span>Ton {
                documentAnalytics.sentiment === 'positive' ? 'pozytywny' :
                documentAnalytics.sentiment === 'negative' ? 'negatywny' : 'neutralny'
              }</span>
            </div>
            <div className="metric">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 7 4 4 20 4 20 7"></polyline>
                <line x1="9" y1="20" x2="15" y2="20"></line>
                <line x1="12" y1="4" x2="12" y2="20"></line>
              </svg>
              <span>Złożoność {
                documentAnalytics.complexity === 'high' ? 'wysoka' :
                documentAnalytics.complexity === 'low' ? 'niska' : 'średnia'
              }</span>
            </div>
          </div>
        </div>
        <div className="editor-actions">
          <div className="btn btn-outline status-btn" onClick={() => handleStatusChange('draft')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>Szkic</span>
          </div>
          <div className="btn btn-outline status-btn" onClick={() => handleStatusChange('in-progress')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <span>W trakcie</span>
          </div>
          <div className="btn btn-outline status-btn" onClick={() => handleStatusChange('completed')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>Ukończony</span>
          </div>
          <div className="btn btn-outline ai-btn" onClick={onToggleAIAssistant}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>Asystent AI</span>
          </div>
          <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                  <line x1="12" y1="2" x2="12" y2="6" />
                  <line x1="12" y1="18" x2="12" y2="22" />
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                  <line x1="2" y1="12" x2="6" y2="12" />
                  <line x1="18" y1="12" x2="22" y2="12" />
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                </svg>
                <span>Zapisywanie...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                <span>Zapisz</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="editor-content-container">
        <div className="editor-content">
          <textarea
            className="editor-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onClick={handleTextareaClick}
            onMouseUp={handleTextSelection}
            placeholder="Zacznij pisać lub użyj Asystenta AI, aby wygenerować treść..."
          />
          
          {/* AI Toolbar for selected text */}
          {showAIToolbar && selectedText && (
            <div className="ai-text-toolbar">
              <div className="toolbar-title">AI narzędzia tekstu</div>
              <div className="toolbar-actions">
                <button className="toolbar-btn" onClick={() => triggerAIAction('rephrase')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                  </svg>
                  <span>Przeformułuj</span>
                </button>
                <button className="toolbar-btn" onClick={() => triggerAIAction('expand')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 18v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Rozwiń</span>
                </button>
                <button className="toolbar-btn" onClick={() => triggerAIAction('simplify')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="9" x2="20" y2="9"></line>
                    <line x1="4" y1="15" x2="20" y2="15"></line>
                    <line x1="10" y1="3" x2="8" y2="21"></line>
                    <line x1="16" y1="3" x2="14" y2="21"></line>
                  </svg>
                  <span>Uprość</span>
                </button>
                <button className="toolbar-btn" onClick={() => triggerAIAction('translate')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                  <span>Na angielski</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* AI Suggestion Panel */}
        {isAnalyzing && (
          <div className="ai-analysis-panel">
            <div className="analysis-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <span>Biuro AI analizuje tekst...</span>
            </div>
          </div>
        )}

        {showAISuggestion && aiSuggestion && (
          <div className="ai-suggestion-panel">
            <div className="suggestion-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <span>Sugestia Biuro AI</span>
              <button className="close-suggestion-btn" onClick={discardSuggestion}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="suggestion-content">
              <div className="suggestion-type">
                {aiSuggestion.type === 'rephrase' && 'Przeformułowanie'}
                {aiSuggestion.type === 'expand' && 'Rozwinięcie'}
                {aiSuggestion.type === 'simplify' && 'Uproszczenie'}
                {aiSuggestion.type === 'translate' && 'Tłumaczenie na angielski'}
              </div>
              <div className="suggestion-text">{aiSuggestion.suggestion}</div>
            </div>
            <div className="suggestion-actions">
              <button className="btn btn-outline" onClick={discardSuggestion}>Odrzuć</button>
              <button className="btn btn-primary" onClick={applySuggestion}>Zastosuj</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentEditor;