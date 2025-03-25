import React, { useState } from 'react';

function AIAssistant({ onGenerate, onClose }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationType, setGenerationType] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);

  const templates = [
    { id: 1, name: 'Umowa o pracę', description: 'Standardowa umowa o pracę zgodna z kodeksem pracy' },
    { id: 2, name: 'Umowa o dzieło', description: 'Umowa na wykonanie konkretnego dzieła lub projektu' },
    { id: 3, name: 'Faktura', description: 'Profesjonalny szablon faktury' },
    { id: 4, name: 'Oferta handlowa', description: 'Formalna oferta dla klientów biznesowych' },
    { id: 5, name: 'List motywacyjny', description: 'List motywacyjny do aplikacji o pracę' }
  ];

  const handleGenerate = async (type) => {
    setIsGenerating(true);
    setGenerationType(type);

    try {
      let prompt = '';
      
      switch (type) {
        case 'complete':
          prompt = selectedTemplate 
            ? `Wygeneruj pełną treść dokumentu typu ${selectedTemplate.name}` 
            : 'Wygeneruj pełną treść dokumentu na podstawie tytułu';
          break;
        case 'improve':
          prompt = 'Popraw i rozszerz istniejącą treść dokumentu';
          break;
        case 'summarize':
          prompt = 'Stwórz podsumowanie dokumentu';
          break;
        case 'custom':
          prompt = customPrompt;
          break;
        default:
          prompt = 'Wygeneruj treść';
      }

      const generatedContent = await onGenerate(prompt, type);
      
      // Close the assistant after success
      setTimeout(() => {
        setIsGenerating(false);
        setShowTemplates(false);
        setShowCustomPrompt(false);
        setSelectedTemplate(null);
        setCustomPrompt('');
        onClose();
      }, 500);
    } catch (error) {
      console.error('Error generating content:', error);
      setIsGenerating(false);
    }
  };

  const toggleTemplatesView = () => {
    setShowTemplates(!showTemplates);
    if (showCustomPrompt) setShowCustomPrompt(false);
  };

  const toggleCustomPromptView = () => {
    setShowCustomPrompt(!showCustomPrompt);
    if (showTemplates) setShowTemplates(false);
  };

  const selectTemplate = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="ai-assistant">
      <div className="assistant-header">
        <div className="assistant-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Asystent AI
        </div>
        <button className="close-btn" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      
      {isGenerating ? (
        <div className="loading-indicator">
          <div className="pulse-container">
            <div className="pulse-bubble pulse-bubble-1"></div>
            <div className="pulse-bubble pulse-bubble-2"></div>
            <div className="pulse-bubble pulse-bubble-3"></div>
          </div>
          <div style={{ marginLeft: '1rem' }}>
            {generationType === 'complete' && 'Generowanie pełnej treści dokumentu...'}
            {generationType === 'improve' && 'Ulepszanie treści dokumentu...'}
            {generationType === 'summarize' && 'Tworzenie podsumowania...'}
            {generationType === 'custom' && 'Przetwarzanie zapytania...'}
          </div>
        </div>
      ) : (
        <div className="assistant-content">
          {!showTemplates && !showCustomPrompt && (
            <>
              <div className="ai-option" onClick={toggleTemplatesView}>
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  Wygeneruj dokument z szablonu
                </h3>
                <p>Wybierz szablon i stwórz pełną zawartość dokumentu przy użyciu AI</p>
              </div>

              <div className="ai-option" onClick={() => handleGenerate('improve')}>
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                  Ulepsz dokument
                </h3>
                <p>Popraw istniejącą treść, rozszerz ją lub dodaj potrzebne elementy</p>
              </div>

              <div className="ai-option" onClick={() => handleGenerate('summarize')}>
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  Podsumuj dokument
                </h3>
                <p>Stwórz zwięzłe podsumowanie głównych punktów dokumentu</p>
              </div>

              <div className="ai-option" onClick={toggleCustomPromptView}>
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  Własne zapytanie
                </h3>
                <p>Napisz własne polecenie dla asystenta AI</p>
              </div>
            </>
          )}

          {showTemplates && (
            <div className="templates-view">
              <div className="view-header">
                <button className="back-btn" onClick={toggleTemplatesView}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Wróć
                </button>
                <h3>Wybierz szablon</h3>
              </div>
              
              <div className="templates-list">
                {templates.map(template => (
                  <div 
                    key={template.id} 
                    className={`template-item ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
                    onClick={() => selectTemplate(template)}
                  >
                    <h4>{template.name}</h4>
                    <p>{template.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="view-footer">
                <button 
                  className="btn btn-primary" 
                  disabled={!selectedTemplate}
                  onClick={() => handleGenerate('complete')}
                >
                  Generuj dokument
                </button>
              </div>
            </div>
          )}

          {showCustomPrompt && (
            <div className="custom-prompt-view">
              <div className="view-header">
                <button className="back-btn" onClick={toggleCustomPromptView}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Wróć
                </button>
                <h3>Własne zapytanie</h3>
              </div>
              
              <div className="custom-prompt-container">
                <textarea
                  className="custom-prompt-textarea"
                  placeholder="Np. Stwórz sekcję 'Warunki płatności' zgodną z najnowszymi przepisami..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                ></textarea>
              </div>
              
              <div className="view-footer">
                <button 
                  className="btn btn-primary" 
                  disabled={!customPrompt.trim()}
                  onClick={() => handleGenerate('custom')}
                >
                  Wykonaj
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AIAssistant;