import React, { useState, useEffect } from 'react';
import '../css/Templates.css';

function Templates({ onCreateDocument }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateVariables, setTemplateVariables] = useState([]);
  const [variableValues, setVariableValues] = useState({});
  const [currentStep, setCurrentStep] = useState('preview'); // 'preview', 'customize'

  const categories = [
    { id: 'all', name: 'Wszystkie' },
    { id: 'business', name: 'Biznesowe' },
    { id: 'legal', name: 'Prawne' },
    { id: 'personal', name: 'Osobiste' },
    { id: 'hr', name: 'HR' },
    { id: 'marketing', name: 'Marketing' }
  ];

  const templates = [
    {
      id: 1,
      title: 'Umowa o pracę',
      description: 'Standardowa umowa o pracę zgodna z kodeksem pracy',
      category: 'legal',
      tags: ['umowa', 'praca', 'zatrudnienie'],
      popularity: 98,
      previewImage: 'employment-contract.png',
      content: `# UMOWA O PRACĘ

## Zawarta w dniu [DATA] pomiędzy:

**[NAZWA PRACODAWCY]** z siedzibą w [ADRES], reprezentowanym przez [IMIĘ I NAZWISKO], zwanym dalej "Pracodawcą"

a

**[IMIĘ I NAZWISKO PRACOWNIKA]** zamieszkałym/ą w [ADRES], PESEL: [NUMER PESEL], zwanym/ą dalej "Pracownikiem"

## § 1 Postanowienia ogólne

1. Pracodawca zatrudnia Pracownika na stanowisku [STANOWISKO].
2. Miejsce wykonywania pracy: [MIEJSCE PRACY].
3. Umowa zostaje zawarta na [OKRES/CZAS NIEOKREŚLONY].
4. Pracownik rozpoczyna pracę z dniem [DATA ROZPOCZĘCIA].

## § 2 Wynagrodzenie

1. Pracownikowi przysługuje wynagrodzenie miesięczne w wysokości [KWOTA] złotych brutto.
2. Wynagrodzenie będzie wypłacane do [DZIEŃ] dnia każdego miesiąca na rachunek bankowy Pracownika.
3. Pracownikowi przysługują dodatkowo następujące składniki wynagrodzenia: [DODATKI].

## § 3 Czas pracy

1. Pracownik będzie wykonywał pracę w pełnym wymiarze czasu pracy, tj. [LICZBA] godzin tygodniowo.
2. Godziny pracy: od [GODZINA] do [GODZINA] w dni od poniedziałku do piątku.

## § 4 Obowiązki Pracownika

1. Pracownik zobowiązuje się do sumiennego i starannego wykonywania powierzonych mu obowiązków.
2. Pracownik zobowiązuje się do przestrzegania regulaminu pracy i ustalonego porządku.
3. Pracownik zobowiązuje się do przestrzegania przepisów BHP i przeciwpożarowych.
4. Pracownik zobowiązuje się do dbania o dobro zakładu pracy i jego mienie.

## § 5 Urlop wypoczynkowy

Pracownikowi przysługuje prawo do urlopu wypoczynkowego w wymiarze i na zasadach określonych w Kodeksie pracy.

## § 6 Postanowienia końcowe

1. W sprawach nieuregulowanych niniejszą umową mają zastosowanie przepisy Kodeksu pracy i inne obowiązujące przepisy prawa.
2. Zmiany umowy wymagają formy pisemnej pod rygorem nieważności.
3. Umowę sporządzono w dwóch jednobrzmiących egzemplarzach, po jednym dla każdej ze stron.

---

**Pracodawca:**                                                **Pracownik:**

[PODPIS]                                                           [PODPIS]`
    },
    {
      id: 2,
      title: 'Umowa zlecenie',
      description: 'Umowa zlecenie dla wykonawców i freelancerów',
      category: 'legal',
      tags: ['umowa', 'zlecenie', 'freelancer'],
      popularity: 87,
      previewImage: 'contract-work.png',
      content: `# UMOWA ZLECENIE

Zawarta w dniu [DATA] w [MIEJSCE] pomiędzy:

**[NAZWA ZLECENIODAWCY]** z siedzibą w [ADRES], NIP: [NIP], reprezentowanym przez [IMIĘ I NAZWISKO], zwanym dalej "Zleceniodawcą"

a

**[IMIĘ I NAZWISKO ZLECENIOBIORCY]** zamieszkałym/ą w [ADRES], PESEL: [NUMER PESEL], zwanym/ą dalej "Zleceniobiorcą"

## § 1 Przedmiot umowy

1. Zleceniodawca zleca, a Zleceniobiorca zobowiązuje się do wykonania następującego zlecenia: [SZCZEGÓŁOWY OPIS ZLECENIA].
2. Zleceniobiorca wykona zlecenie w terminie od [DATA] do [DATA].

## § 2 Wynagrodzenie

1. Za wykonanie zlecenia Zleceniobiorcy przysługuje wynagrodzenie w wysokości [KWOTA] złotych brutto.
2. Wynagrodzenie zostanie wypłacone w terminie [LICZBA] dni od daty przedstawienia rachunku przez Zleceniobiorcę.
3. Wynagrodzenie zostanie przekazane na rachunek bankowy Zleceniobiorcy o numerze: [NUMER KONTA].

## § 3 Obowiązki Zleceniobiorcy

1. Zleceniobiorca zobowiązuje się wykonać zlecenie z należytą starannością.
2. Zleceniobiorca może powierzyć wykonanie zlecenia innej osobie tylko za zgodą Zleceniodawcy wyrażoną na piśmie.
3. Zleceniobiorca zobowiązuje się do zachowania w tajemnicy wszelkich informacji uzyskanych w związku z wykonywaniem zlecenia.

## § 4 Rozwiązanie umowy

1. Każda ze stron może wypowiedzieć umowę z zachowaniem [OKRES] okresu wypowiedzenia.
2. Zleceniodawca może rozwiązać umowę bez zachowania okresu wypowiedzenia w przypadku rażącego naruszenia przez Zleceniobiorcę postanowień niniejszej umowy.

## § 5 Postanowienia końcowe

1. W sprawach nieuregulowanych niniejszą umową mają zastosowanie przepisy Kodeksu cywilnego.
2. Wszelkie zmiany umowy wymagają formy pisemnej pod rygorem nieważności.
3. Umowę sporządzono w dwóch jednobrzmiących egzemplarzach, po jednym dla każdej ze stron.

---

**Zleceniodawca:**                                          **Zleceniobiorca:**

[PODPIS]                                                       [PODPIS]`
    },
    {
      id: 3,
      title: 'Biznes plan',
      description: 'Szablon biznes planu dla nowego przedsięwzięcia',
      category: 'business',
      tags: ['biznes', 'plan', 'przedsięwzięcie', 'startup'],
      popularity: 76,
      previewImage: 'business-plan.png',
      content: ``
    },
    {
      id: 4,
      title: 'CV chronologiczne',
      description: 'Profesjonalny szablon CV w układzie chronologicznym',
      category: 'personal',
      tags: ['cv', 'resume', 'praca', 'zatrudnienie'],
      popularity: 95,
      previewImage: 'cv-template.png',
      content: ``
    },
    {
      id: 5,
      title: 'List motywacyjny',
      description: 'Wzór listu motywacyjnego zgodny z aktualnymi standardami',
      category: 'personal',
      tags: ['list', 'motywacyjny', 'praca', 'zatrudnienie'],
      popularity: 89,
      previewImage: 'cover-letter.png',
      content: ``
    },
    {
      id: 6,
      title: 'Faktura VAT',
      description: 'Szablon faktury VAT zgodny z przepisami',
      category: 'business',
      tags: ['faktura', 'vat', 'księgowość', 'finanse'],
      popularity: 92,
      previewImage: 'invoice.png',
      content: ``
    },
    {
      id: 7,
      title: 'Umowa NDA',
      description: 'Umowa o zachowaniu poufności (Non-Disclosure Agreement)',
      category: 'legal',
      tags: ['nda', 'poufność', 'tajemnica', 'biznes'],
      popularity: 71,
      previewImage: 'nda-contract.png',
      content: ``
    },
    {
      id: 8,
      title: 'Oferta handlowa',
      description: 'Profesjonalna oferta handlowa dla klientów B2B',
      category: 'marketing',
      tags: ['oferta', 'handlowa', 'sprzedaż', 'b2b'],
      popularity: 83,
      previewImage: 'business-offer.png',
      content: ``
    },
    {
      id: 9,
      title: 'Umowa sprzedaży',
      description: 'Wzór umowy sprzedaży dla różnych rodzajów towarów',
      category: 'legal',
      tags: ['umowa', 'sprzedaż', 'kupno'],
      popularity: 78,
      previewImage: 'sales-contract.png',
      content: ``
    },
    {
      id: 10,
      title: 'Opis stanowiska pracy',
      description: 'Szablon do tworzenia opisów stanowisk pracy',
      category: 'hr',
      tags: ['hr', 'rekrutacja', 'stanowisko', 'opis'],
      popularity: 67,
      previewImage: 'job-description.png',
      content: ``
    },
    {
      id: 11,
      title: 'Plan marketingowy',
      description: 'Kompleksowy szablon planu marketingowego',
      category: 'marketing',
      tags: ['marketing', 'plan', 'strategia'],
      popularity: 75,
      previewImage: 'marketing-plan.png',
      content: ``
    },
    {
      id: 12,
      title: 'Regulamin sklepu internetowego',
      description: 'Zgodny z RODO i prawem e-commerce',
      category: 'legal',
      tags: ['regulamin', 'sklep', 'e-commerce', 'rodo'],
      popularity: 81,
      previewImage: 'shop-terms.png',
      content: ``
    }
  ];

  // Filter templates based on search and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
    setCurrentStep('preview');
    
    // Extract variables from template content
    if (template.content) {
      const variableRegex = /\[([A-ZŻŹĆĄŚĘŁÓŃ\s\/]+)\]/g;
      const matches = [...template.content.matchAll(variableRegex)];
      
      // Create unique list of variables
      const uniqueVars = [...new Set(matches.map(match => match[0]))];
      
      // Create variable objects
      const vars = uniqueVars.map(varWithBrackets => {
        const varName = varWithBrackets.replace(/[\[\]]/g, '');
        return {
          original: varWithBrackets,
          name: varName,
          placeholder: `Wprowadź ${varName.toLowerCase()}`
        };
      });
      
      setTemplateVariables(vars);
      
      // Initialize variable values
      const initialValues = {};
      vars.forEach(v => {
        initialValues[v.original] = '';
      });
      setVariableValues(initialValues);
    } else {
      setTemplateVariables([]);
      setVariableValues({});
    }
  };

  const handleVariableChange = (original, value) => {
    setVariableValues(prev => ({
      ...prev,
      [original]: value
    }));
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      if (currentStep === 'preview' && templateVariables.length > 0) {
        // Move to customization step if there are variables to fill
        setCurrentStep('customize');
      } else {
        // Apply variables and create document
        let contentWithVariables = selectedTemplate.content;
        
        // Replace variables with their values
        Object.entries(variableValues).forEach(([original, value]) => {
          if (value) {
            // Escape special regex characters in original string
            const escapedOriginal = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            contentWithVariables = contentWithVariables.replace(new RegExp(escapedOriginal, 'g'), value);
          }
        });
        
        onCreateDocument(selectedTemplate.title, contentWithVariables);
        closeModal();
      }
    }
  };

  const closeModal = () => {
    setIsPreviewOpen(false);
    setCurrentStep('preview');
    setSelectedTemplate(null);
    setTemplateVariables([]);
    setVariableValues({});
  };

  return (
    <div className="templates-page">
      <div className="templates-header">
        <h1>Szablony dokumentów</h1>
        <p>Wybierz gotowy szablon i dostosuj go do swoich potrzeb przy pomocy AI</p>
      </div>

      <div className="templates-controls">
        <div className="search-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Szukaj szablonów..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="categories-tabs">
          {categories.map(category => (
            <button 
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="templates-grid">
        {filteredTemplates.map(template => (
          <div 
            key={template.id} 
            className="template-card"
            onClick={() => handleTemplateClick(template)}
          >
            <div className="template-preview">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className="template-info">
              <h3>{template.title}</h3>
              <p>{template.description}</p>
              <div className="template-meta">
                <div className="template-tags">
                  {template.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="template-popularity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>{template.popularity}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Preview Modal */}
      {isPreviewOpen && selectedTemplate && (
        <div className="modal-backdrop">
          <div className="template-preview-modal">
            <div className="modal-header">
              <h2 className="modal-title">{selectedTemplate.title}</h2>
              <button className="close-btn" onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {currentStep === 'preview' && (
              <div className="template-preview-content">
                <div className="template-details">
                  <p>{selectedTemplate.description}</p>
                  <div className="template-tags-full">
                    {selectedTemplate.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="template-content-preview">
                  <pre>{selectedTemplate.content || 'Podgląd zawartości szablonu jest niedostępny. Zawartość zostanie wygenerowana przez AI po wybraniu szablonu.'}</pre>
                </div>
              </div>
            )}
            
            {currentStep === 'customize' && (
              <div className="template-customize-content">
                <div className="customize-instructions">
                  <p>Uzupełnij zmienne, aby dostosować szablon do swoich potrzeb:</p>
                </div>
                <div className="variables-form">
                  {templateVariables.map((variable, index) => (
                    <div key={index} className="variable-field">
                      <label htmlFor={`var-${index}`}>{variable.name}</label>
                      <input
                        id={`var-${index}`}
                        type="text"
                        className="variable-input"
                        placeholder={variable.placeholder}
                        value={variableValues[variable.original] || ''}
                        onChange={(e) => handleVariableChange(variable.original, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                <div className="template-preview-with-vars">
                  <h3>Podgląd z wprowadzonymi danymi:</h3>
                  <div className="template-content-preview">
                    <pre>
                      {selectedTemplate.content && 
                        Object.entries(variableValues).reduce(
                          (content, [original, value]) => {
                            if (!value) return content;
                            const escapedOriginal = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                            return content.replace(new RegExp(escapedOriginal, 'g'), value);
                          }, 
                          selectedTemplate.content
                        )
                      }
                    </pre>
                  </div>
                </div>
              </div>
            )}
            
            <div className="modal-footer">
              {currentStep === 'preview' ? (
                <>
                  <div className="template-ai-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <span>
                      {templateVariables.length > 0 
                        ? `Ten szablon zawiera ${templateVariables.length} zmiennych do wypełnienia.`
                        : 'Biuro AI dostosuje ten szablon do twoich potrzeb i uzupełni brakujące dane'}
                    </span>
                  </div>
                  <button className="btn btn-primary" onClick={handleUseTemplate}>
                    {templateVariables.length > 0 ? 'Dostosuj szablon' : 'Użyj tego szablonu'}
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-outline" onClick={() => setCurrentStep('preview')}>
                    Wróć
                  </button>
                  <button className="btn btn-primary" onClick={handleUseTemplate}>
                    Utwórz dokument
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Templates;