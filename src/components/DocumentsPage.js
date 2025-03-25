import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  FolderPlus, 
  Search, 
  Filter, 
  SortAsc, 
  Calendar, 
  File, 
  Trash2, 
  Download, 
  Share2, 
  Copy, 
  Edit, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  Users, 
  Star, 
  Tag, 
  ChevronRight, 
  Menu, 
  X, 
  RefreshCw, 
  Eye, 
  Lock, 
  Plus, 
  Paperclip, 
  ExternalLink, 
  HelpCircle,
  Zap,
  BrainCircuit
} from 'lucide-react';
import '../css/DocumentsPage.css';

const DocumentsPage = ({ darkMode }) => {
  // State management
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeView, setActiveView] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('modified');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [newDocumentName, setNewDocumentName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newDocumentType, setNewDocumentType] = useState('text');
  const [showAIOptions, setShowAIOptions] = useState(false);
  const [isDocumentAnalyzing, setIsDocumentAnalyzing] = useState(false);
  const [documentAnalysis, setDocumentAnalysis] = useState(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiSuggestionOpen, setAiSuggestionOpen] = useState(false);
  const [activeSuggestions, setActiveSuggestions] = useState([]);

  // Mock document categories
  const categories = [
    { id: 'all', name: 'Wszystkie dokumenty', icon: <FileText size={16} /> },
    { id: 'contracts', name: 'Umowy', icon: <File size={16} /> },
    { id: 'reports', name: 'Raporty', icon: <FileText size={16} /> },
    { id: 'letters', name: 'Korespondencja', icon: <FileText size={16} /> },
    { id: 'templates', name: 'Szablony', icon: <Copy size={16} /> },
    { id: 'shared', name: 'Udostępnione', icon: <Share2 size={16} /> },
    { id: 'favorite', name: 'Ulubione', icon: <Star size={16} /> },
    { id: 'trash', name: 'Kosz', icon: <Trash2 size={16} /> }
  ];

  // Mock document templates
  const documentTemplates = [
    { id: 1, name: 'Umowa o pracę', category: 'contracts', icon: <File size={16} /> },
    { id: 2, name: 'Umowa o dzieło', category: 'contracts', icon: <File size={16} /> },
    { id: 3, name: 'Raport miesięczny', category: 'reports', icon: <FileText size={16} /> },
    { id: 4, name: 'Raport kwartalny', category: 'reports', icon: <FileText size={16} /> },
    { id: 5, name: 'List motywacyjny', category: 'letters', icon: <FileText size={16} /> },
    { id: 6, name: 'Dokument pusty', category: 'templates', icon: <File size={16} /> }
  ];

  // Mock AI suggestions
  const aiSuggestions = [
    { id: 1, title: 'Zaktualizuj umowy', description: 'Niektóre umowy wymagają aktualizacji zgodnie z nowymi przepisami. Mogę pomóc w ich aktualizacji automatycznie.', action: 'update_contracts' },
    { id: 2, title: 'Zorganizuj dokumenty', description: 'Zauważyłem, że masz wiele dokumentów bez kategorii. Chcesz, żebym je automatycznie skategoryzował?', action: 'organize_documents' },
    { id: 3, title: 'Generuj raport miesięczny', description: 'Zbliża się koniec miesiąca. Chcesz wygenerować raport na podstawie danych z poprzednich miesięcy?', action: 'generate_report' }
  ];

  // Generate mock documents on component mount
  useEffect(() => {
    const mockDocuments = [];
    
    // Generate contracts
    for (let i = 1; i <= 5; i++) {
      mockDocuments.push({
        id: i,
        name: `Umowa z klientem ${i}`,
        type: 'contract',
        category: 'contracts',
        created: `${10 + i}.03.2025`,
        modified: `${10 + i}.03.2025`,
        size: `${100 + i * 20} KB`,
        author: 'Jan Kowalski',
        status: i % 3 === 0 ? 'pending' : (i % 2 === 0 ? 'approved' : 'draft'),
        tags: ['umowa', 'klient', 'ważne'],
        favorite: i === 2,
        aiGenerated: i % 2 === 0,
        shared: i === 1 || i === 3,
        icon: <File size={20} className="text-blue-500" />
      });
    }
    
    // Generate reports
    for (let i = 6; i <= 10; i++) {
      mockDocuments.push({
        id: i,
        name: `Raport Q${i-5} 2025`,
        type: 'report',
        category: 'reports',
        created: `${i}.03.2025`,
        modified: `${i+2}.03.2025`,
        size: `${200 + i * 30} KB`,
        author: 'Anna Nowak',
        status: i % 3 === 0 ? 'pending' : (i % 2 === 0 ? 'approved' : 'draft'),
        tags: ['raport', 'kwartalny', 'finanse'],
        favorite: i === 7,
        aiGenerated: i % 3 === 0,
        shared: i === 8,
        icon: <FileText size={20} className="text-green-500" />
      });
    }
    
    // Generate letters
    for (let i = 11; i <= 15; i++) {
      mockDocuments.push({
        id: i,
        name: `List do klienta ${i-10}`,
        type: 'letter',
        category: 'letters',
        created: `${i-5}.03.2025`,
        modified: `${i-2}.03.2025`,
        size: `${50 + i * 10} KB`,
        author: 'Piotr Wiśniewski',
        status: i % 3 === 0 ? 'pending' : (i % 2 === 0 ? 'approved' : 'draft'),
        tags: ['list', 'korespondencja'],
        favorite: false,
        aiGenerated: false,
        shared: i === 15,
        icon: <FileText size={20} className="text-yellow-500" />
      });
    }

    setDocuments(mockDocuments);
    setFilteredDocuments(mockDocuments);
    
    // Simulate AI suggestions being activated after load
    setTimeout(() => {
      setAiSuggestionOpen(true);
      setActiveSuggestions([aiSuggestions[0]]);
    }, 2000);
  }, []);

  // Filter documents based on selected category and search query
  useEffect(() => {
    let filtered = [...documents];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'favorite') {
        filtered = filtered.filter(doc => doc.favorite);
      } else if (selectedCategory === 'shared') {
        filtered = filtered.filter(doc => doc.shared);
      } else if (selectedCategory === 'trash') {
        // Not implemented in this mock
        filtered = [];
      } else {
        filtered = filtered.filter(doc => doc.category === selectedCategory);
      }
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(query) || 
        doc.author.toLowerCase().includes(query) || 
        doc.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Sort documents
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'created':
          // Simple string comparison for dates in DD.MM.YYYY format
          comparison = a.created.localeCompare(b.created);
          break;
        case 'modified':
          comparison = a.modified.localeCompare(b.modified);
          break;
        case 'size':
          // Extract numeric size value from string like "150 KB"
          const sizeA = parseInt(a.size.split(' ')[0]);
          const sizeB = parseInt(b.size.split(' ')[0]);
          comparison = sizeA - sizeB;
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredDocuments(filtered);
  }, [documents, selectedCategory, searchQuery, sortBy, sortDirection]);

  // Handle document selection
  const toggleDocumentSelection = (id) => {
    if (selectedDocs.includes(id)) {
      setSelectedDocs(selectedDocs.filter(docId => docId !== id));
    } else {
      setSelectedDocs([...selectedDocs, id]);
    }
  };

  // Handle select all documents
  const toggleSelectAll = () => {
    if (selectedDocs.length === filteredDocuments.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(filteredDocuments.map(doc => doc.id));
    }
  };

  // Handle document deletion
  const handleDeleteDocuments = () => {
    setDocuments(documents.filter(doc => !selectedDocs.includes(doc.id)));
    setSelectedDocs([]);
    setShowDeleteModal(false);
  };

  // Toggle document favorite status
  const toggleFavorite = (id) => {
    setDocuments(documents.map(doc => 
      doc.id === id ? { ...doc, favorite: !doc.favorite } : doc
    ));
  };

  // Handle document creation
  const handleCreateDocument = () => {
    if (!newDocumentName) return;
    
    const newDocument = {
      id: documents.length + 1,
      name: newDocumentName,
      type: newDocumentType,
      category: selectedTemplate ? selectedTemplate.category : 'templates',
      created: new Date().toLocaleDateString('pl-PL'),
      modified: new Date().toLocaleDateString('pl-PL'),
      size: '0 KB',
      author: 'Jan Kowalski',
      status: 'draft',
      tags: [],
      favorite: false,
      aiGenerated: showAIOptions,
      shared: false,
      icon: <FileText size={20} className="text-purple-500" />
    };
    
    setDocuments([newDocument, ...documents]);
    setNewDocumentName('');
    setSelectedTemplate(null);
    setNewDocumentType('text');
    setShowCreateModal(false);
    setShowAIOptions(false);
  };

  // Simulate AI document analysis
  const analyzeDocument = (docId) => {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return;
    
    setIsDocumentAnalyzing(true);
    setDocumentAnalysis(null);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockAnalysis = {
        documentName: doc.name,
        summary: "Ten dokument zawiera standardową umowę z klientem zgodną z obowiązującymi przepisami.",
        keyPoints: [
          "Umowa zawiera standardowe klauzule dotyczące poufności",
          "Termin realizacji: 30 dni od podpisania",
          "Wartość umowy: 50,000 PLN",
          "Warunki płatności: 14 dni od wystawienia faktury"
        ],
        sentimentAnalysis: "Neutralny",
        readabilityScore: 73,
        suggestions: [
          "Można dodać klauzulę dotyczącą ochrony danych osobowych",
          "Warto zaktualizować paragraf dotyczący kar umownych",
          "Proponuję dodać odniesienie do obowiązujących regulacji branżowych"
        ],
        similarDocuments: [
          { id: 2, name: "Umowa z klientem 2", similarity: "87%" },
          { id: 4, name: "Umowa z klientem 4", similarity: "72%" }
        ]
      };
      
      setDocumentAnalysis(mockAnalysis);
      setIsDocumentAnalyzing(false);
    }, 2000);
  };

  // Handle AI generation request
  const handleAIGenerate = (e) => {
    e.preventDefault();
    if (!aiPrompt) return;
    
    setIsAILoading(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const generatedName = `AI: ${aiPrompt.substring(0, 25)}${aiPrompt.length > 25 ? '...' : ''}`;
      
      const newDocument = {
        id: documents.length + 1,
        name: generatedName,
        type: 'ai-generated',
        category: 'templates',
        created: new Date().toLocaleDateString('pl-PL'),
        modified: new Date().toLocaleDateString('pl-PL'),
        size: `${Math.floor(Math.random() * 200) + 100} KB`,
        author: 'Asystent AI',
        status: 'draft',
        tags: ['AI', 'automatyczny'],
        favorite: false,
        aiGenerated: true,
        shared: false,
        icon: <BrainCircuit size={20} className="text-purple-500" />
      };
      
      setDocuments([newDocument, ...documents]);
      setAiPrompt('');
      setIsAILoading(false);
      setShowAIModal(false);
    }, 3000);
  };

  // Handle AI suggestion action
  const handleAISuggestionAction = (action) => {
    setIsAILoading(true);
    setAiSuggestionOpen(false);
    
    // Simulate AI processing
    setTimeout(() => {
      switch(action) {
        case 'update_contracts':
          // Simulate updating contracts
          setDocuments(documents.map(doc => 
            doc.category === 'contracts' ? 
              { ...doc, modified: new Date().toLocaleDateString('pl-PL'), status: 'approved' } : 
              doc
          ));
          break;
        case 'organize_documents':
          // Simulate categorizing documents
          setDocuments(documents.map(doc => 
            doc.category === 'all' ? 
              { ...doc, category: doc.type === 'contract' ? 'contracts' : 
                          doc.type === 'report' ? 'reports' : 'letters' } : 
              doc
          ));
          break;
        case 'generate_report':
          // Simulate generating a report
          const newReport = {
            id: documents.length + 1,
            name: `Raport miesięczny ${new Date().toLocaleString('pl-PL', { month: 'long' })} 2025`,
            type: 'report',
            category: 'reports',
            created: new Date().toLocaleDateString('pl-PL'),
            modified: new Date().toLocaleDateString('pl-PL'),
            size: '320 KB',
            author: 'Asystent AI',
            status: 'draft',
            tags: ['raport', 'miesięczny', 'AI'],
            favorite: false,
            aiGenerated: true,
            shared: false,
            icon: <FileText size={20} className="text-green-500" />
          };
          setDocuments([newReport, ...documents]);
          break;
        default:
          break;
      }
      
      // Show a new suggestion after completing an action
      setActiveSuggestions([aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)]]);
      setAiSuggestionOpen(true);
      setIsAILoading(false);
    }, 2000);
  };

  // Render status badge based on document status
  const renderStatusBadge = (status) => {
    switch(status) {
      case 'approved':
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300 rounded-full text-xs flex items-center">
            <CheckCircle size={12} className="mr-1" />
            Zatwierdzony
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300 rounded-full text-xs flex items-center">
            <Clock size={12} className="mr-1" />
            Oczekujący
          </span>
        );
      case 'draft':
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300 rounded-full text-xs flex items-center">
            <Edit size={12} className="mr-1" />
            Szkic
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs">
            {status}
          </span>
        );
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark-mode bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dokumenty</h1>
            <p className="text-gray-500 dark:text-gray-400">Zarządzaj, twórz i analizuj dokumenty z pomocą AI</p>
          </div>
          
          <div className="flex space-x-3">
            {selectedDocs.length > 0 ? (
              <>
                <button
                  className="p-2 rounded-lg bg-red-500 text-white flex items-center hover:bg-red-600"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <Trash2 size={16} className="mr-1" />
                  <span>Usuń ({selectedDocs.length})</span>
                </button>
                
                <button
                  className="p-2 rounded-lg bg-blue-500 text-white flex items-center hover:bg-blue-600"
                  onClick={() => setShowShareModal(true)}
                >
                  <Share2 size={16} className="mr-1" />
                  <span>Udostępnij</span>
                </button>
                
                <button
                  className="p-2 rounded-lg bg-green-500 text-white flex items-center hover:bg-green-600"
                >
                  <Download size={16} className="mr-1" />
                  <span>Pobierz</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className="p-2 rounded-lg bg-purple-500 text-white flex items-center hover:bg-purple-600"
                  onClick={() => setShowAIModal(true)}
                >
                  <BrainCircuit size={16} className="mr-1" />
                  <span>AI Asystent</span>
                </button>
                
                <button
                  className="p-2 rounded-lg bg-blue-500 text-white flex items-center hover:bg-blue-600"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus size={16} className="mr-1" />
                  <span>Nowy dokument</span>
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar/Categories */}
          <div className={`${isSidebarOpen ? 'w-full lg:w-64' : 'w-full lg:w-12'} transition-all duration-300 ease-in-out`}>
            <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Kategorie</h2>
                <button 
                  className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <X size={18} />
                </button>
              </div>
              
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.id}>
                    <button
                      className={`w-full flex items-center p-2 rounded-md ${
                        selectedCategory === category.id 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span className="mr-2">{category.icon}</span>
                      <span>{category.name}</span>
                      {category.id === 'contracts' && (
                        <span className="ml-auto bg-blue-500 text-white rounded-full text-xs px-2">5</span>
                      )}
                      {category.id === 'reports' && (
                        <span className="ml-auto bg-green-500 text-white rounded-full text-xs px-2">5</span>
                      )}
                      {category.id === 'letters' && (
                        <span className="ml-auto bg-yellow-500 text-white rounded-full text-xs px-2">5</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-3">Niedawne tagi</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-2 py-1 rounded-md text-xs flex items-center">
                    <Tag size={12} className="mr-1" />
                    umowa
                  </span>
                  <span className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-2 py-1 rounded-md text-xs flex items-center">
                    <Tag size={12} className="mr-1" />
                    raport
                  </span>
                  <span className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-2 py-1 rounded-md text-xs flex items-center">
                    <Tag size={12} className="mr-1" />
                    klient
                  </span>
                  <span className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-2 py-1 rounded-md text-xs flex items-center">
                    <Tag size={12} className="mr-1" />
                    finanse
                  </span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center text-sm font-medium">
                  <HelpCircle size={14} className="mr-1" />
                  Pomoc i wsparcie
                </button>
              </div>
            </div>
            
            {/* Collapsed sidebar toggle (visible only on large screens) */}
            <button
              className="hidden lg:block mt-2 p-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <ChevronRight size={18} /> : <Menu size={18} />}
            </button>
            
            {/* Mobile sidebar toggle (visible only on small screens) */}
            {!isSidebarOpen && (
              <button
                className="lg:hidden fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={20} />
              </button>
            )}
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Szukaj dokumentów..."
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                </div>
                
                <div className="flex gap-2">
                  <button
                    className={`p-2 border ${showFilters ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 dark:border-gray-600 dark:text-gray-400'} rounded-lg flex items-center hover:bg-gray-100 dark:hover:bg-gray-700`}
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter size={16} className="mr-1" />
                    <span>Filtry</span>
                  </button>
                  
                  <button
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                  >
                    <SortAsc size={16} style={{ transform: sortDirection === 'desc' ? 'rotate(180deg)' : 'none' }} />
                  </button>
                  
                  <button
                    className={`p-2 border border-gray-300 dark:border-gray-600 rounded-lg ${activeView === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500 dark:text-gray-400'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                    onClick={() => setActiveView('grid')}
                  >
                    <div className="flex items-center space-x-0.5">
                      <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
                      <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
                    </div>
                  </button>
                  
                  <button
                    className={`p-2 border border-gray-300 dark:border-gray-600 rounded-lg ${activeView === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500 dark:text-gray-400'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                    onClick={() => setActiveView('list')}
                  >
                    <div className="flex flex-col items-center space-y-0.5">
                      <div className="w-3 h-0.5 rounded-sm bg-current"></div>
                      <div className="w-3 h-0.5 rounded-sm bg-current"></div>
                      <div className="w-3 h-0.5 rounded-sm bg-current"></div>
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Expanded filters */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                    <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white">
                      <option value="all">Wszystkie statusy</option>
                      <option value="draft">Szkic</option>
                      <option value="pending">Oczekujący</option>
                      <option value="approved">Zatwierdzony</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data modyfikacji</label>
                    <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white">
                      <option value="all">Dowolna data</option>
                      <option value="today">Dzisiaj</option>
                      <option value="week">W tym tygodniu</option>
                      <option value="month">W tym miesiącu</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Autor</label>
                    <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white">
                      <option value="all">Wszyscy autorzy</option>
                      <option value="me">Tylko moje</option>
                      <option value="ai">Generowane przez AI</option>
                    </select>
                  </div>
                  
                  <div className="sm:col-span-3 flex justify-end">
                    <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300 text-sm mr-2">
                      Wyczyść filtry
                    </button>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                      Zastosuj
                    </button>
                  </div>
                </div>
              )}
              
              {/* Sort options */}
              <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="mr-2">Sortuj według:</span>
                <button 
                  className={`mr-3 ${sortBy === 'name' ? 'font-semibold text-blue-500 dark:text-blue-400' : ''}`}
                  onClick={() => setSortBy('name')}
                >
                  Nazwa
                </button>
                <button 
                  className={`mr-3 ${sortBy === 'modified' ? 'font-semibold text-blue-500 dark:text-blue-400' : ''}`}
                  onClick={() => setSortBy('modified')}
                >
                  Data modyfikacji
                </button>
                <button 
                  className={`mr-3 ${sortBy === 'created' ? 'font-semibold text-blue-500 dark:text-blue-400' : ''}`}
                  onClick={() => setSortBy('created')}
                >
                  Data utworzenia
                </button>
                <button 
                  className={`${sortBy === 'size' ? 'font-semibold text-blue-500 dark:text-blue-400' : ''}`}
                  onClick={() => setSortBy('size')}
                >
                  Rozmiar
                </button>
              </div>
            </div>
            
            {/* Document Display */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
              {/* Document count and select all */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Pokazuje {filteredDocuments.length} z {documents.length} dokumentów
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedDocs.length === filteredDocuments.length && filteredDocuments.length > 0}
                    onChange={toggleSelectAll}
                  />
                  <span className="text-sm">Zaznacz wszystkie</span>
                </div>
              </div>
              
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-12">
                  <FileText size={48} className="mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">Brak dokumentów</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Nie znaleziono dokumentów pasujących do wybranych kryteriów
                  </p>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                  >
                    Wyczyść filtry
                  </button>
                </div>
              ) : activeView === 'grid' ? (
                // Grid View
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDocuments.map(doc => (
                    <div 
                      key={doc.id}
                      className={`border ${selectedDocs.includes(doc.id) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20' : 'border-gray-200 dark:border-gray-700'} rounded-lg p-4 hover:shadow-md transition-shadow relative`}
                    >
                      {/* Selection checkbox */}
                      <div className="absolute top-2 right-2">
                        <input
                          type="checkbox"
                          checked={selectedDocs.includes(doc.id)}
                          onChange={() => toggleDocumentSelection(doc.id)}
                          className="h-4 w-4"
                        />
                      </div>
                      
                      {/* Document icon and name */}
                      <div className="flex items-center mb-3">
                        {doc.icon}
                        <h3 className="font-medium ml-2 truncate">{doc.name}</h3>
                      </div>
                      
                      {/* Document metadata */}
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <p className="flex items-center mb-1">
                          <Calendar size={14} className="mr-1" />
                          <span>Zmodyfikowano: {doc.modified}</span>
                        </p>
                        <p className="flex items-center">
                          <Users size={14} className="mr-1" />
                          <span>{doc.author}</span>
                        </p>
                      </div>
                      
                      {/* Status badge and size */}
                      <div className="flex items-center justify-between mb-3">
                        {renderStatusBadge(doc.status)}
                        <span className="text-xs text-gray-500 dark:text-gray-400">{doc.size}</span>
                      </div>
                      
                      {/* AI generated badge */}
                      {doc.aiGenerated && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-30 dark:text-purple-300 px-1.5 py-0.5 rounded text-xs flex items-center">
                            <Zap size={10} className="mr-0.5" />
                            AI
                          </span>
                        </div>
                      )}
                      
                      {/* Actions */}
                      <div className="flex border-t border-gray-200 dark:border-gray-700 pt-3 mt-2">
                        <button 
                          className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 mr-2"
                          onClick={() => analyzeDocument(doc.id)}
                        >
                          <Search size={16} />
                        </button>
                        <button 
                          className="text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400 mr-2"
                          onClick={() => toggleFavorite(doc.id)}
                        >
                          <Star size={16} fill={doc.favorite ? 'currentColor' : 'none'} />
                        </button>
                        <button className="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 mr-2">
                          <Download size={16} />
                        </button>
                        <button className="text-gray-500 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400 mr-2">
                          <Share2 size={16} />
                        </button>
                        <button className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // List View
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            checked={selectedDocs.length === filteredDocuments.length && filteredDocuments.length > 0}
                            onChange={toggleSelectAll}
                            className="mr-2"
                          />
                          Nazwa
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Autor
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Data modyfikacji
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Rozmiar
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Akcje
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredDocuments.map(doc => (
                        <tr 
                          key={doc.id}
                          className={selectedDocs.includes(doc.id) ? 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}
                        >
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedDocs.includes(doc.id)}
                                onChange={() => toggleDocumentSelection(doc.id)}
                                className="mr-2"
                              />
                              <div className="flex items-center">
                                {doc.icon}
                                <span className="ml-2 font-medium">{doc.name}</span>
                                {doc.aiGenerated && (
                                  <span className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-30 dark:text-purple-300 px-1.5 py-0.5 rounded text-xs flex items-center">
                                    <Zap size={10} className="mr-0.5" />
                                    AI
                                  </span>
                                )}
                                {doc.favorite && (
                                  <Star size={16} className="ml-2 text-yellow-500" fill="currentColor" />
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {renderStatusBadge(doc.status)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {doc.author}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {doc.modified}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {doc.size}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                              onClick={() => analyzeDocument(doc.id)}
                            >
                              <Search size={16} />
                            </button>
                            <button className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                              <Edit size={16} />
                            </button>
                            <button className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                              <Download size={16} />
                            </button>
                            <button className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                              <Share2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            {/* Document Analysis Panel (shown when a document is being analyzed) */}
            {(isDocumentAnalyzing || documentAnalysis) && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6 border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg flex items-center">
                    <BrainCircuit size={20} className="mr-2 text-blue-500" />
                    Analiza AI dokumentu
                  </h3>
                  <button 
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={() => {
                      setIsDocumentAnalyzing(false);
                      setDocumentAnalysis(null);
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
                
                {isDocumentAnalyzing ? (
                  <div className="flex flex-col items-center py-6">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-500 dark:text-gray-400">Analizowanie dokumentu...</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">To zajmie tylko chwilę</p>
                  </div>
                ) : documentAnalysis && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Podsumowanie</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{documentAnalysis.summary}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Kluczowe punkty</h4>
                        <ul className="space-y-2">
                          {documentAnalysis.keyPoints.map((point, index) => (
                            <li key={index} className="flex text-sm">
                              <ArrowUpRight size={16} className="mr-2 text-blue-500 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Sugestie usprawnień</h4>
                        <ul className="space-y-2">
                          {documentAnalysis.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex text-sm">
                              <Zap size={16} className="mr-2 text-purple-500 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400 mb-1">Wydźwięk dokumentu</p>
                        <p className="font-medium text-gray-900 dark:text-white">{documentAnalysis.sentimentAnalysis}</p>
                      </div>
                      
                      <div className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400 mb-1">Czytelność</p>
                        <p className="font-medium text-gray-900 dark:text-white">{documentAnalysis.readabilityScore}/100</p>
                      </div>
                      
                      <div className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400 mb-1">Podobne dokumenty</p>
                        <div className="space-y-1">
                          {documentAnalysis.similarDocuments.map((doc, index) => (
                            <p key={index} className="font-medium text-gray-900 dark:text-white text-xs flex items-center justify-between">
                              <span className="truncate">{doc.name}</span>
                              <span className="ml-2">{doc.similarity}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 flex items-center">
                        <Zap size={16} className="mr-2" />
                        Zastosuj sugestie AI
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modals */}
      
      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex items-center text-red-500 mb-4">
              <AlertCircle size={24} className="mr-2" />
              <h3 className="text-lg font-medium">Potwierdź usunięcie</h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Czy na pewno chcesz usunąć {selectedDocs.length} {selectedDocs.length === 1 ? 'dokument' : selectedDocs.length < 5 ? 'dokumenty' : 'dokumentów'}? 
              Tej operacji nie można cofnąć.
            </p>
            
            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-gray-500 mr-2"
                onClick={() => setShowDeleteModal(false)}
              >
                Anuluj
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDeleteDocuments}
              >
                Usuń
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Share modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Udostępnij dokumenty</h3>
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setShowShareModal(false)}
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Użytkownicy
              </label>
              <input 
                type="text"
                placeholder="Wprowadź email użytkownika..."
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Uprawnienia
              </label>
              <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                <option value="view">Podgląd</option>
                <option value="comment">Komentowanie</option>
                <option value="edit">Edycja</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Link do udostępnienia
              </label>
              <div className="flex">
                <input 
                  type="text"
                  value="https://example.com/shared/documents/xyz123"
                  readOnly
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg dark:bg-gray-700 dark:text-white"
                />
                <button className="bg-gray-200 dark:bg-gray-600 p-2 rounded-r-lg">
                  <Copy size={16} />
                </button>
              </div>
              <div className="flex items-center mt-2">
                <input type="checkbox" id="allow-anyone" className="mr-2" />
                <label htmlFor="allow-anyone" className="text-sm text-gray-600 dark:text-gray-300">
                  Zezwól na dostęp każdemu z linkiem
                </label>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-gray-500 mr-2"
                onClick={() => setShowShareModal(false)}
              >
                Anuluj
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setShowShareModal(false)}
              >
                Udostępnij
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Create document modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Utwórz nowy dokument</h3>
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setShowCreateModal(false)}
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nazwa dokumentu
              </label>
              <input 
                type="text"
                value={newDocumentName}
                onChange={(e) => setNewDocumentName(e.target.value)}
                placeholder="Wprowadź nazwę dokumentu..."
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Typ dokumentu
              </label>
              <select 
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                value={newDocumentType}
                onChange={(e) => setNewDocumentType(e.target.value)}
              >
                <option value="text">Dokument tekstowy</option>
                <option value="contract">Umowa</option>
                <option value="report">Raport</option>
                <option value="letter">List</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Szablon
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {documentTemplates.map(template => (
                  <div 
                    key={template.id}
                    className={`border ${selectedTemplate && selectedTemplate.id === template.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20' : 'border-gray-200 dark:border-gray-700'} rounded-lg p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className="mb-2">
                      {template.icon}
                    </div>
                    <span className="text-sm">{template.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6 flex items-center">
              <input 
                type="checkbox" 
                id="use-ai" 
                className="mr-2"
                checked={showAIOptions}
                onChange={() => setShowAIOptions(!showAIOptions)}
              />
              <label htmlFor="use-ai" className="flex items-center text-sm">
                <Zap size={16} className="mr-1 text-purple-500" />
                Użyj AI do generowania dokumentu
              </label>
            </div>
            
            {showAIOptions && (
              <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  AI pomoże Ci wygenerować treść dokumentu na podstawie wybranego szablonu i wprowadzonych danych.
                </p>
                
                <textarea
                  placeholder="Opisz, co powinien zawierać dokument..."
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white text-sm min-h-20"
                ></textarea>
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-gray-500 mr-2"
                onClick={() => setShowCreateModal(false)}
              >
                Anuluj
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                onClick={handleCreateDocument}
                disabled={!newDocumentName}
              >
                {showAIOptions ? (
                  <>
                    <Zap size={16} className="mr-1" />
                    Generuj z AI
                  </>
                ) : (
                  <>
                    <Plus size={16} className="mr-1" />
                    Utwórz
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* AI Assistant Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <BrainCircuit size={20} className="mr-2 text-purple-500" />
                Asystent AI
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setShowAIModal(false)}
              >
                <X size={18} />
              </button>
            </div>
            
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Opisz, jaki dokument chcesz wygenerować, a AI stworzy go dla Ciebie.
            </p>
            
            <form onSubmit={handleAIGenerate}>
              <textarea
                placeholder="Np. Stwórz umowę o współpracy z firmą XYZ na świadczenie usług marketingowych..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-h-32 mb-4"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              ></textarea>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                <Zap size={16} className="mr-1 text-purple-500" />
                <span>Podpowiedź: Im bardziej szczegółowy opis, tym lepszy efekt</span>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-500 mr-2"
                  onClick={() => setShowAIModal(false)}
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 flex items-center"
                  disabled={isAILoading || !aiPrompt}
                >
                  {isAILoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generowanie...
                    </>
                  ) : (
                    <>
                      <BrainCircuit size={16} className="mr-2" />
                      Generuj dokument
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* AI Suggestions Popup */}
      {aiSuggestionOpen && activeSuggestions.length > 0 && (
        <div className="fixed bottom-4 right-4 max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border-l-4 border-purple-500 z-20">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium flex items-center text-sm">
              <Zap size={16} className="mr-1 text-purple-500" />
              Sugestia AI
            </h4>
            <button
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setAiSuggestionOpen(false)}
            >
              <X size={16} />
            </button>
          </div>
          
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {activeSuggestions[0].description}
          </p>
          
          <div className="flex justify-end">
            <button
              className="px-3 py-1 text-gray-500 mr-2 text-sm"
              onClick={() => setAiSuggestionOpen(false)}
            >
              Później
            </button>
            <button
              className="px-3 py-1 bg-purple-500 text-white rounded text-sm flex items-center"
              onClick={() => handleAISuggestionAction(activeSuggestions[0].action)}
              disabled={isAILoading}
            >
              {isAILoading ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                  Pracuję...
                </>
              ) : (
                <>
                  <Zap size={12} className="mr-1" />
                  Wykonaj
                </>
              )}
            </button>
          </div>
        </div>
      )}
      
      {/* Loading overlay */}
      {isAILoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
            <span>Asystent AI pracuje...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;