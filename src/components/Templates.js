import React, { useState, useEffect } from 'react';
import '../css/Templates.css';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Copy, 
  Clock, 
  Users, 
  Tag,
  Zap,
  BrainCircuit,
  ArrowRight,
  CheckCircle,
  ArrowUpRight,
  Star,
  BarChart2,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  X,
  AlertTriangle
} from 'lucide-react';



function Templates({ onCreateDocument, darkMode }) {
  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customizationOptions, setCustomizationOptions] = useState({
    companyName: '',
    contactPerson: '',
    includeLogos: true,
    formalTone: true,
    addLegalDisclaimer: true,
    aiEnhanced: true
  });
  const [aiSuggestionMode, setAiSuggestionMode] = useState(false);
  const [promptInput, setPromptInput] = useState('');
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [documentTitle, setDocumentTitle] = useState('');
  const [generatingTitle, setGeneratingTitle] = useState(false);
  const [showAITips, setShowAITips] = useState(true);
  const [aiTemplateImproving, setAiTemplateImproving] = useState(false);
  const [showPromptTips, setShowPromptTips] = useState(false);

  // Mock templates data with AI emphasis
  const [templates, setTemplates] = useState([
    { 
      id: 1, 
      title: 'Umowa o pracę', 
      category: 'Kadry', 
      industry: 'Ogólne',
      description: 'Kompleksowa umowa o pracę zgodna z obowiązującymi przepisami.',
      aiEnhanced: true,
      popular: true,
      lastUpdated: '5 dni temu',
      rating: 4.8,
      usageCount: 128,
      tags: ['HR', 'Zatrudnienie', 'Prawne']
    },
    { 
      id: 2, 
      title: 'Umowa NDA', 
      category: 'Prawne', 
      industry: 'IT',
      description: 'Umowa o zachowaniu poufności, chroni własność intelektualną i dane poufne.',
      aiEnhanced: true,
      popular: true,
      lastUpdated: '2 dni temu',
      rating: 4.9,
      usageCount: 245,
      tags: ['Poufność', 'Bezpieczeństwo', 'Prawne']
    },
    { 
      id: 3, 
      title: 'Raport kwartalny', 
      category: 'Finanse', 
      industry: 'Bankowość',
      description: 'Raport finansowy podsumowujący kwartalne wyniki firmy.',
      aiEnhanced: true,
      popular: false,
      lastUpdated: '1 tydzień temu',
      rating: 4.5,
      usageCount: 87,
      tags: ['Finanse', 'Analiza', 'Raport']
    },
    { 
      id: 4, 
      title: 'Propozycja biznesowa', 
      category: 'Sprzedaż', 
      industry: 'Usługi',
      description: 'Profesjonalna propozycja biznesowa z rekomendacjami i cennikiem.',
      aiEnhanced: false,
      popular: true,
      lastUpdated: '3 dni temu',
      rating: 4.6,
      usageCount: 156,
      tags: ['Sprzedaż', 'Marketing', 'Biznes']
    },
    { 
      id: 5, 
      title: 'Notatka ze spotkania', 
      category: 'Biuro', 
      industry: 'Ogólne',
      description: 'Szablon notatki ze spotkania z sekcjami dla uczestników i działań.',
      aiEnhanced: true,
      popular: false,
      lastUpdated: '2 dni temu',
      rating: 4.3,
      usageCount: 92,
      tags: ['Spotkanie', 'Notatki', 'Organizacja']
    },
    { 
      id: 6, 
      title: 'List motywacyjny', 
      category: 'Kadry', 
      industry: 'Ogólne',
      description: 'Profesjonalny list motywacyjny podkreślający kluczowe umiejętności.',
      aiEnhanced: true,
      popular: false,
      lastUpdated: '1 dzień temu',
      rating: 4.7,
      usageCount: 113,
      tags: ['HR', 'Zatrudnienie', 'Aplikacja']
    },
    { 
      id: 7, 
      title: 'Oferta handlowa', 
      category: 'Sprzedaż', 
      industry: 'Handel',
      description: 'Szczegółowa oferta handlowa z warunkami współpracy i cennikiem.',
      aiEnhanced: true,
      popular: true,
      lastUpdated: '4 dni temu',
      rating: 4.9,
      usageCount: 198,
      tags: ['Sprzedaż', 'Oferta', 'Biznes']
    },
    { 
      id: 8, 
      title: 'Plan marketingowy', 
      category: 'Marketing', 
      industry: 'Media',
      description: 'Kompleksowy plan marketingowy z analizą rynku i strategiami.',
      aiEnhanced: true,
      popular: false,
      lastUpdated: '6 dni temu',
      rating: 4.6,
      usageCount: 73,
      tags: ['Marketing', 'Strategia', 'Planowanie']
    }
  ]);

  // AI-generated suggestions based on user behavior and context
  const aiSuggestions = [
    {
      id: 'sug1',
      title: 'Oferta handlowa z zaawansowaną analityką',
      description: 'Zoptymalizowana pod branżę IT, zawiera sekcje ROI i TCO.',
      reason: 'Pasuje do Twojego profilu i ostatnich dokumentów'
    },
    {
      id: 'sug2',
      title: 'Umowa serwisowa z klauzulami SLA',
      description: 'Zawiera zaawansowane metryki i klauzule dotyczące poziomów usług.',
      reason: 'Popularna w Twojej branży'
    },
    {
      id: 'sug3',
      title: 'Notatka ze spotkania z funkcjami AI',
      description: 'Automatycznie organizuje punkty i tworzy listy zadań.',
      reason: 'Zaoszczędzi Ci czas na spotkaniach'
    }
  ];

  // Categories and industries for filtering
  const categories = [
    { id: 'all', name: 'Wszystkie kategorie' },
    { id: 'Kadry', name: 'Kadry' },
    { id: 'Prawne', name: 'Prawne' },
    { id: 'Finanse', name: 'Finanse' },
    { id: 'Sprzedaż', name: 'Sprzedaż' },
    { id: 'Marketing', name: 'Marketing' },
    { id: 'Biuro', name: 'Biuro' }
  ];

  const industries = [
    { id: 'all', name: 'Wszystkie branże' },
    { id: 'Ogólne', name: 'Ogólne' },
    { id: 'IT', name: 'IT' },
    { id: 'Bankowość', name: 'Bankowość' },
    { id: 'Usługi', name: 'Usługi' },
    { id: 'Handel', name: 'Handel' },
    { id: 'Media', name: 'Media' }
  ];

  // Analytics data
  const aiInsights = {
    mostPopular: 'Umowa NDA',
    fastestGrowing: 'Oferta handlowa',
    userPreference: 'Dokumenty Prawne',
    timesSaved: '34 godziny',
    recommendedTemplate: 'Plan marketingowy',
    completionRate: 87
  };

  // Sample AI-generated prompts for inspiration
  const samplePrompts = [
    "Umowa o pracę dla działu IT z dodatkowymi klauzulami poufności",
    "Raport kwartalny z automatyczną analizą trendów",
    "Oferta handlowa z dynamicznymi elementami cenowymi",
    "Notatka ze spotkania z automatycznym wyodrębnianiem zadań"
  ];

  // Filter templates based on search and selected filters
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesIndustry = selectedIndustry === 'all' || template.industry === selectedIndustry;
    
    return matchesSearch && matchesCategory && matchesIndustry;
  });

  // Handle template selection
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setShowModal(true);
    setDocumentTitle(`${template.title} - ${new Date().toLocaleDateString('pl-PL')}`);
  };

  // Handle AI-powered template generation from prompt
  const handleAIGenerate = () => {
    if (!promptInput.trim()) return;
    
    setAiGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Generate a new template based on the prompt
      const newTemplate = {
        id: templates.length + 1,
        title: `AI: ${promptInput.split(' ').slice(0, 4).join(' ')}...`,
        category: 'AI Generated',
        industry: 'Dostosowane',
        description: `Dokument wygenerowany na podstawie Twojego zapytania: "${promptInput}"`,
        aiEnhanced: true,
        popular: false,
        lastUpdated: 'Przed chwilą',
        rating: 5.0,
        usageCount: 1,
        tags: ['AI', 'Niestandardowy', promptInput.split(' ')[0]]
      };
      
      // Add to templates
      setTemplates([newTemplate, ...templates]);
      
      // Select the new template
      setSelectedTemplate(newTemplate);
      setShowModal(true);
      setDocumentTitle(`${newTemplate.title}`);
      
      // Reset
      setAiGenerating(false);
      setPromptInput('');
      setAiSuggestionMode(false);
    }, 3000);
  };

  // Handle AI title generation
  const handleGenerateTitle = () => {
    if (!selectedTemplate) return;
    
    setGeneratingTitle(true);
    
    // Simulate AI title generation
    setTimeout(() => {
      const currentDate = new Date().toLocaleDateString('pl-PL');
      const aiTitles = [
        `${selectedTemplate.title} dla XYZ Corp - ${currentDate}`,
        `${selectedTemplate.category}: ${selectedTemplate.title} (wersja optymalna) - ${currentDate}`,
        `${selectedTemplate.title} z klauzulami AI - ${currentDate}`,
        `Zaawansowany ${selectedTemplate.title.toLowerCase()} - ${currentDate}`
      ];
      
      setDocumentTitle(aiTitles[Math.floor(Math.random() * aiTitles.length)]);
      setGeneratingTitle(false);
    }, 1500);
  };

  // Handle template improvement with AI
  const handleImproveTemplate = () => {
    if (!selectedTemplate) return;
    
    setAiTemplateImproving(true);
    
    // Simulate AI improvement
    setTimeout(() => {
      setSelectedTemplate({
        ...selectedTemplate,
        title: selectedTemplate.title + ' (Ulepszony przez AI)',
        aiEnhanced: true,
        description: selectedTemplate.description + ' Wersja ulepszona przez AI z dodatkowymi klauzulami i optymalizacjami.',
      });
      
      setAiTemplateImproving(false);
    }, 2000);
  };

  // Handle creating a document from a template
  const handleCreateDocument = () => {
    if (!selectedTemplate || !documentTitle.trim()) return;
    
    // Generate initial content based on the template and customization
    const initialContent = `# ${documentTitle}
    
## Wygenerowany z szablonu: ${selectedTemplate.title}
${selectedTemplate.aiEnhanced ? '## Ulepszony przez AI\n' : ''}

${customizationOptions.companyName ? `Firma: ${customizationOptions.companyName}\n` : ''}
${customizationOptions.contactPerson ? `Osoba kontaktowa: ${customizationOptions.contactPerson}\n` : ''}

Ten dokument został wygenerowany ${new Date().toLocaleDateString('pl-PL')} przy użyciu systemu Biuro AI.
${customizationOptions.aiEnhanced ? '\nDokument zawiera inteligentne klauzule i optymalizacje prawne wygenerowane przez AI.' : ''}
${customizationOptions.addLegalDisclaimer ? '\n\n**ZASTRZEŻENIE PRAWNE**: Ten dokument został przygotowany z należytą starannością, jednak przed użyciem zaleca się konsultację z ekspertem prawnym.' : ''}
`;

    // Call the parent component's create document function
    onCreateDocument(documentTitle, initialContent);
    
    // Close the modal
    setShowModal(false);
    setSelectedTemplate(null);
    setDocumentTitle('');
  };

  // Card background style based on dark mode
  const cardStyle = darkMode 
    ? "bg-gray-800 text-white border border-gray-700"
    : "bg-white text-gray-800 border border-gray-200";

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Szablony dokumentów</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Wybierz z biblioteki inteligentnych szablonów lub poproś AI o stworzenie niestandardowego dokumentu.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <button
            onClick={() => setShowAIInsights(!showAIInsights)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              showAIInsights 
                ? 'bg-purple-600 text-white hover:bg-purple-700' 
                : `${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
            }`}
          >
            <BrainCircuit size={16} className="mr-2" />
            <span>{showAIInsights ? 'Ukryj insighty AI' : 'Insighty AI'}</span>
          </button>
          
          <button
            onClick={() => setAiSuggestionMode(!aiSuggestionMode)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              aiSuggestionMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : `${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
            }`}
          >
            <Zap size={16} className="mr-2" />
            <span>{aiSuggestionMode ? 'Widok standardowy' : 'Wygeneruj z opisu'}</span>
          </button>
        </div>
      </div>
      
      {/* AI Insights Panel */}
      {showAIInsights && (
        <div className={`mb-8 rounded-lg p-6 ${
          darkMode ? 'bg-gray-800 border border-purple-800' : 'bg-purple-50 border border-purple-200'
        }`}>
          <div className="flex items-center mb-4">
            <BrainCircuit size={20} className="text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold">Analiza AI szablonów dokumentów</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <h3 className="text-sm font-medium mb-4">Insighty o użytkowaniu</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Star size={16} className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Najpopularniejszy szablon</p>
                    <p className="text-xs text-gray-500">{aiInsights.mostPopular}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <ArrowUpRight size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Najszybciej rosnący</p>
                    <p className="text-xs text-gray-500">{aiInsights.fastestGrowing}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Zaoszczędzony czas</p>
                    <p className="text-xs text-gray-500">{aiInsights.timesSaved}</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <h3 className="text-sm font-medium mb-4">Analiza Twojego profilu</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Users size={16} className="text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Twoje preferencje</p>
                    <p className="text-xs text-gray-500">{aiInsights.userPreference}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Wskaźnik ukończenia</p>
                    <p className="text-xs text-gray-500">{aiInsights.completionRate}% dokumentów zostaje ukończonych</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Zap size={16} className="text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Zalecany dla Ciebie</p>
                    <p className="text-xs text-gray-500">{aiInsights.recommendedTemplate}</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <h3 className="text-sm font-medium mb-3">Działania rekomendowane</h3>
              <div className={`p-3 rounded-lg mb-3 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
                <p className="text-sm">
                  <span className="font-medium">Usprawnij swój przepływ pracy</span> - AI wykryło, że często modyfikujesz sekcję "Warunki płatności". Rozważ utworzenie niestandardowego szablonu.
                </p>
              </div>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-green-50'}`}>
                <p className="text-sm">
                  <span className="font-medium">Oszczędność czasu</span> - Włącz funkcję "Automatyczne uzupełnianie AI" aby zaoszczędzić ~2 godziny tygodniowo na tworzeniu dokumentów.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* AI Generation Mode */}
      {aiSuggestionMode && (
        <div className={`mb-8 rounded-lg p-6 ${
          darkMode ? 'bg-gray-800 border border-blue-800' : 'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-center mb-4">
            <Zap size={20} className="text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Wygeneruj szablon z opisu</h2>
          </div>
          
          <p className={`mb-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Opisz jakiego dokumentu potrzebujesz, a AI wygeneruje dostosowany szablon dla Ciebie.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <textarea
                  className={`w-full p-3 rounded-lg resize-none min-h-[100px] ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-800'
                  } border`}
                  placeholder="Np. Umowa o współpracę dla firmy IT z klauzulami NDA i warunkami płatności..."
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                />
                
                <button 
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPromptTips(!showPromptTips)}
                >
                  {showPromptTips ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
              
              {showPromptTips && (
                <div className={`mt-2 p-3 rounded-lg text-sm ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  <p className="font-medium mb-2">Wskazówki dla lepszych wyników:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Określ typ dokumentu (umowa, raport, oferta)</li>
                    <li>Podaj branżę lub kontekst biznesowy</li>
                    <li>Wymień konkretne sekcje lub klauzule, które potrzebujesz</li>
                    <li>Określ ton (formalny, przyjazny) i długość</li>
                  </ul>
                </div>
              )}
              
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Przykładowe zapytania:</p>
                <div className="flex flex-wrap gap-2">
                  {samplePrompts.map((prompt, index) => (
                    <button
                      key={index}
                      className={`text-xs px-3 py-1 rounded-full ${
                        darkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      onClick={() => setPromptInput(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-end">
              <button
                onClick={handleAIGenerate}
                disabled={!promptInput.trim() || aiGenerating}
                className={`px-6 py-3 rounded-lg flex items-center justify-center transition-colors ${
                  !promptInput.trim() || aiGenerating
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {aiGenerating ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Generowanie...
                  </>
                ) : (
                  <>
                    <Zap size={16} className="mr-2" />
                    Wygeneruj szablon
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* AI Tips Card */}
      {showAITips && !aiSuggestionMode && (
        <div className={`mb-8 rounded-lg p-4 relative ${
          darkMode ? 'bg-purple-900 bg-opacity-20 border border-purple-800' : 'bg-purple-50 border border-purple-200'
        }`}>
          <button 
            onClick={() => setShowAITips(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
          
          <div className="flex items-start">
            <div className="mr-4">
              <div className={`p-2 rounded-full ${darkMode ? 'bg-purple-800' : 'bg-purple-100'}`}>
                <Zap size={24} className="text-purple-600" />
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Wskazówka AI</h3>
              <p className="text-sm mb-2">
                Twoje szablony są teraz ulepszane przez AI! Zauważyliśmy, że często pracujesz z dokumentami prawnymi. 
                Czy wiesz, że możesz użyć AI do automatycznego generowania treści dokumentów zgodnych z najnowszymi 
                przepisami prawnymi?
              </p>
              <button className={`text-sm font-medium ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                Dowiedz się więcej
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Search and Filters */}
      <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Szukaj szablonów..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 w-full rounded-lg border ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <Search 
              size={18} 
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} 
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg border flex items-center ${
              showFilters
                ? 'bg-blue-600 text-white border-blue-600'
                : darkMode
                  ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter size={18} className="mr-2" />
            <span>Filtry</span>
          </button>
        </div>
        
        {showFilters && (
          <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
            <div>
              <label 
                htmlFor="category-filter" 
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Kategoria
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`block w-full rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } px-3 py-2`}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label 
                htmlFor="industry-filter" 
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Branża
              </label>
              <select
                id="industry-filter"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className={`block w-full rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } px-3 py-2`}
              >
                {industries.map(industry => (
                  <option key={industry.id} value={industry.id}>{industry.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedIndustry('all');
                  setSearchTerm('');
                }}
                className={`px-4 py-2 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Wyczyść
              </button>
              
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Zastosuj
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* AI Suggestions Section */}
      {!aiSuggestionMode && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Zap size={20} className="text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold">Sugestie AI specjalnie dla Ciebie</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiSuggestions.map(suggestion => (
              <div 
                key={suggestion.id}
                className={`p-4 rounded-lg border-l-4 border-purple-500 cursor-pointer transition-transform hover:scale-[1.02] ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } shadow`}
                onClick={() => handleSelectTemplate({
                  ...suggestion,
                  aiEnhanced: true,
                  category: 'AI Generated',
                  industry: 'Dostosowane'
                })}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-3 flex-shrink-0 ${
                    darkMode ? 'bg-purple-900 bg-opacity-50' : 'bg-purple-100'
                  }`}>
                    <Zap size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{suggestion.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{suggestion.description}</p>
                    <div className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    } flex items-center`}>
                      <ArrowRight size={12} className="mr-1" />
                      {suggestion.reason}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Templates Grid */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">
          {filteredTemplates.length > 0 
            ? `Biblioteka szablonów (${filteredTemplates.length})` 
            : 'Biblioteka szablonów'}
        </h2>
        
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(template => (
              <div 
                key={template.id} 
                className={`${cardStyle} rounded-lg overflow-hidden shadow transition-transform hover:shadow-lg cursor-pointer hover:scale-[1.01]`}
                onClick={() => handleSelectTemplate(template)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <FileText size={20} className="text-blue-500 mr-2" />
                      <h3 className="font-medium">{template.title}</h3>
                    </div>
                    {template.aiEnhanced && (
                      <div className={`px-2 py-1 rounded-full text-xs flex items-center ${
                        darkMode ? 'bg-purple-900 bg-opacity-50 text-purple-300' : 'bg-purple-100 text-purple-800'
                      }`}>
                        <Zap size={12} className="mr-1" />
                        AI
                      </div>
                    )}
                  </div>
                  
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {template.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs ${
                          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                      <span className="flex items-center">
                        <Tag size={14} className="mr-1" />
                        {template.category}
                      </span>
                    </div>
                    <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                      <span className="flex items-center">
                        <Users size={14} className="mr-1" />
                        {template.usageCount} użyć
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className={`px-6 py-3 flex justify-between items-center ${
                  darkMode ? 'bg-gray-900' : 'bg-gray-50'
                }`}>
                  <div className={`flex items-center text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <Clock size={14} className="mr-1" />
                    {template.lastUpdated}
                  </div>
                  
                  <div className="flex items-center">
                    <Star size={14} fill="currentColor" className="text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{template.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`p-12 rounded-lg text-center ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow`}>
            <FileText size={48} className={`mx-auto mb-4 ${
              darkMode ? 'text-gray-600' : 'text-gray-300'
            }`} />
            <h3 className="text-lg font-medium mb-2">Nie znaleziono szablonów</h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Nie znaleziono szablonów pasujących do wybranych kryteriów.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedIndustry('all');
                  setSearchTerm('');
                }}
                className={`px-4 py-2 rounded-lg ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Wyczyść filtry
              </button>
              
              <button
                onClick={() => setAiSuggestionMode(true)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center"
              >
                <Zap size={16} className="mr-2" />
                Stwórz z AI
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Selected Template Modal */}
      {showModal && selectedTemplate && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
            onClick={() => setShowModal(false)}
          ></div>
          
          <div className="flex items-center justify-center min-h-screen">
            <div className={`relative ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            } rounded-lg max-w-2xl w-full mx-auto p-6 shadow-xl`}>
              {/* Modal header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center mb-1">
                    <FileText size={20} className="text-blue-500 mr-2" />
                    <h3 className="text-xl font-semibold">{selectedTemplate.title}</h3>
                    {selectedTemplate.aiEnhanced && (
                      <div className={`ml-2 px-2 py-0.5 rounded-full text-xs flex items-center ${
                        darkMode ? 'bg-purple-900 bg-opacity-50 text-purple-300' : 'bg-purple-100 text-purple-800'
                      }`}>
                        <Zap size={12} className="mr-1" />
                        AI
                      </div>
                    )}
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedTemplate.description}
                  </p>
                </div>
                
                <button
                  onClick={() => setShowModal(false)}
                  className={`${
                    darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Document title input */}
              <div className="mb-4">
                <label 
                  htmlFor="document-title" 
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Tytuł dokumentu
                </label>
                <div className="flex">
                  <input
                    id="document-title"
                    type="text"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    className={`flex-1 rounded-l-lg border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } px-3 py-2`}
                    placeholder="Wprowadź tytuł dokumentu..."
                  />
                  <button
                    onClick={handleGenerateTitle}
                    disabled={generatingTitle}
                    className={`rounded-r-lg px-3 ${
                      darkMode
                        ? 'bg-gray-600 text-gray-200 border-gray-600'
                        : 'bg-gray-100 text-gray-700 border border-gray-300 border-l-0'
                    } flex items-center`}
                    title="Wygeneruj tytuł z AI"
                  >
                    {generatingTitle ? (
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                    ) : (
                      <Zap size={16} />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Customization options */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Opcje personalizacji</h4>
                  {selectedTemplate.aiEnhanced && (
                    <div className={`text-xs ${
                      darkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      Te opcje są analizowane przez AI
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="company-name" 
                      className={`block text-sm mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Nazwa firmy (opcjonalne)
                    </label>
                    <input
                      id="company-name"
                      type="text"
                      value={customizationOptions.companyName}
                      onChange={(e) => setCustomizationOptions({
                        ...customizationOptions, 
                        companyName: e.target.value
                      })}
                      className={`w-full rounded-lg border ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } px-3 py-2 text-sm`}
                      placeholder="Nazwa firmy..."
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="contact-person" 
                      className={`block text-sm mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Osoba kontaktowa (opcjonalne)
                    </label>
                    <input
                      id="contact-person"
                      type="text"
                      value={customizationOptions.contactPerson}
                      onChange={(e) => setCustomizationOptions({
                        ...customizationOptions, 
                        contactPerson: e.target.value
                      })}
                      className={`w-full rounded-lg border ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } px-3 py-2 text-sm`}
                      placeholder="Imię i nazwisko..."
                    />
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      id="formal-tone"
                      type="checkbox"
                      checked={customizationOptions.formalTone}
                      onChange={(e) => setCustomizationOptions({
                        ...customizationOptions, 
                        formalTone: e.target.checked
                      })}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label 
                      htmlFor="formal-tone" 
                      className={`ml-2 block text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Formalny ton dokumentu
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="include-logos"
                      type="checkbox"
                      checked={customizationOptions.includeLogos}
                      onChange={(e) => setCustomizationOptions({
                        ...customizationOptions, 
                        includeLogos: e.target.checked
                      })}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label 
                      htmlFor="include-logos" 
                      className={`ml-2 block text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Dodaj miejsca na logo
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="legal-disclaimer"
                      type="checkbox"
                      checked={customizationOptions.addLegalDisclaimer}
                      onChange={(e) => setCustomizationOptions({
                        ...customizationOptions, 
                        addLegalDisclaimer: e.target.checked
                      })}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label 
                      htmlFor="legal-disclaimer" 
                      className={`ml-2 block text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Dodaj zastrzeżenia prawne
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="ai-enhanced"
                      type="checkbox"
                      checked={customizationOptions.aiEnhanced}
                      onChange={(e) => setCustomizationOptions({
                        ...customizationOptions, 
                        aiEnhanced: e.target.checked
                      })}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label 
                      htmlFor="ai-enhanced" 
                      className={`ml-2 block text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Ulepszenie treści przez AI
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Template AI improvement section */}
              {!selectedTemplate.aiEnhanced && (
                <div className={`mb-6 p-4 rounded-lg flex items-start ${
                  darkMode ? 'bg-purple-900 bg-opacity-20 border border-purple-800' : 'bg-purple-50 border border-purple-200'
                }`}>
                  <Zap size={20} className="text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Ulepsz ten szablon z pomocą AI</h4>
                    <p className="text-sm mb-3">
                      AI może przeanalizować ten szablon i ulepszyć go, dodając zoptymalizowane klauzule i dostosowując go do Twoich potrzeb.
                    </p>
                    <button
                      onClick={handleImproveTemplate}
                      disabled={aiTemplateImproving}
                      className={`px-4 py-2 rounded-lg text-sm flex items-center ${
                        aiTemplateImproving
                          ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      {aiTemplateImproving ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Ulepszanie...
                        </>
                      ) : (
                        <>
                          <Zap size={14} className="mr-2" />
                          Ulepsz z AI
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
              
              {/* Disclaimer */}
              <div className={`mb-6 p-4 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <div className="flex items-start">
                  <AlertTriangle size={16} className={`mr-2 flex-shrink-0 mt-0.5 ${
                    darkMode ? 'text-yellow-400' : 'text-yellow-600'
                  }`} />
                  <p className="text-xs">
                    Dokumenty wygenerowane przez AI powinny być zawsze przejrzane przez odpowiedniego specjalistę (np. prawnika) przed 
                    faktycznym użyciem. Biuro AI dostarcza szablony jako punkt wyjścia, ale nie ponosi odpowiedzialności za ich 
                    poprawność prawną.
                  </p>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className={`px-4 py-2 rounded-lg ${
                    darkMode
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Anuluj
                </button>
                
                <button
                  onClick={handleCreateDocument}
                  disabled={!documentTitle.trim()}
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    !documentTitle.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Plus size={16} className="mr-2" />
                  Utwórz dokument
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Templates;