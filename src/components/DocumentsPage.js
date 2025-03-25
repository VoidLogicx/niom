import React, { useState, useEffect } from 'react';
import { Tag, FileCheck, Sparkles } from 'lucide-react';
import { 
  FileText, Plus, Search, Filter, BrainCircuit, Zap, 
  Clock, ArrowUpRight, Download, Share2, Copy, RefreshCw,
  Users, Clipboard, BarChart2, MessageSquare, Check, 
  Trash2, Edit, Eye, Star, Upload
} from 'lucide-react';
import '../css/DocumentsPage.css'

// Komponent główny strony dokumentów
const DocumentsPage = () => {
  // Stany
  const [darkMode, setDarkMode] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreatingDoc, setIsCreatingDoc] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocType, setNewDocType] = useState('note');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);
  const [sortOrder, setSortOrder] = useState('newest');
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [showDocPreview, setShowDocPreview] = useState(false);
  
  // Mock typy dokumentów dla filtrowania
  const documentTypes = [
    { id: 'all', name: 'Wszystkie typy' },
    { id: 'contract', name: 'Umowy' },
    { id: 'report', name: 'Raporty' },
    { id: 'note', name: 'Notatki' },
    { id: 'proposal', name: 'Oferty' },
    { id: 'letter', name: 'Listy' },
    { id: 'invoice', name: 'Faktury' }
  ];
  
  // Mock statusy dokumentów
  const documentStatuses = [
    { id: 'all', name: 'Wszystkie statusy' },
    { id: 'draft', name: 'Szkic' },
    { id: 'review', name: 'Do przeglądu' },
    { id: 'approved', name: 'Zatwierdzony' },
    { id: 'published', name: 'Opublikowany' },
    { id: 'rejected', name: 'Odrzucony' },
    { id: 'archived', name: 'Zarchiwizowany' }
  ];
  
  // Ładowanie danych początkowych
  useEffect(() => {
    // Symulacja wywołania API do załadowania dokumentów
    const mockDocuments = [
      {
        id: 1,
        title: 'Umowa z klientem XYZ - v2.0',
        type: 'contract',
        status: 'approved',
        createdAt: '21.03.2025',
        lastModified: '22.03.2025',
        author: 'Jan Kowalski',
        aiGenerated: true,
        wordCount: 1850,
        views: 7,
        tags: ['umowa', 'ważne', 'klient']
      },
      {
        id: 2,
        title: 'Raport kwartalny - Q1 2025',
        type: 'report',
        status: 'review',
        createdAt: '19.03.2025',
        lastModified: '20.03.2025',
        author: 'Anna Nowak',
        aiGenerated: true,
        wordCount: 3420,
        views: 12,
        tags: ['raport', 'finanse', 'kwartalny']
      },
      {
        id: 3,
        title: 'Notatka ze spotkania strategicznego',
        type: 'note',
        status: 'draft',
        createdAt: '18.03.2025',
        lastModified: '18.03.2025',
        author: 'Piotr Wiśniewski',
        aiGenerated: false,
        wordCount: 550,
        views: 3,
        tags: ['spotkanie', 'strategia']
      },
      {
        id: 4,
        title: 'Oferta współpracy z firmą ABC',
        type: 'proposal',
        status: 'published',
        createdAt: '15.03.2025',
        lastModified: '17.03.2025',
        author: 'Jan Kowalski',
        aiGenerated: true,
        wordCount: 1250,
        views: 8,
        tags: ['oferta', 'współpraca', 'ważne']
      },
      {
        id: 5,
        title: 'Faktura VAT - marzec 2025',
        type: 'invoice',
        status: 'approved',
        createdAt: '16.03.2025',
        lastModified: '16.03.2025',
        author: 'System',
        aiGenerated: false,
        wordCount: 320,
        views: 5,
        tags: ['faktura', 'finanse']
      },
      {
        id: 6,
        title: 'List intencyjny - Projekt Innowacja',
        type: 'letter',
        status: 'published',
        createdAt: '12.03.2025',
        lastModified: '14.03.2025',
        author: 'Anna Nowak',
        aiGenerated: true,
        wordCount: 720,
        views: 9,
        tags: ['projekt', 'innowacja']
      },
      {
        id: 7,
        title: 'Raport z badań rynkowych',
        type: 'report',
        status: 'draft',
        createdAt: '10.03.2025',
        lastModified: '11.03.2025',
        author: 'Piotr Wiśniewski',
        aiGenerated: true,
        wordCount: 2800,
        views: 2,
        tags: ['badania', 'rynek', 'analiza']
      }
    ];
    
    setDocuments(mockDocuments);
    
    // Ustawienie ciemnego trybu na podstawie preferencji systemu
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);
  
  // Obsługa tworzenia dokumentu
  const handleCreateDocument = () => {
    if (isCreatingDoc && newDocTitle.trim()) {
      // Dodanie nowego dokumentu
      const newDoc = {
        id: documents.length + 1,
        title: newDocTitle,
        type: newDocType,
        status: 'draft',
        createdAt: new Date().toLocaleDateString('pl-PL'),
        lastModified: new Date().toLocaleDateString('pl-PL'),
        author: 'Jan Kowalski', // Aktualny użytkownik
        aiGenerated: false,
        wordCount: 0,
        views: 0,
        tags: []
      };
      
      setDocuments([newDoc, ...documents]);
      setNewDocTitle('');
      setNewDocType('note');
      setIsCreatingDoc(false);
    } else {
      setIsCreatingDoc(true);
    }
  };
  
  // Obsługa AI analizy dokumentu
  const handleAnalyzeWithAI = (docId) => {
    setIsAnalyzing(true);
    
    // Znajdź wybrany dokument
    const doc = documents.find(d => d.id === docId);
    setSelectedDocument(doc);
    
    // Symulacja przetwarzania AI
    setTimeout(() => {
      const analysisTypes = [
        'Analiza semantyczna',
        'Wyciąganie kluczowych informacji',
        'Analiza tonacji',
        'Analiza prawna',
        'Sprawdzanie spójności'
      ];
      
      // Generowanie animacji analizy
      const analyzeSequentially = async () => {
        for (let i = 0; i < analysisTypes.length; i++) {
          setAiInsights({
            progress: ((i + 1) / analysisTypes.length) * 100,
            currentTask: analysisTypes[i],
            completed: false
          });
          // Czekaj od 600 do 1500ms dla każdego kroku
          await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 900));
        }
        
        // Po zakończeniu analizy
        const insights = {
          summary: generateSummary(doc),
          keywords: generateKeywords(doc),
          suggestions: generateSuggestions(doc),
          sentiment: generateSentiment(doc),
          relatedDocs: findRelatedDocuments(doc, documents.filter(d => d.id !== doc.id)),
          readability: calculateReadabilityScore(doc),
          textStructure: analyzeTextStructure(doc),
          legalConsistency: doc.type === 'contract' ? analyzeLegalConsistency(doc) : null,
          completionStatus: checkCompletion(doc),
          risk: assessRiskLevel(doc)
        };
        
        setAiInsights({
          ...insights,
          progress: 100,
          currentTask: 'Analiza zakończona',
          completed: true
        });
        
        setIsAnalyzing(false);
        setShowDocPreview(true);
      };
      
      analyzeSequentially();
    }, 500);
  };
  
  // Funkcje generujące "sztuczną inteligencję"
  
  // Generowanie podsumowania dokumentu
  const generateSummary = (doc) => {
    const summaries = {
      contract: 'Umowa określa warunki współpracy między stronami, definiując zakres usług, terminy płatności oraz zobowiązania obu stron. Dokument zawiera klauzule poufności oraz warunki rozwiązania umowy.',
      report: 'Raport przedstawia analizę wyników za ostatni kwartał, pokazując wzrost przychodów o 15% w porównaniu do poprzedniego kwartału. Zawiera też prognozę na kolejny okres oraz rekomendacje dotyczące strategii rozwoju.',
      note: 'Notatka dokumentuje główne punkty omówione podczas spotkania, w tym plany strategiczne na najbliższe 6 miesięcy, przydzielone zadania oraz terminy ich realizacji.',
      proposal: 'Oferta przedstawia szczegółowy zakres współpracy, proponowane rozwiązania oraz harmonogram wdrożenia. Zawiera również informacje o kosztach i potencjalnych korzyściach dla obu stron.',
      letter: 'List wyraża zainteresowanie nawiązaniem współpracy w ramach projektu, przedstawiając wstępne założenia oraz proponowane następne kroki.',
      invoice: 'Faktura dokumentuje transakcję sprzedaży usług, zawierając szczegółowy wykaz pozycji, stawki VAT oraz terminy płatności.'
    };
    
    return summaries[doc.type] || 'Dokument zawiera istotne informacje biznesowe wymagające dalszej analizy.';
  };
  
  // Generowanie słów kluczowych
  const generateKeywords = (doc) => {
    const keywordsByType = {
      contract: ['umowa', 'współpraca', 'zobowiązania', 'terminy', 'płatności', 'poufność'],
      report: ['analiza', 'wyniki', 'kwartał', 'wzrost', 'prognozy', 'rekomendacje'],
      note: ['spotkanie', 'strategia', 'zadania', 'terminy', 'decyzje'],
      proposal: ['oferta', 'współpraca', 'rozwiązania', 'harmonogram', 'koszty', 'korzyści'],
      letter: ['list', 'zainteresowanie', 'projekt', 'współpraca', 'założenia'],
      invoice: ['faktura', 'VAT', 'płatność', 'usługi', 'termin']
    };
    
    // Połącz domyślne słowa kluczowe z tagami dokumentu
    const baseKeywords = keywordsByType[doc.type] || ['dokument', 'biznes', 'informacja'];
    const combinedKeywords = [...new Set([...baseKeywords, ...(doc.tags || [])])];
    
    // Wylosuj od 4 do 7 słów kluczowych
    const count = 4 + Math.floor(Math.random() * 4);
    const shuffled = combinedKeywords.sort(() => 0.5 - Math.random());
    
    return shuffled.slice(0, count);
  };
  
  // Generowanie sugestii
  const generateSuggestions = (doc) => {
    const commonSuggestions = [
      'Rozważ dodanie spisu treści dla lepszej nawigacji.',
      'Dokument można skrócić o około 15% bez utraty kluczowych informacji.',
      'Dodaj więcej wizualnych elementów dla lepszego zrozumienia.'
    ];
    
    const typeSpecificSuggestions = {
      contract: [
        'Sekcja dotycząca kar umownych wymaga doprecyzowania.',
        'Rozważ dodanie klauzuli o rozwiązywaniu sporów.',
        'Terminy płatności mogą być zbyt restrykcyjne dla klienta.'
      ],
      report: [
        'Dodaj więcej danych porównawczych z poprzednimi okresami.',
        'Sekcja wniosków mogłaby być bardziej rozbudowana.',
        'Rozważ dodanie analizy SWOT dla pełniejszego obrazu.'
      ],
      note: [
        'Dodaj informacje o osobach odpowiedzialnych za poszczególne zadania.',
        'Ustal konkretne terminy dla działań follow-up.',
        'Uwzględnij więcej szczegółów dotyczących dyskutowanych tematów.'
      ],
      proposal: [
        'Podkreśl mocniej unikalne korzyści oferty względem konkurencji.',
        'Dodaj więcej szczegółów dotyczących procesu implementacji.',
        'Rozważ dodanie referencji lub studiów przypadku.'
      ],
      letter: [
        'Skonkretyzuj dalsze kroki i terminy.',
        'Dodaj więcej informacji o potencjalnych korzyściach współpracy.',
        'Zakończenie listu mogłoby być bardziej bezpośrednie.'
      ],
      invoice: [
        'Upewnij się, że wszystkie pozycje mają odpowiednie opisy.',
        'Rozważ dodanie szczegółów dotyczących metod płatności.',
        'Dodaj informacje o rabatach za wcześniejszą płatność.'
      ]
    };
    
    // Wybierz sugestie specyficzne dla typu dokumentu
    const specificSuggestions = typeSpecificSuggestions[doc.type] || [];
    
    // Połącz sugestie i wybierz losowo 2-4 z nich
    const allSuggestions = [...commonSuggestions, ...specificSuggestions];
    const count = 2 + Math.floor(Math.random() * 3);
    
    return allSuggestions
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  };
  
  // Generowanie analizy tonacji
  const generateSentiment = (doc) => {
    const sentiments = [
      { label: 'Formalny', value: 75 + Math.floor(Math.random() * 20) },
      { label: 'Profesjonalny', value: 60 + Math.floor(Math.random() * 30) },
      { label: 'Pozytywny', value: 40 + Math.floor(Math.random() * 40) },
      { label: 'Przekonujący', value: 30 + Math.floor(Math.random() * 60) },
      { label: 'Techniczny', value: 20 + Math.floor(Math.random() * 70) }
    ];
    
    // Modyfikuj tonację na podstawie typu dokumentu
    const adjustedSentiments = sentiments.map(sentiment => {
      let adjustment = 0;
      
      switch (doc.type) {
        case 'contract':
          if (sentiment.label === 'Formalny') adjustment = 15;
          if (sentiment.label === 'Techniczny') adjustment = 10;
          break;
        case 'proposal':
          if (sentiment.label === 'Przekonujący') adjustment = 20;
          if (sentiment.label === 'Pozytywny') adjustment = 15;
          break;
        case 'report':
          if (sentiment.label === 'Profesjonalny') adjustment = 15;
          if (sentiment.label === 'Techniczny') adjustment = 20;
          break;
        default:
          break;
      }
      
      // Upewnij się, że wartość nie przekracza 100
      const newValue = Math.min(sentiment.value + adjustment, 99);
      return { ...sentiment, value: newValue };
    });
    
    return adjustedSentiments;
  };
  
  // Znajdowanie powiązanych dokumentów
  const findRelatedDocuments = (doc, allDocs) => {
    // Symulacja znajdowania powiązanych dokumentów
    // W prawdziwej implementacji można by użyć algortymów NLP
    
    // Znajdź dokumenty o tym samym typie
    const sameTypeDocuments = allDocs.filter(d => d.type === doc.type);
    
    // Znajdź dokumenty z podobnymi tagami
    const docsWithSimilarTags = allDocs.filter(d => {
      if (!d.tags || !doc.tags) return false;
      return d.tags.some(tag => doc.tags.includes(tag));
    });
    
    // Połącz wyniki, usuń duplikaty i ogranicz do 3 dokumentów
    const combinedResults = [...sameTypeDocuments, ...docsWithSimilarTags];
    const uniqueResults = Array.from(new Set(combinedResults.map(d => d.id)))
      .map(id => combinedResults.find(d => d.id === id));
    
    return uniqueResults.slice(0, 3);
  };
  
  // Ocena czytelności
  const calculateReadabilityScore = (doc) => {
    // Symulacja oceny czytelności
    let baseScore;
    
    switch (doc.type) {
      case 'contract':
        baseScore = 35 + Math.floor(Math.random() * 20); // Trudniejszy
        break;
      case 'report':
        baseScore = 45 + Math.floor(Math.random() * 25);
        break;
      case 'note':
        baseScore = 65 + Math.floor(Math.random() * 20); // Łatwiejszy
        break;
      case 'proposal':
        baseScore = 55 + Math.floor(Math.random() * 25);
        break;
      default:
        baseScore = 50 + Math.floor(Math.random() * 30);
    }
    
    // Dokonaj korekty na podstawie liczby słów
    if (doc.wordCount > 2000) {
      baseScore -= 10; // Dłuższe dokumenty zazwyczaj trudniejsze
    } else if (doc.wordCount < 500) {
      baseScore += 10; // Krótsze dokumenty zazwyczaj łatwiejsze
    }
    
    // Upewnij się, że wynik jest między 0 a 100
    return Math.max(0, Math.min(100, baseScore));
  };
  
  // Analiza struktury tekstu
  const analyzeTextStructure = (doc) => {
    // Symulacja analizy struktury
    const structureElements = [
      { type: 'Nagłówki', count: Math.ceil(doc.wordCount / 400) },
      { type: 'Akapity', count: Math.ceil(doc.wordCount / 100) },
      { type: 'Listy', count: Math.floor(doc.wordCount / 500) },
      { type: 'Tabele', count: Math.floor(doc.wordCount / 800) },
      { type: 'Grafiki', count: Math.floor(doc.wordCount / 1000) }
    ];
    
    // Modyfikacje na podstawie typu dokumentu
    if (doc.type === 'report') {
      structureElements.find(el => el.type === 'Tabele').count += 2;
      structureElements.find(el => el.type === 'Grafiki').count += 3;
    } else if (doc.type === 'contract') {
      structureElements.find(el => el.type === 'Listy').count += 2;
    }
    
    return structureElements;
  };
  
  // Analiza spójności prawnej (dla umów)
  const analyzeLegalConsistency = (doc) => {
    return {
      overallConsistency: 75 + Math.floor(Math.random() * 20),
      potentialIssues: [
        'Niespójne użycie terminów w sekcji 3.2 i 5.1.',
        'Brak jasnego określenia jurysdykcji w przypadku sporów.',
        'Niejasne warunki dotyczące wypowiedzenia umowy.'
      ].sort(() => 0.5 - Math.random()).slice(0, 1 + Math.floor(Math.random() * 2))
    };
  };
  
  // Sprawdzenie kompletności dokumentu
  const checkCompletion = (doc) => {
    // Symulacja sprawdzania kompletności
    const requiredSections = {
      contract: ['Strony umowy', 'Przedmiot umowy', 'Warunki płatności', 'Okres obowiązywania', 'Podpisy'],
      report: ['Wprowadzenie', 'Metodologia', 'Wyniki', 'Wnioski', 'Rekomendacje'],
      proposal: ['Streszczenie', 'Rozwiązanie', 'Harmonogram', 'Koszty', 'O firmie'],
      note: ['Data i miejsce', 'Uczestnicy', 'Omówione tematy', 'Wnioski', 'Następne kroki'],
      invoice: ['Dane sprzedawcy', 'Dane nabywcy', 'Pozycje', 'Kwota', 'Termin płatności'],
      letter: ['Nagłówek', 'Treść główna', 'Zakończenie', 'Podpis']
    }[doc.type] || ['Wprowadzenie', 'Treść główna', 'Zakończenie'];
    
    // Losowo oznacz niektóre sekcje jako brakujące lub niekompletne
    const completionStatus = requiredSections.map(section => {
      const rand = Math.random();
      if (rand > 0.8) {
        return { section, status: 'missing', message: 'Brakująca sekcja' };
      } else if (rand > 0.6) {
        return { section, status: 'incomplete', message: 'Wymaga uzupełnienia' };
      } else {
        return { section, status: 'complete', message: 'Kompletna' };
      }
    });
    
    return {
      completionPercentage: Math.floor(completionStatus.filter(s => s.status === 'complete').length / completionStatus.length * 100),
      sections: completionStatus
    };
  };
  
  // Ocena poziomu ryzyka dokumentu
  const assessRiskLevel = (doc) => {
    // Symulacja oceny ryzyka - przydatne szczególnie dla umów
    let baseRisk;
    
    switch (doc.type) {
      case 'contract':
        baseRisk = { level: 'Średnie', score: 40 + Math.floor(Math.random() * 30) };
        break;
      case 'report':
        baseRisk = { level: 'Niskie', score: 10 + Math.floor(Math.random() * 30) };
        break;
      case 'proposal':
        baseRisk = { level: 'Niskie', score: 20 + Math.floor(Math.random() * 20) };
        break;
      default:
        baseRisk = { level: 'Bardzo niskie', score: 5 + Math.floor(Math.random() * 15) };
    }
    
    // Dostosuj poziom na podstawie wyniku punktowego
    if (baseRisk.score > 60) {
      baseRisk.level = 'Wysokie';
    } else if (baseRisk.score > 40) {
      baseRisk.level = 'Średnie';
    } else if (baseRisk.score > 20) {
      baseRisk.level = 'Niskie';
    } else {
      baseRisk.level = 'Bardzo niskie';
    }
    
    // Dodaj potencjalne kwestie ryzyka
    const potentialRiskFactors = {
      contract: [
        'Niejasne warunki odpowiedzialności',
        'Brak klauzuli o poufności',
        'Niewłaściwe określenie jurysdykcji',
        'Niejednoznaczne warunki rozwiązania umowy',
        'Problematyczne warunki płatności'
      ],
      report: [
        'Nieaktualne dane',
        'Niekompletna analiza konkurencji',
        'Brak źródeł dla kluczowych twierdzeń',
        'Zbyt optymistyczne prognozy'
      ],
      proposal: [
        'Nierealistyczny harmonogram',
        'Niejasne określenie zakresu prac',
        'Potencjalne przekroczenie budżetu',
        'Brak jasnych kryteriów sukcesu'
      ]
    }[doc.type] || [
      'Niedostateczna szczegółowość',
      'Potencjalne problemy z interpretacją',
      'Brak ważnych informacji'
    ];
    
    // Losowo wybierz 0-2 czynników ryzyka
    const numFactors = baseRisk.score > 30 ? (1 + Math.floor(Math.random() * 2)) : 0;
    const selectedFactors = potentialRiskFactors
      .sort(() => 0.5 - Math.random())
      .slice(0, numFactors);
    
    return {
      risk: baseRisk,
      factors: selectedFactors
    };
  };
  
  // Filtrowanie dokumentów na podstawie wyszukiwania i filtrów
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesType = selectedDocType === 'all' || doc.type === selectedDocType;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Sortowanie dokumentów
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    const dateA = new Date(a.lastModified.split('.').reverse().join('-'));
    const dateB = new Date(b.lastModified.split('.').reverse().join('-'));
    
    switch (sortOrder) {
      case 'newest':
        return dateB - dateA;
      case 'oldest':
        return dateA - dateB;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return dateB - dateA;
    }
  });
  
  // Obsługa usuwania dokumentu
  const handleDeleteDocument = (docId) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten dokument?')) {
      setDocuments(documents.filter(doc => doc.id !== docId));
      if (selectedDocument && selectedDocument.id === docId) {
        setSelectedDocument(null);
        setShowDocPreview(false);
      }
    }
  };
  
  // Obsługa zaznaczania dokumentów do działań zbiorczych
  const handleSelectDocument = (docId) => {
    if (selectedDocs.includes(docId)) {
      setSelectedDocs(selectedDocs.filter(id => id !== docId));
    } else {
      setSelectedDocs([...selectedDocs, docId]);
    }
  };
  
  // Obsługa działań zbiorczych
  const handleBulkAction = (action) => {
    if (selectedDocs.length === 0) {
      alert('Nie wybrano żadnych dokumentów');
      return;
    }
    
    switch (action) {
      case 'delete':
        if (window.confirm(`Czy na pewno chcesz usunąć ${selectedDocs.length} wybranych dokumentów?`)) {
          setDocuments(documents.filter(doc => !selectedDocs.includes(doc.id)));
          setSelectedDocs([]);
        }
        break;
      case 'tag':
        const tag = prompt('Podaj tag, który chcesz dodać do wybranych dokumentów:');
        if (tag && tag.trim()) {
          setDocuments(documents.map(doc => {
            if (selectedDocs.includes(doc.id)) {
              const updatedTags = [...(doc.tags || [])];
              if (!updatedTags.includes(tag.trim())) {
                updatedTags.push(tag.trim());
              }
              return { ...doc, tags: updatedTags };
            }
            return doc;
          }));
          setSelectedDocs([]);
        }
        break;
      case 'analyze':
        alert(`Analiza zbiorcza dla ${selectedDocs.length} dokumentów rozpoczęta.`);
        // Tutaj można by dodać bardziej rozbudowaną funkcjonalność analizy zbiorczej
        setTimeout(() => {
          alert('Analiza zbiorcza zakończona. Wyniki dostępne w sekcji raportów.');
        }, 2000);
        setSelectedDocs([]);
        break;
      default:
        break;
    }
  };
  
  // Renderowanie statusu dokumentu
  const renderStatus = (status) => {
    const statusStyles = {
      draft: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300' },
      review: { bg: 'bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-30', text: 'text-yellow-800 dark:text-yellow-300' },
      approved: { bg: 'bg-green-100 dark:bg-green-900 dark:bg-opacity-30', text: 'text-green-800 dark:text-green-300' },
      published: { bg: 'bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30', text: 'text-blue-800 dark:text-blue-300' },
      rejected: { bg: 'bg-red-100 dark:bg-red-900 dark:bg-opacity-30', text: 'text-red-800 dark:text-red-300' },
      archived: { bg: 'bg-purple-100 dark:bg-purple-900 dark:bg-opacity-30', text: 'text-purple-800 dark:text-purple-300' }
    };
    
    const style = statusStyles[status] || statusStyles.draft;
    const statusName = documentStatuses.find(s => s.id === status)?.name || status;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${style.bg} ${style.text}`}>
        {statusName}
      </span>
    );
  };
  
  // Renderowanie typu dokumentu
  const renderDocumentType = (type) => {
    const docType = documentTypes.find(t => t.id === type);
    return docType ? docType.name.replace('Wszystkie ', '') : type;
  };
  
  // Renderowanie tagów dokumentu
  const renderTags = (tags) => {
    if (!tags || tags.length === 0) return null;
    
    return (
      <div className="flex flex-wrap gap-1 mt-1">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
    );
  };
  
  // Renderowanie wskaźnika postępu analizy AI
  const renderAnalysisProgress = () => {
    if (!aiInsights) return null;
    
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm">{aiInsights.currentTask}</span>
          <span className="text-sm">{Math.round(aiInsights.progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${aiInsights.progress}%` }}
          ></div>
        </div>
      </div>
    );
  };
  
  // Renderowanie wykresu tonacji
  const renderSentimentChart = () => {
    if (!aiInsights || !aiInsights.sentiment) return null;
    
    return (
      <div className="space-y-2">
        {aiInsights.sentiment.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Renderowanie kompletności dokumentu
  const renderCompletionStatus = () => {
    if (!aiInsights || !aiInsights.completionStatus) return null;
    
    const { completionPercentage, sections } = aiInsights.completionStatus;
    
    return (
      <div>
        <div className="flex justify-between items-center mb-1">
          <span>Kompletność dokumentu:</span>
          <span className={`font-medium ${
            completionPercentage > 80 ? 'text-green-500' : 
            completionPercentage > 50 ? 'text-yellow-500' : 
            'text-red-500'
          }`}>{completionPercentage}%</span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
          <div 
            className={`h-2 rounded-full ${
              completionPercentage > 80 ? 'bg-green-500' : 
              completionPercentage > 50 ? 'bg-yellow-500' : 
              'bg-red-500'
            }`}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        
        <div className="space-y-2 mt-2">
          {sections.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                item.status === 'complete' ? 'bg-green-500' : 
                item.status === 'incomplete' ? 'bg-yellow-500' : 
                'bg-red-500'
              }`}></div>
              <span className="text-sm">{item.section}</span>
              <span className="text-xs ml-auto text-gray-500">{item.message}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Renderowanie oceny ryzyka
  const renderRiskAssessment = () => {
    if (!aiInsights || !aiInsights.risk) return null;
    
    const { risk, factors } = aiInsights.risk;
    
    const riskColor = 
      risk.level === 'Wysokie' ? 'text-red-500' : 
      risk.level === 'Średnie' ? 'text-yellow-500' : 
      'text-green-500';
    
    return (
      <div>
        <div className="flex justify-between items-center">
          <span>Poziom ryzyka:</span>
          <span className={`font-medium ${riskColor}`}>{risk.level}</span>
        </div>
        
        {factors && factors.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium mb-1">Potencjalne czynniki ryzyka:</p>
            <ul className="text-sm space-y-1">
              {factors.map((factor, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Nagłówek strony */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FileText size={24} className="text-blue-500 mr-2" />
              <h1 className="text-xl font-bold">Dokumenty AI</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                {darkMode ? '🌞' : '🌙'}
              </button>
              
              <div className="flex items-center">
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  JK
                </div>
                <span className="ml-2">Jan Kowalski</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Główna treść */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tytuł strony i akcje */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <h2 className="text-2xl font-semibold">Zarządzanie dokumentami</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCreateDocument()}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white`}
            >
              <Plus size={16} />
              <span>Nowy dokument</span>
            </button>
            
            <button
              onClick={() => setShowBulkActions(!showBulkActions)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                darkMode ? 
                (showBulkActions ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600') : 
                (showBulkActions ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100')
              }`}
            >
              <FileText size={16} />
              <span>Działania zbiorowe</span>
            </button>
            
            <button
              onClick={() => alert('Implementacja ładowania dokumentów')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                darkMode ? 
                'bg-gray-700 text-white hover:bg-gray-600' : 
                'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              <Upload size={16} />
              <span>Importuj</span>
            </button>
          </div>
        </div>
        
        {/* Formularz tworzenia dokumentu */}
        {isCreatingDoc && (
          <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <h3 className="font-semibold mb-4">Utwórz nowy dokument</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tytuł dokumentu</label>
                <input
                  type="text"
                  placeholder="Wprowadź tytuł dokumentu"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Typ dokumentu</label>
                <select
                  value={newDocType}
                  onChange={(e) => setNewDocType(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                >
                  {documentTypes.filter(t => t.id !== 'all').map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsCreatingDoc(false)}
                  className={`px-4 py-2 rounded-lg ${
                    darkMode ? 
                    'bg-gray-700 text-white hover:bg-gray-600' : 
                    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  Anuluj
                </button>
                <button
                  onClick={handleCreateDocument}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  disabled={!newDocTitle.trim()}
                >
                  Utwórz
                </button>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mt-2">lub skorzystaj z szablonów AI:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                  <button
                    className={`p-3 rounded-lg flex items-center gap-2 ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => {
                      setNewDocTitle('Umowa o współpracy - AI');
                      setNewDocType('contract');
                    }}
                  >
                    <Zap size={16} className="text-purple-500" />
                    <span>Umowa o współpracy</span>
                  </button>
                  <button
                    className={`p-3 rounded-lg flex items-center gap-2 ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => {
                      setNewDocTitle('Raport miesięczny - AI');
                      setNewDocType('report');
                    }}
                  >
                    <Zap size={16} className="text-purple-500" />
                    <span>Raport miesięczny</span>
                  </button>
                  <button
                    className={`p-3 rounded-lg flex items-center gap-2 ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => {
                      setNewDocTitle('Oferta handlowa - AI');
                      setNewDocType('proposal');
                    }}
                  >
                    <Zap size={16} className="text-purple-500" />
                    <span>Oferta handlowa</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Akcje zbiorcze */}
        {showBulkActions && (
          <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Działania zbiorowe</h3>
              <span className="text-sm">{selectedDocs.length} wybranych dokumentów</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleBulkAction('delete')}
                disabled={selectedDocs.length === 0}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  selectedDocs.length === 0 ? 'opacity-50 cursor-not-allowed ' : ''
                } ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
              >
                <Trash2 size={16} />
                <span>Usuń wybrane</span>
              </button>
              
              <button
                onClick={() => handleBulkAction('tag')}
                disabled={selectedDocs.length === 0}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  selectedDocs.length === 0 ? 'opacity-50 cursor-not-allowed ' : ''
                } ${
                  darkMode ? 
                  'bg-gray-700 text-white hover:bg-gray-600' : 
                  'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                <Tag size={16} />
                <span>Dodaj tag</span>
              </button>
              
              <button
                onClick={() => handleBulkAction('analyze')}
                disabled={selectedDocs.length === 0}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  selectedDocs.length === 0 ? 'opacity-50 cursor-not-allowed ' : ''
                } ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white`}
              >
                <BrainCircuit size={16} />
                <span>Analiza AI</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Wyszukiwanie i filtry */}
        <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
            {/* Pole wyszukiwania */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Szukaj w dokumentach..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-9 pr-3 py-2 border rounded-lg w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            
            {/* Przycisk filtrów */}
            <button 
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                darkMode ? 
                (showFilters ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600') : 
                (showFilters ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100')
              }`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              <span>Filtry</span>
            </button>
            
            {/* Przycisk sortowania */}
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={`pl-3 pr-8 py-2 border rounded-lg appearance-none ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              >
                <option value="newest">Najnowsze</option>
                <option value="oldest">Najstarsze</option>
                <option value="alphabetical">Alfabetycznie</option>
                <option value="type">Typ dokumentu</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Rozwinięte filtry */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Typ dokumentu</label>
                  <select
                    value={selectedDocType}
                    onChange={(e) => setSelectedDocType(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  >
                    {documentTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  >
                    {documentStatuses.map(status => (
                      <option key={status.id} value={status.id}>{status.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Autor</label>
                  <select
                    className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  >
                    <option value="all">Wszyscy autorzy</option>
                    <option value="me">Tylko moje</option>
                    <option value="ai">Wygenerowane przez AI</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2">
                <button 
                  className={`px-3 py-1.5 rounded ${
                    darkMode ? 
                    'bg-gray-700 text-white hover:bg-gray-600' : 
                    'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedDocType('all');
                    setSelectedStatus('all');
                  }}
                >
                  Wyczyść filtry
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Główna siatka treści */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lewy panel - lista dokumentów */}
          <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Twoje dokumenty</h3>
              <span className="text-sm text-gray-500">
                {filteredDocuments.length} {filteredDocuments.length === 1 ? 'dokument' : 
                 filteredDocuments.length < 5 ? 'dokumenty' : 'dokumentów'}
              </span>
            </div>
            
            {sortedDocuments.length > 0 ? (
              <div className="space-y-3">
                {sortedDocuments.map(doc => (
                  <div 
                    key={doc.id} 
                    className={`p-4 rounded-lg cursor-pointer border ${
                      selectedDocument && selectedDocument.id === doc.id ? 
                      'border-blue-500' : 
                      darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleAnalyzeWithAI(doc.id)}
                  >
                    <div className="flex items-start">
                      {showBulkActions && (
                        <div className="mt-1 mr-3">
                          <input 
                            type="checkbox" 
                            checked={selectedDocs.includes(doc.id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleSelectDocument(doc.id);
                            }}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </div>
                      )}
                      
                      <div className="flex-grow">
                        <div className="flex items-center mb-1">
                          <FileText size={18} className="mr-2 text-blue-500 flex-shrink-0" />
                          <h4 className="font-medium">{doc.title}</h4>
                          {doc.aiGenerated && (
                            <span className="ml-2 px-1.5 py-0.5 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-30 dark:text-purple-300 rounded">
                              AI
                            </span>
                          )}
                        </div>
                        
                        <div className="text-sm text-gray-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="flex items-center">
                            <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300">
                              {renderDocumentType(doc.type)}
                            </span>
                          </span>
                          <span>{renderStatus(doc.status)}</span>
                          <span>Zmodyfikowano: {doc.lastModified}</span>
                        </div>
                        
                        {renderTags(doc.tags)}
                      </div>
                      
                      <div className="flex space-x-1 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Edycja dokumentu: ${doc.title}`);
                          }}
                          className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteDocument(doc.id);
                          }}
                          className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <FileText size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">Nie znaleziono dokumentów</h3>
                <p className="text-gray-500 mb-4">Tworzenie nowego dokumentu lub zmień filry wyszukiwania</p>
                <button
                  onClick={() => handleCreateDocument()}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Utwórz nowy dokument
                </button>
              </div>
            )}
          </div>
          
          {/* Prawy panel - podgląd dokumentu lub analiza */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
            {isAnalyzing ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold flex items-center">
                    <BrainCircuit size={18} className="mr-2 text-blue-500" />
                    Analiza dokumentu AI
                  </h3>
                </div>
                
                {renderAnalysisProgress()}
                
                {selectedDocument && (
                  <div className="mb-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                    <h4 className="font-medium mb-1">{selectedDocument.title}</h4>
                    <div className="text-sm text-gray-500">
                      <p>Typ: {renderDocumentType(selectedDocument.type)}</p>
                      <p>Status: {documentStatuses.find(s => s.id === selectedDocument.status)?.name}</p>
                      <p>Liczba słów: {selectedDocument.wordCount}</p>
                    </div>
                  </div>
                )}
                
                {!aiInsights?.completed ? (
                  <div className="text-center py-6">
                    <div className="animate-pulse flex flex-col items-center justify-center">
                      <div className="rounded-full bg-blue-400 dark:bg-blue-600 h-12 w-12 flex items-center justify-center mb-4">
                        <BrainCircuit size={24} className="text-white" />
                      </div>
                      <p>AI analizuje twój dokument...</p>
                      <p className="text-sm text-gray-500 mt-1">To zajmie tylko chwilę</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-medium mb-3">Wyniki analizy AI</h4>
                    
                    <div className="space-y-6">
                      {/* Podsumowanie */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 mb-2">Podsumowanie</h5>
                        <p className="text-sm">{aiInsights.summary}</p>
                      </div>
                      
                      {/* Słowa kluczowe */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 mb-2">Słowa kluczowe</h5>
                        <div className="flex flex-wrap gap-2">
                          {aiInsights.keywords.map((keyword, index) => (
                            <span 
                              key={index} 
                              className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300 rounded-full"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Tonacja */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 mb-2">Analiza tonacji</h5>
                        {renderSentimentChart()}
                      </div>
                      
                      {/* Czytelność */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 mb-2">Czytelność</h5>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Wynik</span>
                          <span className="text-sm font-medium">{aiInsights.readability}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                          <div 
                            className={`h-2 rounded-full ${
                              aiInsights.readability > 70 ? 'bg-green-500' : 
                              aiInsights.readability > 40 ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`}
                            style={{ width: `${aiInsights.readability}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500">
                          {aiInsights.readability > 70 ? 'Bardzo dobra czytelność' : 
                           aiInsights.readability > 40 ? 'Średnia czytelność' : 
                           'Niska czytelność - rozważ uproszczenie'}
                        </p>
                      </div>
                      
                      {/* Sugestie */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 mb-2">Sugestie usprawnień</h5>
                        <div className="space-y-2">
                          {aiInsights.suggestions.map((suggestion, index) => (
                            <div 
                              key={index} 
                              className="p-2 text-sm rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-20 dark:border-yellow-900 dark:text-yellow-200"
                            >
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Kompletność */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 mb-2">Kompletność dokumentu</h5>
                        {renderCompletionStatus()}
                      </div>
                      
                      {/* Ocena ryzyka */}
                      {selectedDocument && selectedDocument.type === 'contract' && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-500 mb-2">Ocena ryzyka</h5>
                          {renderRiskAssessment()}
                        </div>
                      )}
                      
                      {/* Powiązane dokumenty */}
                      {aiInsights.relatedDocs && aiInsights.relatedDocs.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-500 mb-2">Powiązane dokumenty</h5>
                          <div className="space-y-2">
                            {aiInsights.relatedDocs.map(doc => (
                              <div 
                                key={doc.id} 
                                className={`p-2 rounded-lg cursor-pointer border ${
                                  darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
                                }`}
                                onClick={() => handleAnalyzeWithAI(doc.id)}
                              >
                                <div className="flex items-center">
                                  <FileText size={14} className="mr-2 text-blue-500" />
                                  <span className="text-sm font-medium">{doc.title}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t dark:border-gray-700">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            alert('Implementacja eksportu analizy do PDF');
                          }}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded ${
                            darkMode ? 
                            'bg-gray-700 text-white hover:bg-gray-600' : 
                            'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <Download size={14} />
                          <span className="text-sm">Eksportuj</span>
                        </button>
                        <button
                          onClick={() => {
                            alert('Implementacja udostępniania analizy');
                          }}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded ${
                            darkMode ? 
                            'bg-gray-700 text-white hover:bg-gray-600' : 
                            'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <Share2 size={14} />
                          <span className="text-sm">Udostępnij</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowDocPreview(false);
                            setSelectedDocument(null);
                            setAiInsights(null);
                          }}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded ${
                            darkMode ? 
                            'bg-blue-600 text-white hover:bg-blue-700' : 
                            'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          <RefreshCw size={14} />
                          <span className="text-sm">Nowa analiza</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center py-10">
                <div className="w-20 h-20 mb-4 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30 rounded-full flex items-center justify-center">
                  <BrainCircuit size={32} className="text-blue-500" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-center">Analiza dokumentów AI</h3>
                <p className="text-sm text-gray-500 text-center mb-6 max-w-xs">
                  Wybierz dokument z listy, aby rozpocząć analizę AI i uzyskać cenne spostrzeżenia.
                </p>
                <div className="space-y-3 w-full max-w-xs">
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Search size={16} className="text-blue-500" />
                      <span className="font-medium">Analiza semantyczna</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      AI zidentyfikuje główne tematy i słowa kluczowe w dokumencie.
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <FileCheck size={16} className="text-green-500" />
                      <span className="font-medium">Ocena jakości i ryzyka</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Sprawdź kompletność dokumentu i potencjalne ryzyka.
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={16} className="text-yellow-500" />
                      <span className="font-medium">Sugestie usprawnień</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Otrzymaj propozycje zmian, które poprawią jakość dokumentu.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentsPage;