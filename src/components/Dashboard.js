import React, { useState, useEffect } from 'react';
import { 
  FileText, BarChart2, Users, Clock, ChevronRight, Search, 
  ArrowUp, ArrowDown, Edit, Eye, Download, Trash, Settings,
  Plus, Calendar, Mail, CheckCircle, FileCheck, Zap, 
  Brain, BarChart, LineChart, PieChart, Activity, Sparkles,
  MessageSquare, Check, X, AlertTriangle, HelpCircle, BookOpen,
  Share, FileSearch, Tool, PenTool, Save, Send, Printer,
  Paperclip, Mic, Copy, Database, Lock, Loader, ExternalLink
} from 'lucide-react';
import '../css/dashboard.css';

const Dashboard = ({ documents, onOpenDocument, onCreateDocument }) => {
  // States for statistics and data display
  const [stats, setStats] = useState({
    documentsTotal: 0,
    documentsDraft: 0,
    documentsInProgress: 0,
    documentsCompleted: 0,
    aiGenerated: 0,
    aiSuggestionsApplied: 0,
    timeSaved: 0
  });

  const [activityData, setActivityData] = useState([]);
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [usageData, setUsageData] = useState({
    documentsUsed: 65,
    aiCredits: 42,
    storage: 28,
    team: 70
  });
  
  // Interactive states
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAiHelp, setShowAiHelp] = useState(false);
  const [aiHelpPrompt, setAiHelpPrompt] = useState('');
  const [aiHelpResponse, setAiHelpResponse] = useState('');
  const [aiInsights, setAiInsights] = useState([]);
  const [documentBeingAnalyzed, setDocumentBeingAnalyzed] = useState(null);
  const [showAnalysisResult, setShowAnalysisResult] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeSuggestions, setActiveSuggestions] = useState([]);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [newDocumentTitle, setNewDocumentTitle] = useState('');
  const [documentTemplates, setDocumentTemplates] = useState([
    { id: 1, title: 'Umowa o pracę', icon: 'FileText' },
    { id: 2, title: 'Oferta handlowa', icon: 'FileCheck' },
    { id: 3, title: 'Raport kwartalny', icon: 'BarChart' },
    { id: 4, title: 'Notatka ze spotkania', icon: 'BookOpen' },
    { id: 5, title: 'Prezentacja firmowa', icon: 'PieChart' },
    { id: 6, title: 'Dokument pusty', icon: 'FileText' }
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  useEffect(() => {
    // Calculate stats based on documents
    if (Array.isArray(documents)) {
      const total = documents.length;
      const draft = documents.filter(doc => doc.status === 'draft').length;
      const inProgress = documents.filter(doc => doc.status === 'in-progress').length;
      const completed = documents.filter(doc => doc.status === 'completed').length;
      
      // Count AI generated docs (just a simulation for now)
      const aiGenerated = Math.floor(total * 0.6);
      
      setStats({
        documentsTotal: total,
        documentsDraft: draft,
        documentsInProgress: inProgress,
        documentsCompleted: completed,
        aiGenerated: aiGenerated,
        aiSuggestionsApplied: 24,
        timeSaved: 18
      });
      
      // Set recent documents
      setRecentDocuments(documents.slice(0, 5));
    }
    
    // Generate mock activity data
    const mockActivity = [
      {
        id: 1,
        type: 'edit',
        title: 'Raport kwartalny',
        user: 'Jan Kowalski',
        time: '10 minut temu'
      },
      {
        id: 2,
        type: 'create',
        title: 'Umowa z klientem ABC',
        user: 'Anna Nowak',
        time: '1 godzinę temu'
      },
      {
        id: 3,
        type: 'ai',
        title: 'Oferta handlowa',
        user: 'Asystent AI',
        time: '2 godziny temu'
      },
      {
        id: 4,
        type: 'comment',
        title: 'Notatka ze spotkania',
        user: 'Piotr Wiśniewski',
        time: '3 godziny temu'
      },
      {
        id: 5,
        type: 'complete',
        title: 'Propozycja współpracy',
        user: 'Jan Kowalski',
        time: '5 godzin temu'
      }
    ];
    setActivityData(mockActivity);
    
    // Generate mock AI suggestions
    const mockSuggestions = [
      {
        id: 1,
        title: 'Dokończ raport kwartalny',
        text: 'Wygląda na to, że masz niedokończony raport kwartalny. Mogę pomóc Ci go dokończyć na podstawie poprzednich danych.',
        action: 'complete_report',
        status: 'active'
      },
      {
        id: 2,
        title: 'Aktualizacja umowy',
        text: 'Wykryłem, że Twoja umowa o współpracy wymaga aktualizacji zgodnie z nowymi przepisami. Czy chcesz, abym zaktualizował ten dokument?',
        action: 'update_contract',
        status: 'active'
      },
      {
        id: 3,
        title: 'Zaplanuj spotkanie zespołu',
        text: 'Na podstawie kalendarza wszystkich członków zespołu, sugeruję zaplanowanie spotkania na piątek o 10:00.',
        action: 'schedule_meeting',
        status: 'active'
      }
    ];
    setAiSuggestions(mockSuggestions);
    setActiveSuggestions(mockSuggestions);
    
    // Generate chart data for document creation over time
    const mockChartData = [
      { month: 'Sty', documents: 12, ai: 5 },
      { month: 'Lut', documents: 19, ai: 8 },
      { month: 'Mar', documents: 15, ai: 9 },
      { month: 'Kwi', documents: 22, ai: 14 },
      { month: 'Maj', documents: 28, ai: 20 },
      { month: 'Cze', documents: 24, ai: 18 }
    ];
    setChartData(mockChartData);
    
    // Generate AI insights
    const mockInsights = [
      {
        id: 1,
        title: 'Wzrost skuteczności',
        text: 'Tworzysz 35% więcej dokumentów niż w poprzednim kwartale przy mniejszym nakładzie czasu.',
        icon: 'TrendingUp'
      },
      {
        id: 2,
        title: 'Sugestia oszczędności czasu',
        text: 'Większość Twoich dokumentów to wariacje 3 podstawowych szablonów. Możesz zaoszczędzić czas korzystając z szablonów.',
        icon: 'Clock'
      },
      {
        id: 3,
        title: 'Najczęściej modyfikowane sekcje',
        text: 'W Twoich dokumentach najczęściej modyfikujesz sekcje "Warunki płatności" i "Harmonogram".',
        icon: 'FileSearch'
      }
    ];
    setAiInsights(mockInsights);
    
    // Auto-dismiss welcome modal after 3 seconds
    const welcomeTimer = setTimeout(() => {
      setShowWelcomeModal(false);
    }, 3000);
    
    return () => clearTimeout(welcomeTimer);
  }, [documents]);
  
  // Function to handle document click
  const handleDocumentClick = (docId) => {
    if (onOpenDocument) {
      onOpenDocument(docId);
    }
  };
  
  // Function to handle document analysis
  const handleAnalyzeDocument = (docId) => {
    setDocumentBeingAnalyzed(docId);
    setIsProcessing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const doc = recentDocuments.find(d => d.id === docId);
      const result = {
        title: doc.title,
        summary: 'Dokument zawiera umowę o współpracy między stronami z określonymi warunkami płatności i terminami realizacji.',
        sentiment: 'Neutralny',
        keyPoints: [
          'Termin realizacji: 30 dni od podpisania umowy',
          'Wartość umowy: 50,000 PLN',
          'Płatność w dwóch transzach',
          'Kary umowne za niedotrzymanie terminów'
        ],
        suggestions: [
          'Dodaj klauzulę o poufności danych',
          'Zweryfikuj terminy płatności',
          'Doprecyzuj zakres odpowiedzialności stron'
        ],
        readability: 'Średnia',
        completeness: '87%'
      };
      
      setAnalysisResult(result);
      setShowAnalysisResult(true);
      setIsProcessing(false);
      
      // Update activity
      const newActivity = {
        id: Date.now(),
        type: 'ai',
        title: `Analiza: ${doc.title}`,
        user: 'Asystent AI',
        time: 'Przed chwilą'
      };
      
      setActivityData(prevActivity => [newActivity, ...prevActivity]);
      
      // Increment AI stats
      setStats(prev => ({
        ...prev,
        aiSuggestionsApplied: prev.aiSuggestionsApplied + 1,
        timeSaved: prev.timeSaved + 0.5
      }));
    }, 2000);
  };
  
  // Function to handle AI suggestion acceptance
  const handleAcceptSuggestion = (suggestionId) => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      // Find the suggestion
      const suggestion = aiSuggestions.find(s => s.id === suggestionId);
      
      // Update the suggestion status and remove from active
      setAiSuggestions(prev => 
        prev.map(s => s.id === suggestionId ? {...s, status: 'completed'} : s)
      );
      
      setActiveSuggestions(prev => prev.filter(s => s.id !== suggestionId));
      
      // Add to activity log
      const newActivity = {
        id: Date.now(),
        type: 'ai',
        title: suggestion.title,
        user: 'Asystent AI',
        time: 'Przed chwilą'
      };
      
      setActivityData(prevActivity => [newActivity, ...prevActivity]);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        aiSuggestionsApplied: prev.aiSuggestionsApplied + 1,
        timeSaved: prev.timeSaved + 1
      }));
      
      // If this was a suggestion to complete a document
      if (suggestion.action === 'complete_report') {
        // Update a document status
        const updatedDocuments = recentDocuments.map(doc => {
          if (doc.title.includes('raport') || doc.title.includes('Raport')) {
            return { ...doc, status: 'completed' };
          }
          return doc;
        });
        
        setRecentDocuments(updatedDocuments);
        setStats(prev => ({
          ...prev,
          documentsCompleted: prev.documentsCompleted + 1,
          documentsDraft: Math.max(0, prev.documentsDraft - 1)
        }));
      }
      
      // Show a new suggestion based on the accepted one
      if (activeSuggestions.length <= 1) {
        const newSuggestion = {
          id: Date.now(),
          title: 'Automatyczne wypełnianie dokumentów',
          text: 'Zauważyłem, że często wprowadzasz podobne dane w swoich dokumentach. Mogę automatycznie uzupełniać typowe pola na podstawie Twoich wcześniejszych dokumentów.',
          action: 'auto_fill',
          status: 'active'
        };
        
        setAiSuggestions(prev => [...prev, newSuggestion]);
        setActiveSuggestions(prev => [...prev, newSuggestion]);
      }
      
      setIsProcessing(false);
    }, 1500);
  };
  
  // Function to handle ignoring a suggestion
  const handleIgnoreSuggestion = (suggestionId) => {
    // Update the suggestion status and remove from active
    setAiSuggestions(prev => 
      prev.map(s => s.id === suggestionId ? {...s, status: 'ignored'} : s)
    );
    
    setActiveSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  };
  
  // Function to handle AI help
  const handleAiHelpSubmit = (e) => {
    e.preventDefault();
    if (!aiHelpPrompt.trim()) return;
    
    setIsProcessing(true);
    setAiHelpResponse('');
    
    // Simulate AI thinking
    setTimeout(() => {
      let response = '';
      const prompt = aiHelpPrompt.toLowerCase();
      
      if (prompt.includes('dokument') && (prompt.includes('utworzyć') || prompt.includes('stworzyć'))) {
        response = 'Aby utworzyć nowy dokument, kliknij przycisk "Nowy dokument" w menu bocznym lub w sekcji "Szybkie akcje" na panelu głównym. Następnie wybierz szablon lub zacznij od pustego dokumentu. Możesz też skorzystać z asystenta AI, który pomoże Ci w tworzeniu dokumentu na podstawie Twoich wskazówek.';
      } else if (prompt.includes('raport') || prompt.includes('statystyki')) {
        response = 'W panelu głównym znajdziesz podstawowe statystyki dotyczące Twoich dokumentów. Aby uzyskać bardziej szczegółowe raporty, przejdź do sekcji "Analiza" z menu bocznego. Możesz również wybrać konkretny dokument i kliknąć opcję "Analizuj", aby uzyskać szczegółowe informacje o tym dokumencie.';
      } else if (prompt.includes('szablony') || prompt.includes('szablon')) {
        response = 'Szablony dokumentów znajdziesz w sekcji "Szablony" dostępnej z menu bocznego. Możesz użyć istniejących szablonów lub stworzyć własne. Aby utworzyć dokument z szablonu, wybierz szablon i kliknij "Użyj szablonu" lub utwórz nowy dokument i wybierz szablon z listy.';
      } else if (prompt.includes('analiz') || prompt.includes('zbadaj')) {
        response = 'Aby przeanalizować dokument, przejdź do listy dokumentów, wybierz dokument i kliknij ikonę lupy (Analizuj). Asystent AI przeanalizuje zawartość dokumentu i przedstawi podsumowanie, kluczowe punkty oraz sugestie ulepszeń. Możesz również zobaczyć statystyki czytelności i kompletności dokumentu.';
      } else if (prompt.includes('współprac') || prompt.includes('udostępnij')) {
        response = 'Aby udostępnić dokument innym użytkownikom, otwórz dokument i kliknij przycisk "Udostępnij" w górnym menu. Możesz określić uprawnienia (odczyt, edycja) dla poszczególnych użytkowników lub utworzyć link do dokumentu. Wszyscy współpracownicy będą widzieć zmiany w czasie rzeczywistym.';
      } else if (prompt.includes('backup') || prompt.includes('kopia')) {
        response = 'Wszystkie Twoje dokumenty są automatycznie zapisywane w chmurze. Możesz również utworzyć ręczną kopię zapasową, klikając "Eksportuj" na liście dokumentów. Kopie zapasowe są dostępne przez 30 dni w sekcji "Archiwum" i można je w każdej chwili przywrócić.';
      } else if (prompt.includes('dzięki') || prompt.includes('dziękuję')) {
        response = 'Nie ma za co! Jestem tu, aby Ci pomóc. Czy masz jeszcze jakieś pytania dotyczące systemu?';
      } else {
        response = 'Przepraszam, nie mam wystarczających informacji na ten temat. Czy możesz sprecyzować swoje pytanie? Mogę pomóc w tworzeniu dokumentów, analizie tekstu, zarządzaniu szablonami i wielu innych zadaniach związanych z dokumentami.';
      }
      
      setAiHelpResponse(response);
      setIsProcessing(false);
      
      // Add to activity
      const newActivity = {
        id: Date.now(),
        type: 'ai',
        title: 'Zapytanie do Asystenta AI',
        user: 'Jan Kowalski',
        time: 'Przed chwilą'
      };
      
      setActivityData(prevActivity => [newActivity, ...prevActivity]);
    }, 2000);
  };
  
  // Function to handle template selection
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    // Get template title
    const template = documentTemplates.find(t => t.id === templateId);
    setNewDocumentTitle(template ? template.title : '');
  };
  
  // Function to handle creating new document
  const handleCreateDocument = () => {
    if (!newDocumentTitle.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate document creation
    setTimeout(() => {
      if (onCreateDocument) {
        onCreateDocument(newDocumentTitle);
      }
      
      // Reset form and close modal
      setNewDocumentTitle('');
      setSelectedTemplate(null);
      setShowDocumentModal(false);
      
      // Add to activity
      const newActivity = {
        id: Date.now(),
        type: 'create',
        title: newDocumentTitle,
        user: 'Jan Kowalski',
        time: 'Przed chwilą'
      };
      
      setActivityData(prevActivity => [newActivity, ...prevActivity]);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        documentsTotal: prev.documentsTotal + 1,
        documentsDraft: prev.documentsDraft + 1,
        aiGenerated: selectedTemplate ? prev.aiGenerated + 1 : prev.aiGenerated
      }));
      
      setIsProcessing(false);
    }, 1500);
  };
  
  // Function to render activity icon based on type
  const renderActivityIcon = (type) => {
    switch(type) {
      case 'edit':
        return <Edit size={18} />;
      case 'create':
        return <Plus size={18} />;
      case 'ai':
        return <Zap size={18} />;
      case 'comment':
        return <MessageSquare size={18} />;
      case 'complete':
        return <CheckCircle size={18} />;
      default:
        return <Activity size={18} />;
    }
  };
  
  // Function to get status badge classes
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'draft':
        return 'status-badge-primary';
      case 'in-progress':
        return 'status-badge-warning';
      case 'completed':
        return 'status-badge-success';
      default:
        return 'status-badge-primary';
    }
  };
  
  // Function to format status for display
  const formatStatus = (status) => {
    switch(status) {
      case 'draft':
        return 'Szkic';
      case 'in-progress':
        return 'W trakcie';
      case 'completed':
        return 'Ukończony';
      default:
        return status;
    }
  };
  
  // Render the chart
  const renderDocumentChart = () => {
    const maxValue = Math.max(...chartData.map(item => item.documents));
    
    return (
      <div className="chart-bar">
        {chartData.map((item, index) => (
          <div className="bar-column" key={index} style={{'--index': index}}>
            <div 
              className="bar-value" 
              style={{ 
                height: `${(item.documents / maxValue) * 100}%`,
                backgroundColor: item.ai > (item.documents / 2) ? '#9333ea' : '#4f46e5'
              }}
            ></div>
            <div className="bar-label">{item.month}</div>
          </div>
        ))}
      </div>
    );
  };
  
  // Render template icon
  const renderTemplateIcon = (iconName) => {
    switch(iconName) {
      case 'FileText':
        return <FileText size={24} />;
      case 'FileCheck':
        return <FileCheck size={24} />;
      case 'BarChart':
        return <BarChart size={24} />;
      case 'BookOpen':
        return <BookOpen size={24} />;
      case 'PieChart':
        return <PieChart size={24} />;
      default:
        return <FileText size={24} />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Panel główny</h1>
        <p>Witaj w Biuro AI. Twórz dokumenty, zarządzaj nimi i korzystaj z mocy sztucznej inteligencji.</p>
      </div>
      
      {/* Welcome Banner */}
      <div className="welcome-card">
        <div className="welcome-gradient"></div>
        <div className="welcome-pattern"></div>
        <div className="welcome-content">
          <h2 className="welcome-title">Witaj Jan, miło Cię znów widzieć!</h2>
          <p className="welcome-text">
            Asystent AI zaoszczędził Ci już {stats.timeSaved} godzin pracy.
            Skorzystaj z naszych inteligentnych narzędzi, aby jeszcze bardziej zwiększyć swoją produktywność.
          </p>
          <div className="welcome-buttons">
            <button className="btn btn-primary" onClick={() => setShowDocumentModal(true)}>
              <Plus size={16} />
              Nowy dokument
            </button>
            <button 
              className="btn btn-outline" 
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
              onClick={() => setShowAiHelp(true)}
            >
              <Zap size={16} />
              Zapytaj Asystenta AI
            </button>
          </div>
        </div>
        <img src="/api/placeholder/200/150" alt="AI assistant illustration" className="welcome-image" />
      </div>
      
      {/* Metrics Row */}
      <div className="dashboard-metrics">
        <div className="metric-card" style={{'--index': 0}}>
          <div className="metric-header">
            <div className="metric-icon metric-primary">
              <FileText size={20} />
            </div>
            <div className="metric-title">Dokumenty</div>
          </div>
          <div className="metric-value">{stats.documentsTotal}</div>
          <div className="metric-change metric-change-positive">
            <ArrowUp size={14} />
            <span>+5 w tym tygodniu</span>
          </div>
        </div>
        
        <div className="metric-card" style={{'--index': 1}}>
          <div className="metric-header">
            <div className="metric-icon metric-success">
              <CheckCircle size={20} />
            </div>
            <div className="metric-title">Ukończone</div>
          </div>
          <div className="metric-value">{stats.documentsCompleted}</div>
          <div className="metric-change metric-change-positive">
            <ArrowUp size={14} />
            <span>+2 w tym tygodniu</span>
          </div>
        </div>
        
        <div className="metric-card" style={{'--index': 2}}>
          <div className="metric-header">
            <div className="metric-icon metric-warning">
              <Zap size={20} />
            </div>
            <div className="metric-title">Wygenerowane przez AI</div>
          </div>
          <div className="metric-value">{stats.aiGenerated}</div>
          <div className="metric-change metric-change-positive">
            <ArrowUp size={14} />
            <span>+3 w tym tygodniu</span>
          </div>
        </div>
        
        <div className="metric-card" style={{'--index': 3}}>
          <div className="metric-header">
            <div className="metric-icon metric-info">
              <Clock size={20} />
            </div>
            <div className="metric-title">Zaoszczędzony czas</div>
          </div>
          <div className="metric-value">{stats.timeSaved}h</div>
          <div className="metric-change metric-change-positive">
            <ArrowUp size={14} />
            <span>+{(stats.timeSaved % 5).toFixed(1)}h w tym tygodniu</span>
          </div>
        </div>
      </div>
      
      {/* Main Content Sections */}
      <div className="dashboard-sections">
        {/* Left Column */}
        <div className="dashboard-main">
          {/* Document Activity Chart */}
          <div className="section-card">
            <div className="section-header">
              <div className="section-title">
                <BarChart2 size={18} />
                <span>Aktywność dokumentów</span>
              </div>
              <div className="section-actions">
                <a href="#">
                  <span>Zobacz analizę</span>
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>
            <div className="section-content">
              <div className="chart-container">
                {renderDocumentChart()}
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color color-primary"></div>
                  <span>Wszystkie dokumenty</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#9333ea' }}></div>
                  <span>Wygenerowane przez AI</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Documents */}
          <div className="section-card">
            <div className="section-header">
              <div className="section-title">
                <FileText size={18} />
                <span>Ostatnie dokumenty</span>
              </div>
              <div className="section-actions">
                <a href="#">
                  <span>Zobacz wszystkie</span>
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>
            <div className="section-content">
              <div className="documents-list">
                {recentDocuments.map((doc, index) => (
                  <div 
                    className="document-item" 
                    key={doc.id}
                    style={{ '--index': index }}
                  >
                    <div className="document-icon">
                      <FileText size={20} />
                    </div>
                    <div className="document-info">
                      <div className="document-title">{doc.title}</div>
                      <div className="document-meta">
                        <span>{doc.createdAt}</span>
                        <span className={`status-badge ${getStatusBadgeClass(doc.status)}`}>
                          {formatStatus(doc.status)}
                        </span>
                      </div>
                    </div>
                    <div className="document-actions">
                      <button title="Edytuj" onClick={() => handleDocumentClick(doc.id)}>
                        <Edit size={16} />
                      </button>
                      <button title="Podgląd" onClick={() => handleDocumentClick(doc.id)}>
                        <Eye size={16} />
                      </button>
                      <button title="Analizuj" onClick={() => handleAnalyzeDocument(doc.id)}>
                        <Search size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* AI Insights */}
          <div className="section-card">
            <div className="section-header">
              <div className="section-title">
                <Brain size={18} />
                <span>Spostrzeżenia AI</span>
              </div>
            </div>
            <div className="section-content">
              <div className="ai-insights">
                {aiInsights.map((insight, index) => (
                  <div className="suggestion-card" key={insight.id} style={{ '--index': index }}>
                    <div className="suggestion-icon">
                      <Activity size={16} />
                    </div>
                    <div className="suggestion-content">
                      <div className="suggestion-title">{insight.title}</div>
                      <div className="suggestion-text">{insight.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="section-card">
            <div className="section-header">
              <div className="section-title">
                <Zap size={18} />
                <span>Szybkie akcje</span>
              </div>
            </div>
            <div className="section-content">
              <div className="quick-actions">
                <div className="action-card" onClick={() => setShowDocumentModal(true)}>
                  <div className="action-icon">
                    <FileText size={20} />
                  </div>
                  <div className="action-title">Nowy dokument</div>
                </div>
                
                <div className="action-card" onClick={() => setShowAiHelp(true)}>
                  <div className="action-icon">
                    <Brain size={20} />
                  </div>
                  <div className="action-title">Asystent AI</div>
                </div>
                
                <div className="action-card">
                  <div className="action-icon">
                    <Mail size={20} />
                  </div>
                  <div className="action-title">Nowy email</div>
                </div>
                
                <div className="action-card">
                  <div className="action-icon">
                    <Calendar size={20} />
                  </div>
                  <div className="action-title">Zaplanuj spotkanie</div>
                </div>
                
                <div className="action-card">
                  <div className="action-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="action-title">Lista zadań</div>
                </div>
                
                <div className="action-card">
                  <div className="action-icon">
                    <Users size={20} />
                  </div>
                  <div className="action-title">Zespół</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="dashboard-sidebar">
          {/* AI Suggestions */}
          <div className="section-card">
            <div className="section-header">
              <div className="section-title">
                <Sparkles size={18} />
                <span>Sugestie AI</span>
              </div>
              <div className="section-actions">
                <a href="#">
                  <span>Zobacz wszystkie</span>
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>
            <div className="section-content">
              <div className="ai-suggestions">
                {activeSuggestions.length > 0 ? (
                  activeSuggestions.map((suggestion, index) => (
                    <div className="suggestion-card" key={suggestion.id} style={{ '--index': index }}>
                      <div className="suggestion-icon">
                        <Zap size={16} />
                      </div>
                      <div className="suggestion-content">
                        <div className="suggestion-title">{suggestion.title}</div>
                        <div className="suggestion-text">{suggestion.text}</div>
                        <div className="suggestion-actions">
                          <button 
                            className="btn btn-sm btn-primary"
                            onClick={() => handleAcceptSuggestion(suggestion.id)}
                            disabled={isProcessing}
                          >
                            {isProcessing ? <Loader size={14} className="animate-spin" /> : <Check size={14} />}
                            Akceptuj
                          </button>
                          <button 
                            className="btn btn-sm btn-outline"
                            onClick={() => handleIgnoreSuggestion(suggestion.id)}
                            disabled={isProcessing}
                          >
                            Później
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p className="empty-text">Brak aktywnych sugestii w tym momencie.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="section-card">
            <div className="section-header">
              <div className="section-title">
                <Activity size={18} />
                <span>Ostatnia aktywność</span>
              </div>
            </div>
            <div className="section-content">
              <div className="activity-list">
                {activityData.map((activity, index) => (
                  <div className="activity-item" key={activity.id} style={{ '--index': index }}>
                    <div className="activity-icon">
                      {renderActivityIcon(activity.type)}
                    </div>
                    <div className="activity-info">
                      <div className="activity-title">{activity.title}</div>
                      <div className="activity-meta">
                        <span>{activity.user}</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Plan Usage */}
          <div className="section-card">
            <div className="section-header">
              <div className="section-title">
                <Settings size={18} />
                <span>Zużycie planu</span>
              </div>
            </div>
            <div className="section-content">
              <div className="plan-usage">
                <div className="plan-header">
                  <div className="plan-title">Plan Business</div>
                  <div className="plan-badge">Aktywny</div>
                </div>
                
                <div className="plan-progress-bar">
                  <div className="plan-progress-fill" style={{ width: '65%' }}></div>
                </div>
                
                <div className="plan-details">
                  <span>23 dni pozostało</span>
                  <span>Odnawia się 20.04.2025</span>
                </div>
                
                <div className="usage-bars">
                  <div className="usage-bar">
                    <div className="usage-label">Dokumenty</div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill progress-fill-primary" 
                        style={{ width: `${usageData.documentsUsed}%` }}
                      ></div>
                    </div>
                    <div className="progress-value">{usageData.documentsUsed}%</div>
                  </div>
                  
                  <div className="usage-bar">
                    <div className="usage-label">Kredyty AI</div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill progress-fill-success"
                        style={{ width: `${usageData.aiCredits}%` }}
                      ></div>
                    </div>
                    <div className="progress-value">{usageData.aiCredits}%</div>
                  </div>
                </div>
                
                <div className="plan-usage-stats">
                  <div className="usage-stat">
                    <div className="stat-label">Miejsce na dane</div>
                    <div className="stat-value">{usageData.storage}% użyte</div>
                  </div>
                  <div className="usage-stat">
                    <div className="stat-label">Konta użytkowników</div>
                    <div className="stat-value">{usageData.team}% użyte</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Assistant Modal */}
      {showAiHelp && (
        <div className="modal-backdrop">
          <div className="modal ai-help-modal">
            <div className="modal-header">
              <h2 className="modal-title">
                <Zap size={20} className="modal-icon" />
                Asystent AI
              </h2>
              <button 
                className="modal-close"
                onClick={() => setShowAiHelp(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p className="ai-help-intro">
                Jestem Twoim AI asystentem. Jak mogę Ci dzisiaj pomóc? Możesz zapytać mnie o pomoc w tworzeniu dokumentów, analizie danych, szablonach i więcej.
              </p>
              
              {aiHelpResponse && (
                <div className="ai-response">
                  <div className="ai-response-icon">
                    <Zap size={20} />
                  </div>
                  <div className="ai-response-content">
                    {aiHelpResponse}
                  </div>
                </div>
              )}
              
              <form onSubmit={handleAiHelpSubmit} className="ai-help-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Np. Jak utworzyć nowy dokument?"
                    value={aiHelpPrompt}
                    onChange={(e) => setAiHelpPrompt(e.target.value)}
                    disabled={isProcessing}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isProcessing || !aiHelpPrompt.trim()}
                  >
                    {isProcessing ? (
                      <Loader size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                  </button>
                </div>
              </form>
              
              <div className="ai-help-examples">
                <p className="examples-title">Przykładowe pytania:</p>
                <div className="examples-list">
                  <button 
                    className="example-item"
                    onClick={() => setAiHelpPrompt('Jak utworzyć nowy dokument?')}
                  >
                    Jak utworzyć nowy dokument?
                  </button>
                  <button 
                    className="example-item"
                    onClick={() => setAiHelpPrompt('Gdzie znajdę szablony?')}
                  >
                    Gdzie znajdę szablony?
                  </button>
                  <button 
                    className="example-item"
                    onClick={() => setAiHelpPrompt('Jak przeanalizować dokument?')}
                  >
                    Jak przeanalizować dokument?
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-outline"
                onClick={() => setShowAiHelp(false)}
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Document Analysis Result Modal */}
      {showAnalysisResult && (
        <div className="modal-backdrop">
          <div className="modal analysis-modal">
            <div className="modal-header">
              <h2 className="modal-title">
                <FileSearch size={20} className="modal-icon" />
                Analiza AI: {analysisResult?.title}
              </h2>
              <button 
                className="modal-close"
                onClick={() => setShowAnalysisResult(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="analysis-section">
                <h3 className="analysis-section-title">Podsumowanie</h3>
                <p className="analysis-text">{analysisResult?.summary}</p>
              </div>
              
              <div className="analysis-grid">
                <div className="analysis-section">
                  <h3 className="analysis-section-title">Kluczowe punkty</h3>
                  <ul className="analysis-list">
                    {analysisResult?.keyPoints.map((point, index) => (
                      <li key={index} className="analysis-list-item">{point}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="analysis-section">
                  <h3 className="analysis-section-title">Sugestie ulepszeń</h3>
                  <ul className="analysis-list">
                    {analysisResult?.suggestions.map((suggestion, index) => (
                      <li key={index} className="analysis-list-item">{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="analysis-stats">
                <div className="analysis-stat-item">
                  <span className="stat-label">Wydźwięk dokumentu:</span>
                  <span className="stat-value">{analysisResult?.sentiment}</span>
                </div>
                <div className="analysis-stat-item">
                  <span className="stat-label">Czytelność:</span>
                  <span className="stat-value">{analysisResult?.readability}</span>
                </div>
                <div className="analysis-stat-item">
                  <span className="stat-label">Kompletność:</span>
                  <span className="stat-value">{analysisResult?.completeness}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowAnalysisResult(false)}>
                Zamknij
              </button>
              <button className="btn btn-primary">
                <Zap size={16} />
                Zastosuj sugestie
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* New Document Modal */}
      {showDocumentModal && (
        <div className="modal-backdrop">
          <div className="modal document-modal">
            <div className="modal-header">
              <h2 className="modal-title">
                <FileText size={20} className="modal-icon" />
                Utwórz nowy dokument
              </h2>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowDocumentModal(false);
                  setNewDocumentTitle('');
                  setSelectedTemplate(null);
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Tytuł dokumentu</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Np. Umowa o współpracy"
                  value={newDocumentTitle}
                  onChange={(e) => setNewDocumentTitle(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Wybierz szablon</label>
                <div className="template-grid">
                  {documentTemplates.map(template => (
                    <div 
                      key={template.id}
                      className={`template-card ${selectedTemplate === template.id ? 'active' : ''}`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="template-icon">
                        {renderTemplateIcon(template.icon)}
                      </div>
                      <div className="template-title">{template.title}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <div className="ai-assist-option">
                  <input
                    type="checkbox"
                    id="aiAssist"
                    className="form-checkbox"
                    defaultChecked={true}
                  />
                  <label htmlFor="aiAssist" className="checkbox-label">
                    <Zap size={16} className="checkbox-icon" />
                    Użyj asystenta AI do pomocy w tworzeniu dokumentu
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-outline"
                onClick={() => {
                  setShowDocumentModal(false);
                  setNewDocumentTitle('');
                  setSelectedTemplate(null);
                }}
              >
                Anuluj
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleCreateDocument}
                disabled={isProcessing || !newDocumentTitle.trim()}
              >
                {isProcessing ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Tworzenie...
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Utwórz dokument
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Welcome Processing Modal */}
      {showWelcomeModal && (
        <div className="modal-overlay loading-overlay">
          <div className="loading-modal">
            <div className="loading-icon">
              <Zap size={32} className="animate-pulse" />
            </div>
            <div className="loading-text">
              <h3>Analizowanie Twoich danych...</h3>
              <p>Asystent AI przygotowuje spersonalizowany dashboard.</p>
            </div>
            <div className="loading-progress">
              <div className="loading-bar">
                <div className="loading-bar-fill"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;