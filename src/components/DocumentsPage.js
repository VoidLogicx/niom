import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  FolderPlus, 
  Search, 
  Filter, 
  X, 
  ChevronDown, 
  Plus, 
  Calendar,
  Download,
  Share2,
  Edit,
  Trash2,
  Star,
  Clock,
  Users,
  Tag,
  FileCheck,
  CheckCircle,
  AlertCircle,
  Clock8,
  BrainCircuit,
  Zap,
  BarChart2
} from 'lucide-react';
import '../css/DocumentsPage.css';

const DocumentsPage = ({ darkMode }) => {
  // State for document list and filters
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // State for AI features
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);
  
  // State for document operations
  const [isCreatingDoc, setIsCreatingDoc] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocType, setNewDocType] = useState('default');
  const [showBatchActions, setShowBatchActions] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  
  // Document metadata options
  const documentTypes = [
    { id: 'all', name: 'Wszystkie typy' },
    { id: 'contract', name: 'Umowy' },
    { id: 'report', name: 'Raporty' },
    { id: 'memo', name: 'Notatki' },
    { id: 'proposal', name: 'Oferty' },
    { id: 'letter', name: 'Listy' },
    { id: 'invoice', name: 'Faktury' }
  ];
  
  const documentStatuses = [
    { id: 'all', name: 'Wszystkie statusy' },
    { id: 'draft', name: 'Szkic' },
    { id: 'in-progress', name: 'W trakcie' },
    { id: 'review', name: 'Do przeglądu' },
    { id: 'completed', name: 'Ukończone' }
  ];
  
  const dateRanges = [
    { id: 'all', name: 'Dowolna data' },
    { id: 'today', name: 'Dzisiaj' },
    { id: 'week', name: 'Ten tydzień' },
    { id: 'month', name: 'Ten miesiąc' },
    { id: 'quarter', name: 'Ten kwartał' }
  ];
  
  // Load documents on component mount
  useEffect(() => {
    // Simulate API call to load documents
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        
        const mockDocuments = [
          {
            id: 1,
            title: 'Umowa o współpracy z firmą XYZ',
            type: 'contract',
            status: 'completed',
            author: 'Jan Kowalski',
            created: '2025-03-15',
            modified: '2025-03-18',
            size: '234KB',
            pages: 12,
            aiGenerated: true,
            starred: true,
            shared: ['Anna Nowak', 'Piotr Wiśniewski'],
            tags: ['ważne', 'klient']
          },
          {
            id: 2,
            title: 'Raport kwartalny Q1 2025',
            type: 'report',
            status: 'in-progress',
            author: 'Anna Nowak',
            created: '2025-03-20',
            modified: '2025-03-22',
            size: '1.2MB',
            pages: 28,
            aiGenerated: true,
            starred: false,
            shared: ['Jan Kowalski'],
            tags: ['finanse', 'kwartał']
          },
          {
            id: 3,
            title: 'Oferta handlowa - usługi premium',
            type: 'proposal',
            status: 'review',
            author: 'Piotr Wiśniewski',
            created: '2025-03-10',
            modified: '2025-03-12',
            size: '567KB',
            pages: 8,
            aiGenerated: false,
            starred: false,
            shared: [],
            tags: ['sprzedaż']
          },
          {
            id: 4,
            title: 'Notatka ze spotkania zarządu',
            type: 'memo',
            status: 'completed',
            author: 'Jan Kowalski',
            created: '2025-03-05',
            modified: '2025-03-05',
            size: '45KB',
            pages: 2,
            aiGenerated: false,
            starred: true,
            shared: ['Anna Nowak', 'Maria Kowalczyk', 'Adam Nowicki'],
            tags: ['zarząd', 'spotkanie']
          },
          {
            id: 5,
            title: 'Faktura za usługi konsultingowe',
            type: 'invoice',
            status: 'completed',
            author: 'System',
            created: '2025-03-01',
            modified: '2025-03-01',
            size: '128KB',
            pages: 1,
            aiGenerated: false,
            starred: false,
            shared: [],
            tags: ['finanse', 'płatności']
          },
          {
            id: 6,
            title: 'Umowa NDA z nowym partnerem',
            type: 'contract',
            status: 'draft',
            author: 'Anna Nowak',
            created: '2025-03-21',
            modified: '2025-03-21',
            size: '198KB',
            pages: 6,
            aiGenerated: true,
            starred: false,
            shared: ['Jan Kowalski'],
            tags: ['poufne', 'partner']
          },
          {
            id: 7,
            title: 'Plan marketingowy - Q2 2025',
            type: 'report',
            status: 'draft',
            author: 'Maria Kowalczyk',
            created: '2025-03-18',
            modified: '2025-03-19',
            size: '789KB',
            pages: 15,
            aiGenerated: true,
            starred: false,
            shared: ['Jan Kowalski', 'Anna Nowak'],
            tags: ['marketing', 'planowanie']
          },
          {
            id: 8,
            title: 'Protokół odbioru projektu',
            type: 'memo',
            status: 'review',
            author: 'Piotr Wiśniewski',
            created: '2025-03-17',
            modified: '2025-03-17',
            size: '120KB',
            pages: 3,
            aiGenerated: false,
            starred: false,
            shared: ['Jan Kowalski'],
            tags: ['projekt', 'odbiór']
          }
        ];
        
        setDocuments(mockDocuments);
        setFilteredDocuments(mockDocuments);
        
        // Generate AI recommendations
        generateAIRecommendations(mockDocuments);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Generate AI recommendations based on documents
  const generateAIRecommendations = (docs) => {
    // In a real app, this would use an ML model or API
    const recommendations = [
      {
        id: 1,
        type: 'action',
        title: 'Dokończ raport kwartalny',
        description: 'Zauważyłem, że raport kwartalny Q1 jest w trakcie realizacji. Mogę pomóc w dokończeniu brakujących sekcji.',
        priority: 'high',
        documentId: 2
      },
      {
        id: 2,
        type: 'insight',
        title: 'Optymalizacja umów',
        description: 'Analiza wykazała, że Twoje umowy mają powtarzające się sekcje, które można zautomatyzować, oszczędzając średnio 45 minut na dokument.',
        priority: 'medium'
      },
      {
        id: 3,
        type: 'suggestion',
        title: 'Automatyczne tagowanie',
        description: 'Mogę automatycznie tagować nowe dokumenty na podstawie ich zawartości, usprawniając organizację.',
        priority: 'low'
      }
    ];
    
    setAiRecommendations(recommendations);
  };
  
  // Apply filters and search to documents
  useEffect(() => {
    let results = [...documents];
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply status filter
    if (selectedStatus !== 'all') {
      results = results.filter(doc => doc.status === selectedStatus);
    }
    
    // Apply type filter
    if (selectedType !== 'all') {
      results = results.filter(doc => doc.type === selectedType);
    }
    
    // Apply date range filter
    if (selectedDateRange !== 'all') {
      const today = new Date();
      const documentDate = (doc) => new Date(doc.created);
      
      if (selectedDateRange === 'today') {
        results = results.filter(doc => {
          const date = documentDate(doc);
          return date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
        });
      } else if (selectedDateRange === 'week') {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        weekStart.setHours(0, 0, 0, 0);
        
        results = results.filter(doc => {
          const date = documentDate(doc);
          return date >= weekStart;
        });
      } else if (selectedDateRange === 'month') {
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        
        results = results.filter(doc => {
          const date = documentDate(doc);
          return date >= monthStart;
        });
      } else if (selectedDateRange === 'quarter') {
        const quarterStart = new Date(today);
        quarterStart.setMonth(Math.floor(today.getMonth() / 3) * 3, 1);
        quarterStart.setHours(0, 0, 0, 0);
        
        results = results.filter(doc => {
          const date = documentDate(doc);
          return date >= quarterStart;
        });
      }
    }
    
    // Apply sorting
    results.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'date') {
        comparison = new Date(b.modified) - new Date(a.modified);
      } else if (sortBy === 'name') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'type') {
        comparison = a.type.localeCompare(b.type);
      } else if (sortBy === 'status') {
        comparison = a.status.localeCompare(b.status);
      }
      
      return sortDirection === 'asc' ? comparison * -1 : comparison;
    });
    
    setFilteredDocuments(results);
  }, [documents, searchTerm, selectedStatus, selectedType, selectedDateRange, sortBy, sortDirection]);
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedType('all');
    setSelectedDateRange('all');
  };
  
  // Toggle sort direction
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };
  
  // Handle document creation
  const handleCreateDocument = () => {
    if (isCreatingDoc && newDocTitle.trim()) {
      const newDocument = {
        id: documents.length + 1,
        title: newDocTitle,
        type: newDocType,
        status: 'draft',
        author: 'Jan Kowalski', // Normally would be current user
        created: new Date().toISOString().split('T')[0],
        modified: new Date().toISOString().split('T')[0],
        size: '0KB',
        pages: 0,
        aiGenerated: false,
        starred: false,
        shared: [],
        tags: []
      };
      
      setDocuments([newDocument, ...documents]);
      setNewDocTitle('');
      setNewDocType('default');
      setIsCreatingDoc(false);
    } else {
      setIsCreatingDoc(true);
    }
  };
  
  // Handle AI document creation
  const handleAIDocumentCreation = (template) => {
    setIsAIProcessing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const newAIDocument = {
        id: documents.length + 1,
        title: `AI - ${template}`,
        type: template === 'Raport analityczny' ? 'report' : 
              template === 'Umowa NDA' ? 'contract' : 
              template === 'Oferta handlowa' ? 'proposal' : 'memo',
        status: 'draft',
        author: 'Asystent AI',
        created: new Date().toISOString().split('T')[0],
        modified: new Date().toISOString().split('T')[0],
        size: template === 'Raport analityczny' ? '450KB' : 
              template === 'Umowa NDA' ? '210KB' : 
              template === 'Oferta handlowa' ? '320KB' : '180KB',
        pages: template === 'Raport analityczny' ? 12 : 
               template === 'Umowa NDA' ? 6 : 
               template === 'Oferta handlowa' ? 8 : 4,
        aiGenerated: true,
        starred: false,
        shared: [],
        tags: ['AI', template.toLowerCase()]
      };
      
      setDocuments([newAIDocument, ...documents]);
      setIsAIProcessing(false);
    }, 2000);
  };
  
  // Toggle document selection
  const toggleDocumentSelection = (docId) => {
    const isSelected = selectedDocuments.includes(docId);
    
    if (isSelected) {
      setSelectedDocuments(selectedDocuments.filter(id => id !== docId));
    } else {
      setSelectedDocuments([...selectedDocuments, docId]);
    }
    
    // Show batch actions when at least one document is selected
    setShowBatchActions(selectedDocuments.length > 0 || !isSelected);
  };
  
  // Handle batch action
  const handleBatchAction = (action) => {
    if (selectedDocuments.length === 0) return;
    
    switch (action) {
      case 'delete':
        // Filter out selected documents
        setDocuments(documents.filter(doc => !selectedDocuments.includes(doc.id)));
        break;
      case 'share':
        alert(`Udostępnianie ${selectedDocuments.length} dokumentów`);
        break;
      case 'download':
        alert(`Pobieranie ${selectedDocuments.length} dokumentów`);
        break;
      case 'analyze':
        handleAIAnalysis();
        break;
      default:
        break;
    }
    
    // Reset selection
    setSelectedDocuments([]);
    setShowBatchActions(false);
  };
  
  // Handle AI analysis of selected documents
  const handleAIAnalysis = () => {
    setIsAIProcessing(true);
    setShowAIPanel(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Get selected documents
      const docsToAnalyze = documents.filter(doc => selectedDocuments.includes(doc.id));
      
      // Generate mock analysis results
      const results = {
        summary: `Analiza ${docsToAnalyze.length} dokumentów wykazała, że większość z nich dotyczy ${docsToAnalyze[0].type === 'contract' ? 'umów' : 'raportów'} i została utworzona w ostatnim miesiącu.`,
        keyInsights: [
          "67% dokumentów zostało utworzonych przy pomocy AI",
          "Średnia długość dokumentu to 9 stron",
          "Najczęściej używane tagi to: finanse, klient, projekt"
        ],
        contentOverlap: "Wykryto 35% pokrywającej się zawartości między dokumentami. Sugeruję utworzenie szablonów dla często używanych sekcji.",
        recommendations: [
          "Skonsoliduj podobne dokumenty w jednym miejscu",
          "Zaktualizuj starsze dokumenty o nowe klauzule",
          "Użyj auto-tagowania dla lepszej organizacji"
        ],
        documentSentiment: {
          positive: 45,
          neutral: 50,
          negative: 5
        }
      };
      
      setAnalysisResults(results);
      setIsAIProcessing(false);
    }, 2500);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL');
  };
  
  // Get status badge style
  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <span className="status-badge completed"><CheckCircle size={14} /> Ukończony</span>;
      case 'in-progress':
        return <span className="status-badge in-progress"><Clock8 size={14} /> W trakcie</span>;
      case 'review':
        return <span className="status-badge review"><AlertCircle size={14} /> Do przeglądu</span>;
      case 'draft':
        return <span className="status-badge draft"><FileText size={14} /> Szkic</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };
  
  return (
    <div className={`documents-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="documents-header">
        <h1>Dokumenty</h1>
        <p>Zarządzaj i organizuj wszystkie dokumenty w jednym miejscu</p>
      </div>
      
      {/* Document Statistics */}
      <div className="document-stats">
        <div className="stat-card">
          <div className="stat-icon document-icon">
            <FileText size={22} />
          </div>
          <div className="stat-info">
            <h3>Wszystkie dokumenty</h3>
            <p>{documents.length}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon ai-icon">
            <BrainCircuit size={22} />
          </div>
          <div className="stat-info">
            <h3>Utworzone przez AI</h3>
            <p>{documents.filter(doc => doc.aiGenerated).length}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon completed-icon">
            <FileCheck size={22} />
          </div>
          <div className="stat-info">
            <h3>Ukończone</h3>
            <p>{documents.filter(doc => doc.status === 'completed').length}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon shared-icon">
            <Users size={22} />
          </div>
          <div className="stat-info">
            <h3>Udostępnione</h3>
            <p>{documents.filter(doc => doc.shared.length > 0).length}</p>
          </div>
        </div>
      </div>
      
      {/* AI Recommendations */}
      {aiRecommendations.length > 0 && (
        <div className="ai-recommendations">
          <div className="section-header">
            <h2><Zap size={18} /> Rekomendacje AI</h2>
          </div>
          <div className="recommendation-cards">
            {aiRecommendations.map(rec => (
              <div key={rec.id} className={`recommendation-card priority-${rec.priority}`}>
                <div className="recommendation-header">
                  <span className="recommendation-type">
                    {rec.type === 'action' ? 'Sugerowana akcja' : 
                     rec.type === 'insight' ? 'Analiza' : 'Sugestia'}
                  </span>
                  <span className="recommendation-priority">
                    {rec.priority === 'high' ? 'Wysoki priorytet' : 
                     rec.priority === 'medium' ? 'Średni priorytet' : 'Niski priorytet'}
                  </span>
                </div>
                <h3>{rec.title}</h3>
                <p>{rec.description}</p>
                <div className="recommendation-actions">
                  <button className="btn-primary">
                    {rec.type === 'action' ? 'Wykonaj' : 
                     rec.type === 'insight' ? 'Szczegóły' : 'Zastosuj'}
                  </button>
                  <button className="btn-outline">Odrzuć</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Document Actions */}
      <div className="document-actions">
        <div className="search-filter-container">
          <div className="search-container">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Szukaj dokumentów..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search" 
                onClick={() => setSearchTerm('')}
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <button 
            className={`filter-button ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            <span>Filtry</span>
            <ChevronDown size={16} className={`chevron ${showFilters ? 'rotate' : ''}`} />
          </button>
        </div>
        
        <div className="document-buttons">
          <button 
            className="btn-ai"
            onClick={() => setShowAIPanel(!showAIPanel)}
          >
            <BrainCircuit size={18} />
            <span>Asystent AI</span>
          </button>
          
          <button 
            className="btn-primary"
            onClick={handleCreateDocument}
          >
            <Plus size={18} />
            <span>Nowy dokument</span>
          </button>
        </div>
      </div>
      
      {/* Create Document Form */}
      {isCreatingDoc && (
        <div className="create-document-form">
          <div className="form-header">
            <h2>Nowy dokument</h2>
            <button 
              className="close-button"
              onClick={() => setIsCreatingDoc(false)}
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="form-content">
            <div className="form-group">
              <label htmlFor="docTitle">Tytuł dokumentu</label>
              <input 
                type="text" 
                id="docTitle" 
                value={newDocTitle}
                onChange={(e) => setNewDocTitle(e.target.value)}
                placeholder="Wprowadź tytuł dokumentu"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="docType">Typ dokumentu</label>
              <select 
                id="docType" 
                value={newDocType}
                onChange={(e) => setNewDocType(e.target.value)}
              >
                <option value="default">Wybierz typ dokumentu</option>
                {documentTypes.filter(type => type.id !== 'all').map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            
            <div className="form-actions">
              <button 
                className="btn-outline"
                onClick={() => setIsCreatingDoc(false)}
              >
                Anuluj
              </button>
              
              <button 
                className="btn-primary"
                onClick={handleCreateDocument}
                disabled={!newDocTitle.trim() || newDocType === 'default'}
              >
                Utwórz dokument
              </button>
            </div>
            
            <div className="ai-templates">
              <h3>Lub użyj szablonu AI</h3>
              <div className="ai-template-buttons">
                <button 
                  className="ai-template-button"
                  onClick={() => handleAIDocumentCreation('Raport analityczny')}
                  disabled={isAIProcessing}
                >
                  <Zap size={16} />
                  <span>Raport analityczny</span>
                </button>
                
                <button 
                  className="ai-template-button"
                  onClick={() => handleAIDocumentCreation('Umowa NDA')}
                  disabled={isAIProcessing}
                >
                  <Zap size={16} />
                  <span>Umowa NDA</span>
                </button>
                
                <button 
                  className="ai-template-button"
                  onClick={() => handleAIDocumentCreation('Oferta handlowa')}
                  disabled={isAIProcessing}
                >
                  <Zap size={16} />
                  <span>Oferta handlowa</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Expanded Filters */}
      {showFilters && (
        <div className="expanded-filters">
          <div className="filter-group">
            <label>Status</label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {documentStatuses.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Typ dokumentu</label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {documentTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Data utworzenia</label>
            <select 
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
            >
              {dateRanges.map(range => (
                <option key={range.id} value={range.id}>{range.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Sortuj według</label>
            <select 
              value={sortBy}
              onChange={(e) => toggleSort(e.target.value)}
            >
              <option value="date">Data modyfikacji</option>
              <option value="name">Nazwa</option>
              <option value="type">Typ</option>
              <option value="status">Status</option>
            </select>
            
            <button 
              className="sort-direction-button"
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
            >
              {sortDirection === 'asc' ? '↑' : '↓'}
            </button>
          </div>
          
          <div className="filter-actions">
            <button 
              className="reset-filters"
              onClick={resetFilters}
            >
              Resetuj filtry
            </button>
          </div>
        </div>
      )}
      
      {/* Batch Actions Bar */}
      {showBatchActions && (
        <div className="batch-actions-bar">
          <div className="selected-count">
            <span>Wybrano: {selectedDocuments.length}</span>
          </div>
          
          <div className="batch-buttons">
            <button 
              className="batch-button"
              onClick={() => handleBatchAction('analyze')}
              disabled={selectedDocuments.length === 0}
            >
              <BrainCircuit size={18} />
              <span>Analizuj</span>
            </button>
            
            <button 
              className="batch-button"
              onClick={() => handleBatchAction('share')}
              disabled={selectedDocuments.length === 0}
            >
              <Share2 size={18} />
              <span>Udostępnij</span>
            </button>
            
            <button 
              className="batch-button"
              onClick={() => handleBatchAction('download')}
              disabled={selectedDocuments.length === 0}
            >
              <Download size={18} />
              <span>Pobierz</span>
            </button>
            
            <button 
              className="batch-button danger"
              onClick={() => handleBatchAction('delete')}
              disabled={selectedDocuments.length === 0}
            >
              <Trash2 size={18} />
              <span>Usuń</span>
            </button>
          </div>
          
          <button 
            className="close-batch-actions"
            onClick={() => {
              setSelectedDocuments([]);
              setShowBatchActions(false);
            }}
          >
            <X size={18} />
          </button>
        </div>
      )}
      
      {/* Document List */}
      <div className="documents-list-container">
        {/* Table Header */}
        <div className="documents-table-header">
          <div className="checkbox-cell">
            <input 
              type="checkbox" 
              checked={selectedDocuments.length > 0 && selectedDocuments.length === filteredDocuments.length}
              onChange={(e) => {
                if (e.target.checked) {
                  // Select all documents
                  setSelectedDocuments(filteredDocuments.map(doc => doc.id));
                  setShowBatchActions(true);
                } else {
                  // Deselect all documents
                  setSelectedDocuments([]);
                  setShowBatchActions(false);
                }
              }}
            />
          </div>
          <div className="document-cell">Dokument</div>
          <div className="status-cell">Status</div>
          <div className="type-cell">Typ</div>
          <div className="date-cell">Data modyfikacji</div>
          <div className="author-cell">Autor</div>
          <div className="actions-cell">Akcje</div>
        </div>
        
        {/* Loading Indicator */}
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Wczytywanie dokumentów...</p>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} />
            <h3>Brak dokumentów</h3>
            <p>Nie znaleziono dokumentów spełniających kryteria wyszukiwania.</p>
            <button 
              className="btn-primary"
              onClick={resetFilters}
            >
              Wyczyść filtry
            </button>
          </div>
        ) : (
          <div className="documents-list">
            {filteredDocuments.map(doc => (
              <div 
                key={doc.id} 
                className={`document-row ${selectedDocuments.includes(doc.id) ? 'selected' : ''}`}
              >
                <div className="checkbox-cell">
                  <input 
                    type="checkbox" 
                    checked={selectedDocuments.includes(doc.id)}
                    onChange={() => toggleDocumentSelection(doc.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                
                <div className="document-cell">
                  <div className="document-info">
                    <div className="document-icon">
                      <FileText size={18} />
                      {doc.aiGenerated && <div className="ai-badge"><Zap size={10} /></div>}
                    </div>
                    <div className="document-details">
                      <div className="document-title">
                        {doc.title}
                        {doc.starred && <Star size={14} className="star-icon" />}
                      </div>
                      <div className="document-meta">
                        {doc.size} • {doc.pages} stron
                        {doc.tags.length > 0 && (
                          <div className="document-tags">
                            <Tag size={12} />
                            {doc.tags.map((tag, index) => (
                              <span key={index} className="tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="status-cell">
                  {getStatusBadge(doc.status)}
                </div>
                
                <div className="type-cell">
                  {documentTypes.find(type => type.id === doc.type)?.name || doc.type}
                </div>
                
                <div className="date-cell">
                  <div className="date-info">
                    <Clock size={14} />
                    <span>{formatDate(doc.modified)}</span>
                  </div>
                </div>
                
                <div className="author-cell">
                  <div className="author-info">
                    <div className="author-avatar">
                      {doc.author.split(' ').map(name => name[0]).join('')}
                    </div>
                    <span>{doc.author}</span>
                  </div>
                </div>
                
                <div className="actions-cell">
                  <button className="action-button" title="Edytuj">
                    <Edit size={16} />
                  </button>
                  <button className="action-button" title="Pobierz">
                    <Download size={16} />
                  </button>
                  <button className="action-button" title="Udostępnij">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* AI Analysis Panel */}
      {showAIPanel && (
        <div className="ai-panel">
          <div className="ai-panel-header">
            <h2><BrainCircuit size={20} /> Analiza AI</h2>
            <button 
              className="close-button"
              onClick={() => {
                setShowAIPanel(false);
                setAnalysisResults(null);
              }}
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="ai-panel-content">
            {isAIProcessing ? (
              <div className="ai-loading">
                <div className="ai-loading-animation">
                  <div className="ai-loading-circle"></div>
                  <div className="ai-loading-circle"></div>
                  <div className="ai-loading-circle"></div>
                </div>
                <p>Asystent AI analizuje wybrane dokumenty...</p>
              </div>
            ) : analysisResults ? (
              <div className="ai-analysis-results">
                <div className="analysis-summary">
                  <h3>Podsumowanie</h3>
                  <p>{analysisResults.summary}</p>
                </div>
                
                <div className="analysis-insights">
                  <h3>Kluczowe wnioski</h3>
                  <ul>
                    {analysisResults.keyInsights.map((insight, index) => (
                      <li key={index}>{insight}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="analysis-section">
                  <h3>Nakładanie się treści</h3>
                  <p>{analysisResults.contentOverlap}</p>
                </div>
                
                <div className="analysis-recommendations">
                  <h3>Rekomendacje</h3>
                  <ul className="recommendation-list">
                    {analysisResults.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="analysis-sentiment">
                  <h3>Wydźwięk dokumentów</h3>
                  <div className="sentiment-bars">
                    <div className="sentiment-bar">
                      <span className="sentiment-label">Pozytywny</span>
                      <div className="sentiment-progress">
                        <div 
                          className="sentiment-progress-bar positive" 
                          style={{ width: `${analysisResults.documentSentiment.positive}%` }}
                        ></div>
                      </div>
                      <span className="sentiment-value">{analysisResults.documentSentiment.positive}%</span>
                    </div>
                    
                    <div className="sentiment-bar">
                      <span className="sentiment-label">Neutralny</span>
                      <div className="sentiment-progress">
                        <div 
                          className="sentiment-progress-bar neutral" 
                          style={{ width: `${analysisResults.documentSentiment.neutral}%` }}
                        ></div>
                      </div>
                      <span className="sentiment-value">{analysisResults.documentSentiment.neutral}%</span>
                    </div>
                    
                    <div className="sentiment-bar">
                      <span className="sentiment-label">Negatywny</span>
                      <div className="sentiment-progress">
                        <div 
                          className="sentiment-progress-bar negative" 
                          style={{ width: `${analysisResults.documentSentiment.negative}%` }}
                        ></div>
                      </div>
                      <span className="sentiment-value">{analysisResults.documentSentiment.negative}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="ai-assistant-intro">
                <div className="ai-assistant-icon">
                  <BrainCircuit size={48} />
                </div>
                <h3>Asystent AI dla dokumentów</h3>
                <p>Wybierz dokumenty, które chcesz przeanalizować lub użyj asystenta AI do stworzenia nowych dokumentów.</p>
                
                <div className="ai-assistant-actions">
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      if (selectedDocuments.length > 0) {
                        handleAIAnalysis();
                      } else {
                        alert('Wybierz dokumenty do analizy');
                      }
                    }}
                  >
                    <BarChart2 size={18} />
                    <span>Analizuj wybrane dokumenty</span>
                  </button>
                  
                  <button 
                    className="btn-outline"
                    onClick={() => {
                      setIsCreatingDoc(true);
                      setShowAIPanel(false);
                    }}
                  >
                    <Zap size={18} />
                    <span>Stwórz dokument z AI</span>
                  </button>
                </div>
                
                <div className="ai-capabilities">
                  <h4>Co może zrobić asystent AI?</h4>
                  <ul>
                    <li>Analizować zawartość dokumentów</li>
                    <li>Wykrywać podobieństwa i powtórzenia</li>
                    <li>Sugerować optymalizacje i ulepszenia</li>
                    <li>Generować nowe dokumenty na podstawie szablonów</li>
                    <li>Automatycznie kategoryzować i tagować dokumenty</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* AI Processing Overlay */}
      {isAIProcessing && !showAIPanel && (
        <div className="ai-processing-overlay">
          <div className="ai-processing-content">
            <div className="ai-loading-animation">
              <div className="ai-loading-circle"></div>
              <div className="ai-loading-circle"></div>
              <div className="ai-loading-circle"></div>
            </div>
            <p>Asystent AI pracuje...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;