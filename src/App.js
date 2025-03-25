import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DocumentEditor from './components/DocumentEditor';
import AIAssistant from './components/AIAssistant';
import Templates from './components/Templates';
import DocumentsPage from './components/DocumentsPage';
import AIAssistantPage from './components/AIAssistantPage';
import Settings from './components/Settings'; // Import the Settings component

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [documents, setDocuments] = useState([
    { id: 1, title: 'Umowa o pracę', createdAt: '2025-03-20', status: 'completed' },
    { id: 2, title: 'Oferta handlowa', createdAt: '2025-03-22', status: 'draft' },
    { id: 3, title: 'Raport kwartalny', createdAt: '2025-03-23', status: 'in-progress' },
  ]);
  const [activeDocument, setActiveDocument] = useState(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Add darkMode state

  const handleCreateDocument = (title, initialContent = '') => {
    const newDoc = {
      id: documents.length + 1,
      title,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'draft',
      content: initialContent
    };
    setDocuments([...documents, newDoc]);
    setActiveDocument(newDoc);
    setActivePage('editor');
  };

  const handleOpenDocument = (id) => {
    const doc = documents.find(doc => doc.id === id);
    if (doc) {
      setActiveDocument(doc);
      setActivePage('editor');
    }
  };

  const handleUpdateDocument = (updatedDoc) => {
    setDocuments(documents.map(doc => 
      doc.id === updatedDoc.id ? updatedDoc : doc
    ));
    setActiveDocument(updatedDoc);
  };

  const handleToggleAIAssistant = () => {
    setShowAIAssistant(!showAIAssistant);
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleAIGenerate = (prompt, type) => {
    // Simulate AI generation with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        let generatedContent = '';
        
        if (type === 'complete') {
          generatedContent = `
# ${activeDocument.title}

## Wstęp
Niniejszy dokument został przygotowany zgodnie z wytycznymi firmy i zawiera wszystkie niezbędne informacje.

## Główne postanowienia
1. Strony zobowiązują się do współpracy na zasadach określonych w umowie.
2. Termin realizacji projektu ustalono na 30 dni od podpisania umowy.
3. Wynagrodzenie będzie wypłacane w transzach, zgodnie z harmonogramem.

## Dodatkowe informacje
Wszelkie zmiany w umowie wymagają formy pisemnej pod rygorem nieważności.

*Dokument wygenerowany automatycznie przez Biuro AI*
          `;
        } else if (type === 'improve') {
          generatedContent = activeDocument.content + `

## Ulepszona wersja
Niniejszym strony postanawiają, że w przypadku niedotrzymania terminów określonych w umowie, strona odpowiedzialna za opóźnienie poniesie odpowiedzialność finansową w wysokości 0,1% wartości umowy za każdy dzień zwłoki.

*Ulepszono przez Biuro AI*
          `;
        } else if (type === 'summarize') {
          generatedContent = `
## Podsumowanie dokumentu
Dokument "${activeDocument.title}" reguluje zasady współpracy między stronami, określa terminy realizacji (30 dni) oraz zasady wynagradzania (transze). Wprowadzono klauzulę dotyczącą kar za niedotrzymanie terminów.

*Podsumowanie wygenerowane przez Biuro AI*
          `;
        }
        
        resolve(generatedContent);
      }, 2000);
    });
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onCreateDocument={handleCreateDocument}
        darkMode={darkMode}
      />
      <main className="main-content">
        {activePage === 'dashboard' && (
          <Dashboard 
            documents={documents} 
            onOpenDocument={handleOpenDocument} 
            darkMode={darkMode}
          />
        )}
        {activePage === 'documentspage' && (
          <DocumentsPage 
            darkMode={darkMode}
          />
        )}
        {activePage === 'templates' && (
          <Templates 
            onCreateDocument={handleCreateDocument} 
            darkMode={darkMode}
          />
        )}
        {activePage === 'ai' && (
          <AIAssistantPage 
            darkMode={darkMode}
          />
        )}
        {activePage === 'settings' && (
          <Settings 
            darkMode={darkMode} 
            onToggleDarkMode={handleToggleDarkMode}
          />
        )}
        {activePage === 'editor' && activeDocument && (
          <DocumentEditor 
            document={activeDocument}
            onUpdateDocument={handleUpdateDocument}
            onToggleAIAssistant={handleToggleAIAssistant}
            darkMode={darkMode}
          />
        )}
        {showAIAssistant && activeDocument && (
          <AIAssistant 
            onGenerate={handleAIGenerate} 
            onClose={handleToggleAIAssistant}
            darkMode={darkMode}
          />
        )}
      </main>
    </div>
  );
}

export default App;