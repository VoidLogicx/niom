import React, { useState, useEffect } from 'react';
import { 
  FileText, Plus, Search, Filter, BrainCircuit, Zap, 
  Clock, ArrowUpRight, Download, Share2, Copy, RefreshCw,
  Users, Clipboard, BarChart2, MessageSquare, Check
} from 'lucide-react';
import Card from './components/ui/Card';
import Button from './components/ui/Button';
import StatusBadge from './components/ui/StatusBadge';
import ActivityFeed from './components/ui/ActivityFeed';
import DataTable from './components/ui/DataTable';

// Main application component
const BiuroAIApp = () => {
  // State
  const [darkMode, setDarkMode] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [activeTab, setActiveTab] = useState('documents');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('all');
  const [isCreatingDoc, setIsCreatingDoc] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);
  
  // Mock document types for filtering
  const documentTypes = [
    { id: 'all', name: 'Wszystkie typy' },
    { id: 'contract', name: 'Umowy' },
    { id: 'report', name: 'Raporty' },
    { id: 'memo', name: 'Notatki' },
    { id: 'proposal', name: 'Oferty' },
    { id: 'letter', name: 'Listy' }
  ];

  // Load initial data
  useEffect(() => {
    // Simulate API call to load documents
    const mockDocuments = [
      {
        id: 1,
        title: 'Umowa z klientem ABC',
        type: 'contract',
        status: 'Ukończony',
        createdAt: '10.03.2025',
        lastModified: '12.03.2025',
        author: 'Jan Kowalski',
        aiGenerated: true,
        wordCount: 1250
      },
      {
        id: 2,
        title: 'Raport kwartalny Q1',
        type: 'report',
        status: 'W trakcie',
        createdAt: '15.03.2025',
        lastModified: '15.03.2025',
        author: 'Anna Nowak',
        aiGenerated: true,
        wordCount: 3420
      },
      {
        id: 3,
        title: 'Notatka ze spotkania zarządu',
        type: 'memo',
        status: 'Ukończony',
        createdAt: '08.03.2025',
        lastModified: '08.03.2025',
        author: 'Piotr Wiśniewski',
        aiGenerated: false,
        wordCount: 550
      },
      {
        id: 4,
        title: 'Oferta dla firmy XYZ',
        type: 'proposal',
        status: 'Oczekuje na przegląd',
        createdAt: '14.03.2025',
        lastModified: '16.03.2025',
        author: 'Jan Kowalski',
        aiGenerated: true,
        wordCount: 1850
      },
      {
        id: 5,
        title: 'Propozycja współpracy',
        type: 'letter',
        status: 'Szkic',
        createdAt: '18.03.2025',
        lastModified: '18.03.2025',
        author: 'Anna Nowak',
        aiGenerated: true,
        wordCount: 420
      }
    ];
    
    // Mock templates
    const mockTemplates = [
      {
        id: 1,
        title: 'Umowa o pracę',
        type: 'contract',
        category: 'HR',
        lastUsed: '05.03.2025',
        popularity: 'Wysoka'
      },
      {
        id: 2,
        title: 'NDA',
        type: 'contract',
        category: 'Prawne',
        lastUsed: '10.03.2025',
        popularity: 'Średnia'
      },
      {
        id: 3,
        title: 'Raport miesięczny',
        type: 'report',
        category: 'Finanse',
        lastUsed: '01.03.2025',
        popularity: 'Wysoka'
      },
      {
        id: 4,
        title: 'Oferta handlowa',
        type: 'proposal',
        category: 'Sprzedaż',
        lastUsed: '12.03.2025',
        popularity: 'Wysoka'
      },
      {
        id: 5,
        title: 'Notatka ze spotkania',
        type: 'memo',
        category: 'Zarządzanie',
        lastUsed: '08.03.2025',
        popularity: 'Średnia'
      }
    ];
    
    setDocuments(mockDocuments);
    setTemplates(mockTemplates);
  }, []);
  
  // Mock activities for the feed
  const recentActivities = [
    {
      id: 1,
      type: 'Nowy dokument',
      description: 'Anna utworzyła nowy dokument "Raport kwartalny Q1"',
      date: 'Dzisiaj, 10:23',
      status: 'Ukończone'
    },
    {
      id: 2,
      type: 'Edycja dokumentu',
      description: 'Jan zmodyfikował "Umowa z klientem ABC"',
      date: 'Dzisiaj, 09:45',
      status: 'Ukończone'
    },
    {
      id: 3,
      type: 'Komentarz',
      description: 'Piotr skomentował dokument "Oferta dla firmy XYZ"',
      date: 'Wczoraj, 16:30',
      status: 'Oczekujące'
    },
    {
      id: 4,
      type: 'Zatwierdzenie',
      description: 'Dyrektor zatwierdził "Notatka ze spotkania zarządu"',
      date: 'Wczoraj, 14:15',
      status: 'Ukończone'
    }
  ];
  
  // Handle document creation
  const handleCreateDocument = () => {
    if (isCreatingDoc && newDocTitle.trim()) {
      // Add new document
      const newDoc = {
        id: documents.length + 1,
        title: newDocTitle,
        type: 'memo', // Default type
        status: 'Szkic',
        createdAt: new Date().toLocaleDateString('pl-PL'),
        lastModified: new Date().toLocaleDateString('pl-PL'),
        author: 'Jan Kowalski', // Current user
        aiGenerated: false,
        wordCount: 0
      };
      
      setDocuments([newDoc, ...documents]);
      setNewDocTitle('');
      setIsCreatingDoc(false);
    } else {
      setIsCreatingDoc(true);
    }
  };
  
  // Filter documents based on search and filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedDocType === 'all' || doc.type === selectedDocType;
    return matchesSearch && matchesType;
  });
  
  // Handle document download
  const handleDownloadDocument = (docId) => {
    alert(`Pobieranie dokumentu o ID: ${docId}`);
  };
  
  // Generate AI insights
  const generateAIInsights = () => {
    setAiLoading(true);
    setShowAIInsights(true);
    
    // Simulate API call
    setTimeout(() => {
      const insights = {
        documentMetrics: {
          totalCount: documents.length,
          aiGeneratedCount: documents.filter(d => d.aiGenerated).length,
          averageWordCount: Math.round(documents.reduce((sum, doc) => sum + doc.wordCount, 0) / documents.length),
          documentsThisMonth: 4
        },
        topAuthors: [
          { name: 'Jan Kowalski', count: 2 },
          { name: 'Anna Nowak', count: 2 },
          { name: 'Piotr Wiśniewski', count: 1 }
        ],
        documentsByType: [
          { type: 'Umowy', count: 1 },
          { type: 'Raporty', count: 1 },
          { type: 'Notatki', count: 1 },
          { type: 'Oferty', count: 1 },
          { type: 'Listy', count: 1 }
        ],
        timeMetrics: {
          averageCreationTime: '45 minut',
          timeSaved: '12 godzin',
          mostProductiveDay: 'Środa'
        },
        recommendations: [
          'Użyj szablonu "Raport miesięczny" aby przyspieszyć tworzenie raportów',
          'Dokumenty tworzone z pomocą AI są o 65% szybciej tworzone',
          'Najczęściej edytowane sekcje to "Warunki płatności" - rozważ stworzenie lepszego szablonu'
        ]
      };
      
      setAiInsights(insights);
      setAiLoading(false);
    }, 1500);
  };
  
  // Table columns configuration for documents
  const documentsColumns = [
    { 
      header: 'Tytuł', 
      accessor: 'title',
      cell: (value, row) => (
        <div className="flex items-center">
          <FileText size={16} className="mr-2 text-blue-500" />
          <span className="font-medium">{value}</span>
          {row.aiGenerated && (
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-30 dark:text-purple-300 rounded">AI</span>
          )}
        </div>
      )
    },
    { 
      header: 'Typ', 
      accessor: 'type',
      cell: (value) => {
        const docType = documentTypes.find(t => t.id === value);
        return docType ? docType.name.replace('Wszystkie ', '') : value;
      }
    },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (value) => (
        <StatusBadge 
          status={value} 
          color={
            value === 'Ukończony' ? 'green' : 
            value === 'W trakcie' ? 'blue' : 
            value === 'Oczekuje na przegląd' ? 'yellow' : 
            'purple'
          } 
        />
      )
    },
    { header: 'Utworzony', accessor: 'createdAt' },
    { header: 'Ostatnia zmiana', accessor: 'lastModified' },
    { 
      header: 'Akcje', 
      accessor: 'id',
      cell: (value) => (
        <div className="flex space-x-2">
          <Button 
            variant="link" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              alert(`Edycja dokumentu: ${value}`);
            }}
          >
            Edytuj
          </Button>
          <Button 
            variant="link" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadDocument(value);
            }}
          >
            Pobierz
          </Button>
        </div>
      )
    },
  ];
  
  // Table columns configuration for templates
  const templatesColumns = [
    { 
      header: 'Nazwa szablonu', 
      accessor: 'title',
      cell: (value) => (
        <div className="flex items-center">
          <FileText size={16} className="mr-2 text-green-500" />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    { 
      header: 'Kategoria', 
      accessor: 'category',
      cell: (value) => (
        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
          {value}
        </span>
      )
    },
    { header: 'Typ', accessor: 'type' },
    { header: 'Ostatnio użyty', accessor: 'lastUsed' },
    { 
      header: 'Popularność', 
      accessor: 'popularity',
      cell: (value) => (
        <div className="flex items-center">
          {value === 'Wysoka' ? (
            <span className="text-green-600 flex items-center">
              <ArrowUpRight size={14} className="mr-1" />
              Wysoka
            </span>
          ) : value === 'Średnia' ? (
            <span className="text-yellow-600 flex items-center">
              <ArrowUpRight size={14} className="mr-1" transform="rotate(45)" />
              Średnia
            </span>
          ) : (
            <span className="text-gray-600">Niska</span>
          )}
        </div>
      )
    },
    { 
      header: 'Akcje', 
      accessor: 'id',
      cell: (value) => (
        <div className="flex space-x-2">
          <Button 
            variant="link" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              alert(`Tworzenie dokumentu z szablonu: ${value}`);
            }}
          >
            Użyj
          </Button>
          <Button 
            variant="link" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              alert(`Podgląd szablonu: ${value}`);
            }}
          >
            Podgląd
          </Button>
        </div>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Top navigation bar */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FileText size={24} className="text-blue-500 mr-2" />
              <h1 className="text-xl font-bold">Biuro AI</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
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
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page title and actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Zarządzanie dokumentami</h2>
          <div className="flex space-x-2">
            <Button 
              variant={showAIInsights ? "outline" : "primary"}
              color="blue" 
              className="flex items-center"
              onClick={() => {
                if (showAIInsights) {
                  setShowAIInsights(false);
                } else {
                  generateAIInsights();
                }
              }}
            >
              <BrainCircuit size={16} className="mr-2" />
              {showAIInsights ? 'Ukryj insighty AI' : 'Analiza AI'}
            </Button>
            
            <Button 
              onClick={handleCreateDocument} 
              className="flex items-center"
            >
              <Plus size={16} className="mr-2" />
              Nowy dokument
            </Button>
          </div>
        </div>
        
        {/* Document creation form (shows when isCreatingDoc is true) */}
        {isCreatingDoc && (
          <Card darkMode={darkMode} className="mb-6">
            <h3 className="font-semibold mb-4">Utwórz nowy dokument</h3>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Wprowadź tytuł dokumentu"
                value={newDocTitle}
                onChange={(e) => setNewDocTitle(e.target.value)}
                className={`flex-1 px-3 py-2 border rounded-lg ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
              <Button
                onClick={handleCreateDocument}
              >
                Utwórz
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCreatingDoc(false)}
              >
                Anuluj
              </Button>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">lub stwórz z pomocą AI:</p>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center"
                  onClick={() => {
                    setNewDocTitle('Wygenerowany przez AI raport kwartalny');
                    handleCreateDocument();
                  }}
                >
                  <Zap size={14} className="mr-2 text-purple-500" />
                  Raport kwartalny
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center"
                  onClick={() => {
                    setNewDocTitle('Wygenerowana przez AI umowa NDA');
                    handleCreateDocument();
                  }}
                >
                  <Zap size={14} className="mr-2 text-purple-500" />
                  Umowa NDA
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center"
                  onClick={() => {
                    setNewDocTitle('Wygenerowana przez AI oferta handlowa');
                    handleCreateDocument();
                  }}
                >
                  <Zap size={14} className="mr-2 text-purple-500" />
                  Oferta handlowa
                </Button>
              </div>
            </div>
          </Card>
        )}
        
        {/* AI Insights Panel */}
        {showAIInsights && (
          <Card darkMode={darkMode} className="mb-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <BrainCircuit size={20} className="mr-2 text-blue-500" />
                <h3 className="font-semibold">Analiza dokumentów AI</h3>
              </div>
              <Button 
                variant="link" 
                size="sm"
                onClick={() => setShowAIInsights(false)}
              >
                Ukryj
              </Button>
            </div>
            
            {aiLoading ? (
              <div className="flex items-center justify-center p-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-2">Analizowanie dokumentów...</span>
              </div>
            ) : aiInsights ? (
              <div className="mt-4 space-y-6">
                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className="text-gray-500 text-sm">Dokumenty</p>
                    <p className="text-2xl font-bold">{aiInsights.documentMetrics.totalCount}</p>
                    <p className="text-green-500 text-sm">+{aiInsights.documentMetrics.documentsThisMonth} w tym miesiącu</p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className="text-gray-500 text-sm">Utworzone przez AI</p>
                    <p className="text-2xl font-bold">{aiInsights.documentMetrics.aiGeneratedCount}</p>
                    <p className="text-purple-500 text-sm">{Math.round(aiInsights.documentMetrics.aiGeneratedCount / aiInsights.documentMetrics.totalCount * 100)}% wszystkich</p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className="text-gray-500 text-sm">Średnia długość</p>
                    <p className="text-2xl font-bold">{aiInsights.documentMetrics.averageWordCount}</p>
                    <p className="text-gray-500 text-sm">słów</p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className="text-gray-500 text-sm">Zaoszczędzony czas</p>
                    <p className="text-2xl font-bold">{aiInsights.timeMetrics.timeSaved}</p>
                    <p className="text-blue-500 text-sm">dzięki AI</p>
                  </div>
                </div>
                
                {/* Recommendations */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center">
                    <Zap size={16} className="mr-2 text-yellow-500" />
                    Rekomendacje AI
                  </h4>
                  
                  <div className="space-y-2">
                    {aiInsights.recommendations.map((rec, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-start`}
                      >
                        <Check size={16} className="mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                        <p>{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </Card>
        )}
        
        {/* Search and filters */}
        <Card darkMode={darkMode} className="mb-6">
          <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
            {/* Search input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Szukaj dokumentów..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-9 pr-3 py-2 border rounded-lg w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            
            {/* Filter button */}
            <Button 
              variant={showFilters ? 'primary' : 'outline'} 
              className="flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} className="mr-1" />
              <span>Filtry</span>
            </Button>
          </div>
          
          {/* Expanded filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-500 mb-1">Typ dokumentu</label>
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
                  <label className="block text-gray-500 mb-1">Status</label>
                  <select
                    className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  >
                    <option value="all">Wszystkie statusy</option>
                    <option value="completed">Ukończone</option>
                    <option value="in_progress">W trakcie</option>
                    <option value="review">Oczekuje na przegląd</option>
                    <option value="draft">Szkic</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-500 mb-1">Autor</label>
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
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedDocType('all');
                  }}
                >
                  Wyczyść filtry
                </Button>
                
                <Button 
                  size="sm"
                >
                  Zastosuj
                </Button>
              </div>
            </div>
          )}
        </Card>
        
        {/* Tab navigation */}
        <div className="flex border-b dark:border-gray-700 mb-6">
          <button
            className={`pb-4 px-1 mr-8 font-medium ${
              activeTab === 'documents' 
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('documents')}
          >
            Dokumenty
          </button>
          <button
            className={`pb-4 px-1 mr-8 font-medium ${
              activeTab === 'templates' 
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('templates')}
          >
            Szablony
          </button>
          <button
            className={`pb-4 px-1 font-medium ${
              activeTab === 'shared' 
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('shared')}
          >
            Udostępnione
          </button>
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Documents table - takes up 2/3 of the width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <Card darkMode={darkMode}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">
                  {activeTab === 'documents' ? 'Twoje dokumenty' : 
                   activeTab === 'templates' ? 'Dostępne szablony' : 
                   'Udostępnione dokumenty'}
                </h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center"
                  onClick={() => {
                    // Refresh documents list
                    alert('Odświeżanie listy dokumentów...');
                  }}
                >
                  <RefreshCw size={14} className="mr-1" />
                  Odśwież
                </Button>
              </div>
              
              <DataTable
                columns={activeTab === 'templates' ? templatesColumns : documentsColumns}
                data={activeTab === 'templates' ? templates : filteredDocuments}
                darkMode={darkMode}
                onRowClick={(row) => alert(`Otwieranie ${activeTab === 'templates' ? 'szablonu' : 'dokumentu'}: ${row.title}`)}
              />
              
              {activeTab === 'documents' && filteredDocuments.length === 0 && (
                <div className="text-center py-8">
                  <FileText size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">Nie znaleziono dokumentów</p>
                  <Button
                    onClick={handleCreateDocument}
                    className="mt-4"
                  >
                    Utwórz dokument
                  </Button>
                </div>
              )}
            </Card>
            
            {/* Document statistics */}
            {activeTab === 'documents' && (
              <Card darkMode={darkMode}>
                <h3 className="font-semibold mb-4 flex items-center">
                  <BarChart2 size={16} className="mr-2" />
                  Statystyki
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
                    <p className="text-sm text-gray-500">Całkowita liczba</p>
                    <p className="text-2xl font-bold">{documents.length}</p>
                    <p className="text-blue-500 text-sm flex items-center">
                      <ArrowUpRight size={14} className="mr-1" />
                      +2 od ostatniego miesiąca
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg">
                    <p className="text-sm text-gray-500">Ukończone</p>
                    <p className="text-2xl font-bold">
                      {documents.filter(d => d.status === 'Ukończony').length}
                    </p>
                    <p className="text-green-500 text-sm">
                      {Math.round(documents.filter(d => d.status === 'Ukończony').length / documents.length * 100)}% wszystkich
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg">
                    <p className="text-sm text-gray-500">Utworzone przez AI</p>
                    <p className="text-2xl font-bold">
                      {documents.filter(d => d.aiGenerated).length}
                    </p>
                    <p className="text-purple-500 text-sm">
                      {Math.round(documents.filter(d => d.aiGenerated).length / documents.length * 100)}% wszystkich
                    </p>
                  </div>
                </div>
              </Card>
            )}
            
            {/* Template recommendations */}
            {activeTab === 'templates' && (
              <Card darkMode={darkMode}>
                <h3 className="font-semibold mb-4 flex items-center">
                  <Zap size={16} className="mr-2 text-purple-500" />
                  Rekomendowane szablony
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-10 w-10 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center">
                        <Zap size={18} className="text-purple-600 dark:text-purple-300" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Oferta handlowa</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Na podstawie Twojej historii, ten szablon może być przydatny do przygotowania ofert dla nowych klientów.
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => alert('Tworzenie dokumentu z szablonu "Oferta handlowa"')}
                      >
                        Użyj szablonu
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-10 w-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                        <FileText size={18} className="text-blue-600 dark:text-blue-300" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Raport miesięczny</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Zbliża się koniec miesiąca - czas na przygotowanie raportu!
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => alert('Tworzenie dokumentu z szablonu "Raport miesięczny"')}
                      >
                        Użyj szablonu
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent activity feed */}
            <Card darkMode={darkMode}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold flex items-center">
                  <Clock size={16} className="mr-2" />
                  Ostatnia aktywność
                </h3>
                <Button variant="link" size="sm">
                  Zobacz wszystko
                </Button>
              </div>
              
              <ActivityFeed 
                activities={recentActivities} 
                darkMode={darkMode} 
              />
            </Card>
            
            {/* Quick actions */}
            <Card darkMode={darkMode}>
              <h3 className="font-semibold mb-4">Szybkie akcje</h3>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  fullWidth 
                  className="flex items-center justify-start"
                  onClick={handleCreateDocument}
                >
                  <Plus size={16} className="mr-2 text-blue-500" />
                  Nowy dokument
                </Button>
                
                <Button 
                  variant="outline" 
                  fullWidth 
                  className="flex items-center justify-start"
                  onClick={() => alert('Otwieranie asystenta AI...')}
                >
                  <BrainCircuit size={16} className="mr-2 text-purple-500" />
                  Asystent AI
                </Button>
                
                <Button 
                  variant="outline" 
                  fullWidth 
                  className="flex items-center justify-start"
                  onClick={() => alert('Udostępnianie dokumentu...')}
                >
                  <Share2 size={16} className="mr-2 text-green-500" />
                  Udostępnij
                </Button>
                
                <Button 
                  variant="outline" 
                  fullWidth 
                  className="flex items-center justify-start"
                  onClick={() => alert('Otwieranie czatu zespołowego...')}
                >
                  <MessageSquare size={16} className="mr-2 text-yellow-500" />
                  Czat zespołowy
                </Button>
              </div>
            </Card>
            
            {/* Team collaboration */}
            <Card darkMode={darkMode}>
              <h3 className="font-semibold mb-4 flex items-center">
                <Users size={16} className="mr-2" />
                Współpraca zespołowa
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                      AN
                    </div>
                    <span className="ml-2">Anna Nowak</span>
                  </div>
                  <span className="flex items-center text-green-500">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
                    Online
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      PW
                    </div>
                    <span className="ml-2">Piotr Wiśniewski</span>
                  </div>
                  <span className="flex items-center text-gray-500">
                    <div className="h-2 w-2 bg-gray-500 rounded-full mr-1"></div>
                    Offline
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                      KL
                    </div>
                    <span className="ml-2">Katarzyna Lewandowska</span>
                  </div>
                  <span className="flex items-center text-yellow-500">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full mr-1"></div>
                    Zajęty
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <Button 
                  size="sm" 
                  fullWidth
                >
                  Rozpocznij współpracę
                </Button>
              </div>
            </Card>
            
            {/* Tips section */}
            <Card darkMode={darkMode}>
              <h3 className="font-semibold mb-3 flex items-center">
                <Zap size={16} className="mr-2 text-blue-500" />
                Porady
              </h3>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
                <p className="text-sm">
                  Wiedziałeś, że możesz użyć AI do automatycznego wygenerowania całego dokumentu? 
                  Wystarczy podać temat i AI stworzy pierwszą wersję!
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-1 text-blue-600"
                  onClick={() => alert('Otwieranie poradnika AI...')}
                >
                  Dowiedz się więcej
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BiuroAIApp;