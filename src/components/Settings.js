import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon,
  User,
  Moon,
  Sun,
  Bell,
  Lock,
  Clipboard,
  CreditCard,
  Save,
  ToggleLeft,
  ToggleRight,
  Shield,
  Globe,
  Clock,
  BrainCircuit,
  Zap,
  HelpCircle,
  AlertTriangle,
  Info,
  Check,
  X,
  ChevronRight
} from 'lucide-react';
import '../css/Settings.css';

function Settings() {
  // State for settings
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [saveIndicator, setSaveIndicator] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Profile settings
  const [profile, setProfile] = useState({
    name: 'Jan Kowalski',
    email: 'jan.kowalski@example.com',
    position: 'Menedżer Projektu',
    language: 'polski',
    timeZone: 'Europe/Warsaw'
  });
  
  // Appearance settings
  const [appearance, setAppearance] = useState({
    darkMode: false,
    compactMode: false,
    fontSize: 'medium',
    showAnimations: true
  });
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    desktopNotifications: true,
    documentReminders: true,
    documentComments: true,
    documentShared: true,
    aiSuggestions: true
  });
  
  // AI settings
  const [aiSettings, setAiSettings] = useState({
    enableAiAssistant: true,
    enableAiSuggestions: true,
    enableAiAnalysis: true,
    documentAutoCorrect: true,
    autoSummarize: true,
    contentGeneration: true,
    dataUsage: 'full' // 'full', 'limited', 'none'
  });
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    shareAnalytics: true,
    allowFeedback: true,
    dataRetention: '30days', // '7days', '30days', '90days', 'forever'
    documentHistory: true
  });
  
  // Subscription settings
  const [subscription, setSubscription] = useState({
    plan: 'Business',
    status: 'Aktywny',
    billingPeriod: 'Miesięcznie',
    nextBilling: '20.04.2025',
    features: [
      'Nieograniczona liczba dokumentów',
      'Wszystkie funkcje AI',
      'Priorytetowe wsparcie',
      '5 użytkowników'
    ]
  });
  
  // Advanced settings
  const [advancedSettings, setAdvancedSettings] = useState({
    apiAccess: false,
    betaFeatures: false,
    developerMode: false,
    dataExport: false,
    loggingLevel: 'normal' // 'minimal', 'normal', 'verbose'
  });
  
  // Effect to update dark mode from parent component
  useEffect(() => {
    // You would normally get this from context or props
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(systemPrefersDark);
    setAppearance(prev => ({...prev, darkMode: systemPrefersDark}));
  }, []);
  
  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    setAppearance(prev => ({...prev, darkMode: !prev.darkMode}));
    showSaveIndicator();
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    saveSettings();
  };
  
  // Handle settings save
  const saveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call to save settings
    setTimeout(() => {
      setIsLoading(false);
      showSaveIndicator();
    }, 800);
  };
  
  // Show temporary save confirmation
  const showSaveIndicator = () => {
    setSaveIndicator(true);
    setTimeout(() => {
      setSaveIndicator(false);
    }, 3000);
  };
  
  // Reset settings to default
  const resetToDefaults = (settingType) => {
    setConfirmationType('reset');
    setShowConfirmation(true);
  };
  
  // Delete account
  const deleteAccount = () => {
    setConfirmationType('delete');
    setShowConfirmation(true);
  };
  
  // Handle confirmation dialog
  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      if (confirmationType === 'reset') {
        // Reset logic here
        setAppearance({
          darkMode: false,
          compactMode: false,
          fontSize: 'medium',
          showAnimations: true
        });
        showSaveIndicator();
      } else if (confirmationType === 'delete') {
        // Delete account logic would go here
        console.log('Account deletion process initiated');
      }
    }
    
    setShowConfirmation(false);
  };
  
  // Tab content renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="settings-section">
            <h2 className="section-title">Twój profil</h2>
            <p className="section-description">Zarządzaj swoimi danymi osobistymi i preferencjami konta.</p>
            
            <div className="profile-header">
              <div className="profile-avatar">
                {profile.name.split(' ').map(name => name[0]).join('')}
              </div>
              <div className="profile-info">
                <h3>{profile.name}</h3>
                <p>{profile.email}</p>
                <button className="btn-link">Zmień zdjęcie profilowe</button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Imię i nazwisko</label>
                <input 
                  type="text" 
                  id="name" 
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="position">Stanowisko</label>
                <input 
                  type="text" 
                  id="position" 
                  value={profile.position}
                  onChange={(e) => setProfile({...profile, position: e.target.value})}
                  className="form-control"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="language">Język</label>
                  <select 
                    id="language"
                    value={profile.language}
                    onChange={(e) => setProfile({...profile, language: e.target.value})}
                    className="form-control"
                  >
                    <option value="polski">Polski</option>
                    <option value="english">English</option>
                    <option value="deutsch">Deutsch</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="timeZone">Strefa czasowa</label>
                  <select 
                    id="timeZone"
                    value={profile.timeZone}
                    onChange={(e) => setProfile({...profile, timeZone: e.target.value})}
                    className="form-control"
                  >
                    <option value="Europe/Warsaw">Europe/Warsaw (UTC+2)</option>
                    <option value="Europe/London">Europe/London (UTC+1)</option>
                    <option value="America/New_York">America/New_York (UTC-4)</option>
                  </select>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Zapisywanie...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Zapisz zmiany
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        );
        
      case 'appearance':
        return (
          <div className="settings-section">
            <h2 className="section-title">Wygląd</h2>
            <p className="section-description">Dostosuj wygląd aplikacji do swoich preferencji.</p>
            
            <div className="settings-card">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Tryb ciemny</div>
                  <div className="setting-description">Włącz tryb ciemny dla całej aplikacji</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={handleDarkModeToggle}
                    aria-label="Przełącz tryb ciemny"
                  >
                    {appearance.darkMode ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączony</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączony</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Tryb kompaktowy</div>
                  <div className="setting-description">Zmniejsz odstępy między elementami, aby wyświetlać więcej treści</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setAppearance({...appearance, compactMode: !appearance.compactMode});
                      showSaveIndicator();
                    }}
                    aria-label="Przełącz tryb kompaktowy"
                  >
                    {appearance.compactMode ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączony</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączony</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Rozmiar czcionki</div>
                  <div className="setting-description">Dostosuj rozmiar tekstu w aplikacji</div>
                </div>
                <div className="setting-control">
                  <select 
                    className="form-control"
                    value={appearance.fontSize}
                    onChange={(e) => {
                      setAppearance({...appearance, fontSize: e.target.value});
                      showSaveIndicator();
                    }}
                  >
                    <option value="small">Mały</option>
                    <option value="medium">Średni</option>
                    <option value="large">Duży</option>
                  </select>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Animacje</div>
                  <div className="setting-description">Włącz animacje interfejsu</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setAppearance({...appearance, showAnimations: !appearance.showAnimations});
                      showSaveIndicator();
                    }}
                    aria-label="Przełącz animacje"
                  >
                    {appearance.showAnimations ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączone</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączone</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                className="btn btn-outline"
                onClick={() => resetToDefaults('appearance')}
              >
                Przywróć domyślne
              </button>
              
              <button 
                className="btn btn-primary"
                onClick={saveSettings}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Zapisywanie...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Zapisz zmiany
                  </>
                )}
              </button>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="settings-section">
            <h2 className="section-title">Powiadomienia</h2>
            <p className="section-description">Zarządzaj powiadomieniami i przypomnieniami.</p>
            
            <div className="settings-card">
              <div className="setting-group-title">Kanały powiadomień</div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Powiadomienia email</div>
                  <div className="setting-description">Otrzymuj powiadomienia na adres email</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setNotifications({...notifications, emailNotifications: !notifications.emailNotifications});
                      showSaveIndicator();
                    }}
                  >
                    {notifications.emailNotifications ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączone</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączone</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Powiadomienia na pulpicie</div>
                  <div className="setting-description">Otrzymuj powiadomienia w przeglądarce</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setNotifications({...notifications, desktopNotifications: !notifications.desktopNotifications});
                      showSaveIndicator();
                    }}
                  >
                    {notifications.desktopNotifications ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączone</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączone</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-group-title">Typ powiadomień</div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Przypomnienia o dokumentach</div>
                  <div className="setting-description">Powiadomienia o zbliżających się terminach dokumentów</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setNotifications({...notifications, documentReminders: !notifications.documentReminders});
                      showSaveIndicator();
                    }}
                  >
                    {notifications.documentReminders ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączone</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączone</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Komentarze do dokumentów</div>
                  <div className="setting-description">Powiadomienia o nowych komentarzach</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setNotifications({...notifications, documentComments: !notifications.documentComments});
                      showSaveIndicator();
                    }}
                  >
                    {notifications.documentComments ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączone</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączone</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Udostępnianie dokumentów</div>
                  <div className="setting-description">Powiadomienia o dokumentach udostępnionych Tobie</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setNotifications({...notifications, documentShared: !notifications.documentShared});
                      showSaveIndicator();
                    }}
                  >
                    {notifications.documentShared ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączone</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączone</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Sugestie AI</div>
                  <div className="setting-description">Powiadomienia o sugestiach od asystenta AI</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setNotifications({...notifications, aiSuggestions: !notifications.aiSuggestions});
                      showSaveIndicator();
                    }}
                  >
                    {notifications.aiSuggestions ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączone</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączone</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                className="btn btn-primary"
                onClick={saveSettings}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Zapisywanie...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Zapisz zmiany
                  </>
                )}
              </button>
            </div>
          </div>
        );
        
      case 'ai':
        return (
          <div className="settings-section">
            <h2 className="section-title">Ustawienia AI</h2>
            <p className="section-description">Zarządzaj funkcjami sztucznej inteligencji w aplikacji.</p>
            
            <div className="ai-status-card">
              <div className="ai-status-icon">
                <BrainCircuit size={32} />
              </div>
              <div className="ai-status-info">
                <h3>Status AI: Aktywny</h3>
                <p>Twoje funkcje AI są aktywne i gotowe do użycia. Możesz dostosować je poniżej.</p>
              </div>
            </div>
            
            <div className="settings-card">
              <div className="setting-group-title">Funkcje asystenta AI</div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Asystent AI</div>
                  <div className="setting-description">Włącz asystenta AI w całej aplikacji</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setAiSettings({...aiSettings, enableAiAssistant: !aiSettings.enableAiAssistant});
                      showSaveIndicator();
                    }}
                  >
                    {aiSettings.enableAiAssistant ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączony</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączony</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Sugestie AI</div>
                  <div className="setting-description">Otrzymuj inteligentne sugestie dotyczące dokumentów</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setAiSettings({...aiSettings, enableAiSuggestions: !aiSettings.enableAiSuggestions});
                      showSaveIndicator();
                    }}
                  >
                    {aiSettings.enableAiSuggestions ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączone</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączone</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Analiza AI</div>
                  <div className="setting-description">Analizuj dokumenty za pomocą AI</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setAiSettings({...aiSettings, enableAiAnalysis: !aiSettings.enableAiAnalysis});
                      showSaveIndicator();
                    }}
                  >
                    {aiSettings.enableAiAnalysis ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączona</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączona</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-group-title">Funkcje dokumentów</div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Automatyczna korekta</div>
                  <div className="setting-description">Automatycznie poprawiaj błędy podczas pisania</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setAiSettings({...aiSettings, documentAutoCorrect: !aiSettings.documentAutoCorrect});
                      showSaveIndicator();
                    }}
                  >
                    {aiSettings.documentAutoCorrect ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączona</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączona</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Automatyczne podsumowania</div>
                  <div className="setting-description">Automatycznie generuj podsumowania długich dokumentów</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setAiSettings({...aiSettings, autoSummarize: !aiSettings.autoSummarize});
                      showSaveIndicator();
                    }}
                  >
                    {aiSettings.autoSummarize ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączone</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączone</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Generowanie treści</div>
                  <div className="setting-description">Generuj treść na podstawie prostych poleceń</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setAiSettings({...aiSettings, contentGeneration: !aiSettings.contentGeneration});
                      showSaveIndicator();
                    }}
                  >
                    {aiSettings.contentGeneration ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączone</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączone</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-group-title">Dane i prywatność</div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Wykorzystanie danych</div>
                  <div className="setting-description">Wybierz jak AI może wykorzystywać Twoje dane</div>
                </div>
                <div className="setting-control">
                  <select 
                    className="form-control"
                    value={aiSettings.dataUsage}
                    onChange={(e) => {
                      setAiSettings({...aiSettings, dataUsage: e.target.value});
                      showSaveIndicator();
                    }}
                  >
                    <option value="full">Pełne (najlepsze wyniki)</option>
                    <option value="limited">Ograniczone (dobre wyniki)</option>
                    <option value="none">Minimalne (podstawowe funkcje)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="ai-info-card">
              <Info size={20} className="info-icon" />
              <p>Funkcje AI mogą analizować dokumenty i dane w celu zapewnienia spersonalizowanych sugestii. Wszystkie dane są przetwarzane zgodnie z naszą polityką prywatności.</p>
            </div>
            
            <div className="form-actions">
              <button 
                className="btn btn-outline"
                onClick={() => resetToDefaults('ai')}
              >
                Przywróć domyślne
              </button>
              
              <button 
                className="btn btn-primary"
                onClick={saveSettings}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Zapisywanie...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Zapisz zmiany
                  </>
                )}
              </button>
            </div>
          </div>
        );
        
      case 'privacy':
        return (
          <div className="settings-section">
            <h2 className="section-title">Prywatność i bezpieczeństwo</h2>
            <p className="section-description">Zarządzaj ustawieniami prywatności i bezpieczeństwa.</p>
            
            <div className="settings-card">
              <div className="setting-group-title">Dane i analityka</div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Udostępnianie danych analitycznych</div>
                  <div className="setting-description">Udostępniaj anonimowe dane statystyczne, aby pomóc nam ulepszać aplikację</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setPrivacySettings({...privacySettings, shareAnalytics: !privacySettings.shareAnalytics});
                      showSaveIndicator();
                    }}
                  >
                    {privacySettings.shareAnalytics ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączone</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączone</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Program ulepszania produktu</div>
                  <div className="setting-description">Udostępniaj opinie i sugestie dotyczące funkcji AI</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setPrivacySettings({...privacySettings, allowFeedback: !privacySettings.allowFeedback});
                      showSaveIndicator();
                    }}
                  >
                    {privacySettings.allowFeedback ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączony</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączony</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Okres przechowywania danych</div>
                  <div className="setting-description">Określ, jak długo Twoje dane są przechowywane</div>
                </div>
                <div className="setting-control">
                  <select 
                    className="form-control"
                    value={privacySettings.dataRetention}
                    onChange={(e) => {
                      setPrivacySettings({...privacySettings, dataRetention: e.target.value});
                      showSaveIndicator();
                    }}
                  >
                    <option value="7days">7 dni</option>
                    <option value="30days">30 dni</option>
                    <option value="90days">90 dni</option>
                    <option value="forever">Bezterminowo</option>
                  </select>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Historia dokumentów</div>
                  <div className="setting-description">Zachowaj historię zmian w dokumentach</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setPrivacySettings({...privacySettings, documentHistory: !privacySettings.documentHistory});
                      showSaveIndicator();
                    }}
                  >
                    {privacySettings.documentHistory ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączona</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączona</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-group-title">Bezpieczeństwo</div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Zmień hasło</div>
                  <div className="setting-description">Aktualizuj hasło do konta regularnie dla lepszego bezpieczeństwa</div>
                </div>
                <div className="setting-control">
                  <button className="btn btn-sm">
                    Zmień hasło
                  </button>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Weryfikacja dwuetapowa</div>
                  <div className="setting-description">Dodatkowa warstwa zabezpieczeń dla Twojego konta</div>
                </div>
                <div className="setting-control">
                  <button className="btn btn-sm">
                    Skonfiguruj
                  </button>
                </div>
              </div>
            </div>
            
            <div className="warning-card">
              <AlertTriangle size={20} className="warning-icon" />
              <div>
                <h4>Usunięcie konta</h4>
                <p>Ta operacja spowoduje nieodwracalne usunięcie wszystkich Twoich danych z systemu.</p>
                <button 
                  className="btn btn-danger mt-2"
                  onClick={deleteAccount}
                >
                  Usuń konto
                </button>
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                className="btn btn-primary"
                onClick={saveSettings}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Zapisywanie...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Zapisz zmiany
                  </>
                )}
              </button>
            </div>
          </div>
        );
        
      case 'subscription':
        return (
          <div className="settings-section">
            <h2 className="section-title">Subskrypcja</h2>
            <p className="section-description">Zarządzaj swoim planem i płatnościami.</p>
            
            <div className="subscription-card">
              <div className="subscription-header">
                <div>
                  <h3>Plan {subscription.plan}</h3>
                  <span className="subscription-status">{subscription.status}</span>
                </div>
                <button className="btn btn-outline btn-sm">
                  Zmień plan
                </button>
              </div>
              
              <div className="subscription-details">
                <div className="subscription-info">
                  <div className="info-label">Okres rozliczeniowy</div>
                  <div className="info-value">{subscription.billingPeriod}</div>
                </div>
                <div className="subscription-info">
                  <div className="info-label">Następne odnowienie</div>
                  <div className="info-value">{subscription.nextBilling}</div>
                </div>
              </div>
              
              <div className="subscription-features">
                <h4>Twój plan zawiera:</h4>
                <ul className="feature-list">
                  {subscription.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <Check size={16} className="feature-check" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="subscription-actions">
                <button className="btn btn-outline">
                  Historia płatności
                </button>
                <button className="btn btn-outline">
                  Zarządzaj metodami płatności
                </button>
              </div>
            </div>
            
            <div className="info-card">
              <Info size={20} className="info-icon" />
              <p>Masz pytania dotyczące Twojej subskrypcji? Skontaktuj się z naszym <a href="#" className="link">zespołem obsługi klienta</a>.</p>
            </div>
          </div>
        );
        
      case 'advanced':
        return (
          <div className="settings-section">
            <h2 className="section-title">Ustawienia zaawansowane</h2>
            <p className="section-description">Zaawansowane opcje dla użytkowników technicznych.</p>
            
            <div className="warning-card mb-4">
              <AlertTriangle size={20} className="warning-icon" />
              <p>Te ustawienia są przeznaczone dla zaawansowanych użytkowników. Nieprawidłowa konfiguracja może wpłynąć na działanie aplikacji.</p>
            </div>
            
            <div className="settings-card">
              <div className="setting-group-title">Dostęp API i integracje</div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Dostęp do API</div>
                  <div className="setting-description">Włącz dostęp do API dla integracji z innymi aplikacjami</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setAdvancedSettings({...advancedSettings, apiAccess: !advancedSettings.apiAccess});
                      showSaveIndicator();
                    }}
                  >
                    {advancedSettings.apiAccess ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączony</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączony</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {advancedSettings.apiAccess && (
                <div className="api-key-section">
                  <div className="api-key-header">
                    <h4>Twój klucz API</h4>
                    <button className="btn btn-sm">Wygeneruj nowy klucz</button>
                  </div>
                  <div className="api-key-display">
                    <code>sk_live_51NxT9KJHKskEl7bgT8JHG26Ys...</code>
                    <button className="btn-icon">
                      <Clipboard size={16} />
                    </button>
                  </div>
                  <p className="api-key-warning">
                    <AlertTriangle size={14} />
                    Nigdy nie udostępniaj tego klucza publicznie.
                  </p>
                </div>
              )}
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Funkcje eksperymentalne</div>
                  <div className="setting-description">Włącz eksperymentalne funkcje w fazie testów</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setAdvancedSettings({...advancedSettings, betaFeatures: !advancedSettings.betaFeatures});
                      showSaveIndicator();
                    }}
                  >
                    {advancedSettings.betaFeatures ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączone</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączone</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Tryb dewelopera</div>
                  <div className="setting-description">Dodatkowe funkcje debugowania i narzędzia programistyczne</div>
                </div>
                <div className="setting-control">
                  <button 
                    className="toggle-btn"
                    onClick={() => {
                      setAdvancedSettings({...advancedSettings, developerMode: !advancedSettings.developerMode});
                      showSaveIndicator();
                    }}
                  >
                    {advancedSettings.developerMode ? (
                      <>
                        <ToggleRight size={24} className="toggle-icon active" />
                        <span className="toggle-label">Włączony</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="toggle-icon" />
                        <span className="toggle-label">Wyłączony</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="setting-group-title">Dane i eksport</div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Eksport danych</div>
                  <div className="setting-description">Eksportuj wszystkie swoje dane w formacie JSON</div>
                </div>
                <div className="setting-control">
                  <button className="btn btn-sm">
                    Eksportuj dane
                  </button>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">Poziom logowania</div>
                  <div className="setting-description">Określ poziom szczegółowości logów aplikacji</div>
                </div>
                <div className="setting-control">
                  <select 
                    className="form-control"
                    value={advancedSettings.loggingLevel}
                    onChange={(e) => {
                      setAdvancedSettings({...advancedSettings, loggingLevel: e.target.value});
                      showSaveIndicator();
                    }}
                  >
                    <option value="minimal">Minimalny</option>
                    <option value="normal">Normalny</option>
                    <option value="verbose">Szczegółowy</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                className="btn btn-outline"
                onClick={() => resetToDefaults('advanced')}
              >
                Przywróć domyślne
              </button>
              
              <button 
                className="btn btn-primary"
                onClick={saveSettings}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Zapisywanie...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Zapisz zmiany
                  </>
                )}
              </button>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="settings-section">
            <h2 className="section-title">Wybierz kategorię ustawień</h2>
            <p className="section-description">Wybierz kategorię z menu po lewej stronie, aby zobaczyć i edytować ustawienia.</p>
          </div>
        );
    }
  };
  
  return (
    <div className={`settings-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="settings-header">
        <h1>Ustawienia</h1>
        <p>Zarządzaj swoim kontem i preferencjami</p>
      </div>
      
      <div className="settings-container">
        <div className="settings-sidebar">
          <nav className="settings-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={20} />
              <span>Profil</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'appearance' ? 'active' : ''}`}
              onClick={() => setActiveTab('appearance')}
            >
              {darkMode ? (
                <Moon size={20} />
              ) : (
                <Sun size={20} />
              )}
              <span>Wygląd</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={20} />
              <span>Powiadomienia</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai')}
            >
              <BrainCircuit size={20} />
              <span>Ustawienia AI</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveTab('privacy')}
            >
              <Lock size={20} />
              <span>Prywatność</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'subscription' ? 'active' : ''}`}
              onClick={() => setActiveTab('subscription')}
            >
              <CreditCard size={20} />
              <span>Subskrypcja</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'advanced' ? 'active' : ''}`}
              onClick={() => setActiveTab('advanced')}
            >
              <SettingsIcon size={20} />
              <span>Zaawansowane</span>
            </button>
          </nav>
          
          <div className="sidebar-footer">
            <button className="help-button">
              <HelpCircle size={16} />
              <span>Centrum pomocy</span>
            </button>
          </div>
        </div>
        
        <div className="settings-content">
          {renderTabContent()}
        </div>
      </div>
      
      {/* Save indicator */}
      {saveIndicator && (
        <div className="save-indicator">
          <Check size={18} />
          <span>Zmiany zostały zapisane!</span>
        </div>
      )}
      
      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="confirmation-backdrop">
          <div className="confirmation-dialog">
            <div className="confirmation-header">
              {confirmationType === 'reset' ? (
                <h3>Przywrócić ustawienia domyślne?</h3>
              ) : (
                <h3>Usunąć konto?</h3>
              )}
            </div>
            <div className="confirmation-body">
              {confirmationType === 'reset' ? (
                <p>Ta operacja przywróci domyślne wartości dla wszystkich ustawień w tej kategorii. Czy chcesz kontynuować?</p>
              ) : (
                <p>Ta operacja spowoduje trwałe usunięcie Twojego konta i wszystkich danych. Tej operacji nie można cofnąć. Czy chcesz kontynuować?</p>
              )}
            </div>
            <div className="confirmation-actions">
              <button 
                className="btn btn-outline"
                onClick={() => handleConfirmation(false)}
              >
                Anuluj
              </button>
              <button 
                className={`btn ${confirmationType === 'delete' ? 'btn-danger' : 'btn-primary'}`}
                onClick={() => handleConfirmation(true)}
              >
                {confirmationType === 'reset' ? 'Przywróć domyślne' : 'Usuń konto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;