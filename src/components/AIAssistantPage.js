import React, { useState, useRef, useEffect } from 'react';
import { 
  BrainCircuit, Send, FileText, FileEdit, Users, Calendar, 
  Mail, ListChecks, Sparkles, PenTool, Search, Copy, Download,
  Clock, CheckCircle, Settings, MessageSquare
} from 'lucide-react';
import '../css/AIAssistantPage.css';

const AIAssistantPage = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', content: 'Witaj w Asystencie AI! Jak mogę Ci dzisiaj pomóc?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiMetrics, setAiMetrics] = useState({
    documentsCreated: 142,
    timeSaved: 38,
    tasksAutomated: 67,
    accuracy: 96
  });
  
  // Document generation options
  const [documentType, setDocumentType] = useState('');
  const [documentDetails, setDocumentDetails] = useState({
    title: '',
    recipient: '',
    purpose: '',
    keyPoints: '',
    tone: 'formal'
  });
  
  // Meeting summary options
  const [meetingDetails, setMeetingDetails] = useState({
    title: '',
    date: '',
    participants: '',
    agenda: '',
    notes: '',
    actionItems: ''
  });
  
  // Text analysis options
  const [textToAnalyze, setTextToAnalyze] = useState('');
  const [analysisType, setAnalysisType] = useState('summary');
  
  // Email draft options
  const [emailDetails, setEmailDetails] = useState({
    recipient: '',
    subject: '',
    purpose: '',
    mainPoints: '',
    tone: 'professional'
  });
  
  // Task prioritization options
  const [tasks, setTasks] = useState('');
  const [prioritizationCriteria, setPrioritizationCriteria] = useState('deadline');
  
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Features data
  const features = [
    {
      id: 'document-generation',
      title: 'Generowanie dokumentów',
      description: 'Automatycznie twórz profesjonalne dokumenty na podstawie kilku wskazówek',
      icon: <FileText size={24} />,
      examples: ['Umowa o pracę', 'Raport kwartalny', 'Oferta handlowa'],
      detailTitle: 'Generowanie dokumentu',
      detailDescription: 'Wybierz typ dokumentu i podaj podstawowe informacje, a AI stworzy dla Ciebie profesjonalny dokument.'
    },
    {
      id: 'text-analysis',
      title: 'Analiza tekstu',
      description: 'Uzyskaj podsumowania, analizy sentymentu i kluczowe wnioski z dowolnego tekstu',
      icon: <Search size={24} />,
      examples: ['Podsumowanie tekstu', 'Analiza sentymentu', 'Wyciągnij kluczowe wnioski'],
      detailTitle: 'Analiza tekstu',
      detailDescription: 'Wklej tekst, który chcesz przeanalizować i wybierz typ analizy.'
    },
    {
      id: 'meeting-summaries',
      title: 'Podsumowania spotkań',
      description: 'Automatycznie generuj notatki ze spotkań i listy działań do wykonania',
      icon: <Users size={24} />,
      examples: ['Podsumowanie spotkania zespołu', 'Notatka z prezentacji', 'Plan działania'],
      detailTitle: 'Podsumowanie spotkania',
      detailDescription: 'Wprowadź kluczowe informacje o spotkaniu, a AI wygeneruje spójne podsumowanie i listę działań.'
    },
    {
      id: 'email-drafting',
      title: 'Tworzenie wiadomości email',
      description: 'Twórz profesjonalne emaile na każdą okazję biznesową',
      icon: <Mail size={24} />,
      examples: ['Email z podziękowaniem', 'Propozycja współpracy', 'Zaproszenie na spotkanie'],
      detailTitle: 'Pisanie emaila',
      detailDescription: 'Wprowadź podstawowe informacje o emailu, który chcesz utworzyć.'
    },
    {
      id: 'task-prioritization',
      title: 'Priorytetyzacja zadań',
      description: 'Uzyskaj pomoc w organizacji i priorytetyzacji zadań i projektów',
      icon: <ListChecks size={24} />,
      examples: ['Uporządkuj zadania tygodniowe', 'Zaplanuj sprint', 'Zorganizuj projekt'],
      detailTitle: 'Priorytetyzacja zadań',
      detailDescription: 'Wprowadź listę zadań, a AI pomoże Ci je uporządkować według wybranych kryteriów.'
    },
    {
      id: 'qa-assistant',
      title: 'Asystent pytań i odpowiedzi',
      description: 'Uzyskaj szybkie odpowiedzi na pytania dotyczące biznesu lub biura',
      icon: <MessageSquare size={24} />,
      examples: ['Jak napisać CV?', 'Najlepsze praktyki w prezentacjach', 'Porady dotyczące negocjacji'],
      detailTitle: 'Asystent Q&A',
      detailDescription: 'Zadaj pytanie, a AI udzieli Ci szczegółowej odpowiedzi.'
    }
  ];
  
  // Document type options
  const documentTypes = [
    { id: 'business-proposal', title: 'Oferta biznesowa', description: 'Formalna propozycja dla potencjalnych klientów' },
    { id: 'contract', title: 'Umowa', description: 'Dokument prawny określający warunki współpracy' },
    { id: 'report', title: 'Raport', description: 'Dokument prezentujący dane, analizy i wnioski' },
    { id: 'presentation', title: 'Prezentacja', description: 'Slajdy do przedstawienia pomysłu lub koncepcji' },
    { id: 'newsletter', title: 'Newsletter', description: 'Cykliczna komunikacja z klientami lub zespołem' },
    { id: 'press-release', title: 'Komunikat prasowy', description: 'Oficjalne oświadczenie dla mediów' },
  ];
  
  // Analysis type options
  const analysisTypes = [
    { id: 'summary', title: 'Podsumowanie', description: 'Zwięzłe streszczenie głównych punktów' },
    { id: 'key-points', title: 'Kluczowe punkty', description: 'Najważniejsze elementy tekstu w formie listy' },
    { id: 'sentiment', title: 'Analiza sentymentu', description: 'Ocena emocjonalnego wydźwięku tekstu' },
    { id: 'structure', title: 'Struktura dokumentu', description: 'Analiza organizacji i struktury tekstu' },
    { id: 'readability', title: 'Czytelność', description: 'Ocena łatwości czytania i zrozumienia tekstu' },
    { id: 'improvement', title: 'Sugestie ulepszeń', description: 'Propozycje poprawy jakości tekstu' },
  ];
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: inputMessage
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputMessage('');
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Get example response based on message content
    setTimeout(() => {
      const aiResponse = getAIResponse(inputMessage);
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: 'ai',
          content: aiResponse
        }
      ]);
      
      setIsTyping(false);
    }, 1500);
  };
  
  // Handle pressing Enter in the chat input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Simple pattern matching for demo AI responses
  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('cześć') || lowerMessage.includes('witaj') || lowerMessage.includes('hej')) {
      return 'Cześć! Jak mogę Ci dzisiaj pomóc?';
    } else if (lowerMessage.includes('dokument') && (lowerMessage.includes('stwórz') || lowerMessage.includes('generuj'))) {
      setActiveFeature('document-generation');
      return 'Chętnie pomogę Ci stworzyć dokument! Przygotowałem narzędzie do generowania dokumentów - możesz teraz wybrać typ dokumentu i wprowadzić szczegóły.';
    } else if (lowerMessage.includes('spotkanie') || lowerMessage.includes('notatka')) {
      setActiveFeature('meeting-summaries');
      return 'Pomogę Ci stworzyć podsumowanie spotkania! Wprowadź szczegóły spotkania w formularzu obok, a ja przygotuję profesjonalne podsumowanie.';
    } else if (lowerMessage.includes('email') || lowerMessage.includes('wiadomość')) {
      setActiveFeature('email-drafting');
      return 'Chętnie pomogę Ci napisać profesjonalny email! Podaj podstawowe informacje w formularzu, a ja przygotuję treść wiadomości.';
    } else if (lowerMessage.includes('zadani') || lowerMessage.includes('priorytet')) {
      setActiveFeature('task-prioritization');
      return 'Pomogę Ci uporządkować zadania według priorytetów! Wprowadź listę zadań w formularzu obok, a ja pomogę Ci je zorganizować.';
    } else if (lowerMessage.includes('analiz') || lowerMessage.includes('tekst')) {
      setActiveFeature('text-analysis');
      return 'Mogę przeanalizować tekst dla Ciebie! Wklej treść do analizy w formularzu obok i wybierz typ analizy, który Cię interesuje.';
    } else if (lowerMessage.includes('pomóż') || lowerMessage.includes('porada')) {
      setActiveFeature('qa-assistant');
      return 'Służę pomocą! Możesz zadać mi konkretne pytanie, a ja postaram się udzielić najlepszej odpowiedzi.';
    } else if (lowerMessage.includes('dzięki') || lowerMessage.includes('dziękuję')) {
      return 'Cała przyjemność po mojej stronie! Czy mogę jeszcze w czymś pomóc?';
    } else {
      return 'Rozumiem. Czy chciałbyś skorzystać z jednej z moich funkcji? Mogę pomóc w generowaniu dokumentów, analizie tekstu, tworzeniu podsumowań spotkań, pisaniu emaili, priorytetyzacji zadań lub odpowiadaniu na pytania.';
    }
  };
  
  // Handle feature example click
  const handleExampleClick = (feature, example) => {
    setActiveFeature(feature);
    setInputMessage(`Pomóż mi z: ${example}`);
  };
  
  // Handle generating content based on active feature
  const handleGenerateContent = () => {
    setIsGenerating(true);
    
    // Simulate processing time
    setTimeout(() => {
      let generatedText = '';
      
      switch (activeFeature) {
        case 'document-generation':
          generatedText = generateDocument();
          break;
        case 'text-analysis':
          generatedText = analyzeText();
          break;
        case 'meeting-summaries':
          generatedText = generateMeetingSummary();
          break;
        case 'email-drafting':
          generatedText = generateEmail();
          break;
        case 'task-prioritization':
          generatedText = prioritizeTasks();
          break;
        case 'qa-assistant':
          generatedText = getDetailedAnswer(inputMessage);
          break;
        default:
          generatedText = 'Nie wybrano funkcji.';
      }
      
      setGeneratedContent(generatedText);
      setIsGenerating(false);
      
      // Add message about successful generation
      const featureInfo = features.find(f => f.id === activeFeature);
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: 'ai',
          content: `✅ ${featureInfo?.title} zakończone pomyślnie! Możesz zobaczyć wyniki obok.`
        }
      ]);
      
      // Update AI metrics
      setAiMetrics(prev => ({
        ...prev,
        documentsCreated: prev.documentsCreated + 1,
        timeSaved: prev.timeSaved + Math.floor(Math.random() * 3) + 1 // Random time saved between 1-3 hours
      }));
      
    }, 2500);
  };
  
  // Generate document content
  const generateDocument = () => {
    if (!documentType || !documentDetails.title) {
      return 'Nie podano wystarczających informacji.';
    }
    
    const selectedType = documentTypes.find(t => t.id === documentType);
    
    let document = '';
    
    switch (documentType) {
      case 'business-proposal':
        document = `# Oferta biznesowa: ${documentDetails.title}

## Wprowadzenie
Ta oferta została przygotowana dla ${documentDetails.recipient || '[Nazwa odbiorcy]'} przez asystenta AI w dniu ${new Date().toLocaleDateString('pl-PL')}.

## Cel
${documentDetails.purpose || 'Przedstawienie kompleksowej oferty współpracy biznesowej.'}

## Kluczowe elementy oferty
${documentDetails.keyPoints || '• Innowacyjne rozwiązania dostosowane do potrzeb klienta\n• Konkurencyjne ceny i elastyczne warunki współpracy\n• Profesjonalna obsługa i wsparcie techniczne'}

## Propozycja współpracy
Proponujemy rozpoczęcie współpracy na podstawie przedstawionych warunków. Nasza firma oferuje pełne wsparcie we wdrażaniu rozwiązań oraz dedykowanego opiekuna projektu.

## Następne kroki
1. Spotkanie w celu omówienia szczegółów oferty
2. Przygotowanie umowy ramowej
3. Rozpoczęcie współpracy

---
Dokument wygenerowany automatycznie przez Biuro AI`;
        break;
        
      case 'contract':
        document = `# UMOWA WSPÓŁPRACY

Zawarta w dniu ${new Date().toLocaleDateString('pl-PL')} pomiędzy:

**[Nazwa Firmy]** z siedzibą w [Adres], NIP: [numer NIP], reprezentowaną przez [Imię i Nazwisko], zwaną dalej "Zleceniodawcą"

a

**${documentDetails.recipient || '[Nazwa Kontrahenta]'}** z siedzibą w [Adres], NIP: [numer NIP], reprezentowaną przez [Imię i Nazwisko], zwaną dalej "Zleceniobiorcą"

## § 1 Przedmiot umowy

1. Przedmiotem niniejszej umowy jest ${documentDetails.purpose || 'świadczenie usług w zakresie [opis zakresu usług]'}.
2. Szczegółowy zakres prac obejmuje:
   ${documentDetails.keyPoints || '- Przygotowanie i wdrożenie rozwiązania\n   - Testy i optymalizacja\n   - Szkolenie pracowników\n   - Wsparcie techniczne'}

## § 2 Wynagrodzenie

1. Za wykonanie przedmiotu umowy Zleceniobiorca otrzyma wynagrodzenie w wysokości [kwota] zł netto.
2. Wynagrodzenie będzie płatne w terminie 14 dni od daty wystawienia faktury VAT.

## § 3 Termin realizacji

1. Strony ustalają, że przedmiot umowy zostanie zrealizowany w terminie [liczba] dni od dnia podpisania umowy.

## § 4 Postanowienia końcowe

1. W sprawach nieuregulowanych niniejszą umową mają zastosowanie przepisy Kodeksu Cywilnego.
2. Wszelkie zmiany niniejszej umowy wymagają formy pisemnej pod rygorem nieważności.
3. Umowę sporządzono w dwóch jednobrzmiących egzemplarzach, po jednym dla każdej ze stron.

---

**Zleceniodawca:**                                               **Zleceniobiorca:**

........................................                     ........................................

_Dokument wygenerowany przez Biuro AI_`;
        break;
        
      case 'report':
        document = `# ${documentDetails.title || 'Raport analityczny'}

**Data:** ${new Date().toLocaleDateString('pl-PL')}  
**Przygotowane dla:** ${documentDetails.recipient || '[Nazwa odbiorcy]'}  
**Autor:** Biuro AI

## Wprowadzenie
${documentDetails.purpose || 'Niniejszy raport przedstawia analizę danych i kluczowe wnioski dotyczące działalności firmy w ostatnim kwartale.'}

## Metodologia
Do przeprowadzenia analizy wykorzystano zaawansowane metody statystyczne oraz dane z systemu wewnętrznego firmy. Analizowany okres obejmuje ostatnie trzy miesiące działalności.

## Kluczowe ustalenia
${documentDetails.keyPoints || '1. Wzrost przychodów o 12% w porównaniu do poprzedniego kwartału\n2. Zwiększenie liczby klientów o 8%\n3. Redukcja kosztów operacyjnych o 5%\n4. Wprowadzenie nowych produktów zwiększyło sprzedaż o 15%'}

## Analiza szczegółowa
### Wyniki finansowe
- Przychody: X PLN (wzrost o Y% r/r)
- Koszty: X PLN (spadek o Y% r/r)
- Marża: X% (wzrost o Y punktów procentowych)

### Działania marketingowe
- Kampania X przyniosła Y nowych klientów
- Współczynnik konwersji wzrósł o Z%
- ROI działań marketingowych: X%

## Wnioski i rekomendacje
Na podstawie przeprowadzonej analizy rekomendujemy:
1. Zwiększenie inwestycji w kanały marketingowe o najwyższym współczynniku konwersji
2. Optymalizację procesu obsługi klienta w celu zwiększenia satysfakcji
3. Rozwój nowych produktów w segmencie X, który wykazuje największy potencjał wzrostu

## Podsumowanie
${documentDetails.purpose || 'Wyniki firmy w analizowanym okresie pokazują pozytywny trend wzrostowy. Kontynuacja obecnej strategii z uwzględnieniem rekomendowanych usprawnień powinna przełożyć się na dalszy wzrost przychodów i rentowności.'}

---
*Raport wygenerowany automatycznie przez Biuro AI*`;
        break;
        
      default:
        document = `# ${documentDetails.title || 'Dokument biznesowy'}

Dokument przygotowany dla: ${documentDetails.recipient || '[Nazwa odbiorcy]'}
Data utworzenia: ${new Date().toLocaleDateString('pl-PL')}

## Cel dokumentu
${documentDetails.purpose || 'Brak określonego celu dokumentu.'}

## Zawartość
${documentDetails.keyPoints || 'Brak określonej zawartości dokumentu.'}

---
Dokument wygenerowany automatycznie przez Biuro AI`;
    }
    
    return document;
  };
  
  // Analyze text content
  const analyzeText = () => {
    if (!textToAnalyze) {
      return 'Nie podano tekstu do analizy.';
    }
    
    switch (analysisType) {
      case 'summary':
        return `## Podsumowanie

${textToAnalyze.length > 200 
  ? textToAnalyze.slice(0, 200) + '...' 
  : textToAnalyze}

Główne tezy dokumentu:
1. ${textToAnalyze.split(' ').slice(0, 10).join(' ')}...
2. ${textToAnalyze.split(' ').slice(10, 20).join(' ')}...
3. ${textToAnalyze.split(' ').slice(20, 30).join(' ')}...

Dokument zawiera ${textToAnalyze.split(' ').length} słów i porusza tematykę biznesową związaną z ${textToAnalyze.includes('marketing') ? 'marketingiem' : textToAnalyze.includes('finans') ? 'finansami' : 'zarządzaniem'}.

---
*Analiza wygenerowana przez Biuro AI*`;
        
      case 'key-points':
        return `## Kluczowe punkty dokumentu

${Array(5).fill().map((_, i) => {
  const start = Math.floor(Math.random() * Math.max(textToAnalyze.length - 50, 1));
  return `${i + 1}. ${textToAnalyze.slice(start, start + 50)}...`;
}).join('\n')}

---
*Analiza wygenerowana przez Biuro AI*`;
        
      case 'sentiment':
        const sentimentScore = Math.random() * 2 - 1; // Random score between -1 and 1
        let sentiment, description;
        
        if (sentimentScore > 0.3) {
          sentiment = 'Pozytywny';
          description = 'Dokument zawiera przeważającą liczbę pozytywnych wyrażeń i stwierdzeń.';
        } else if (sentimentScore < -0.3) {
          sentiment = 'Negatywny';
          description = 'Dokument zawiera przeważającą liczbę negatywnych wyrażeń i stwierdzeń.';
        } else {
          sentiment = 'Neutralny';
          description = 'Dokument zawiera zbalansowaną mieszankę wyrażeń neutralnych, pozytywnych i negatywnych.';
        }
        
        return `## Analiza sentymentu

**Ogólny wydźwięk dokumentu:** ${sentiment}

**Wynik liczbowy:** ${sentimentScore.toFixed(2)} (w skali od -1 do 1)

**Opis:** ${description}

**Szczegółowa analiza emocjonalna:**
- Pozytywne wyrażenia: ${Math.round((sentimentScore + 1) * 50)}%
- Negatywne wyrażenia: ${Math.round((1 - sentimentScore) * 50)}%
- Neutralne wyrażenia: ${Math.round(50 - Math.abs(sentimentScore) * 50)}%

**Dominujące emocje:**
${sentimentScore > 0 
  ? '- Zaufanie\n- Radość\n- Optymizm' 
  : sentimentScore < 0 
    ? '- Niepewność\n- Obawa\n- Ostrożność' 
    : '- Neutralność\n- Obiektywizm\n- Analityczność'}

---
*Analiza wygenerowana przez Biuro AI*`;
        
      case 'structure':
        const wordCount = textToAnalyze.split(' ').length;
        const sentenceCount = (textToAnalyze.match(/[.!?]+/g) || []).length;
        const paragraphCount = (textToAnalyze.match(/\n\s*\n/g) || []).length + 1;
        
        return `## Analiza struktury dokumentu

**Statystyki:**
- Liczba słów: ${wordCount}
- Liczba zdań: ${sentenceCount}
- Liczba akapitów: ${paragraphCount}
- Średnia długość zdania: ${Math.round(wordCount / Math.max(sentenceCount, 1))} słów
- Średnia długość akapitu: ${Math.round(sentenceCount / Math.max(paragraphCount, 1))} zdań

**Struktura dokumentu:**
${paragraphCount > 1 
  ? Array(Math.min(paragraphCount, 5)).fill().map((_, i) => `- Akapit ${i + 1}: ${Math.round(wordCount / paragraphCount)} słów`).join('\n')
  : '- Dokument składa się z jednego akapitu'}

**Sugestie strukturalne:**
${wordCount > 300 
  ? '- Zalecane dodanie podtytułów dla poprawy czytelności\n- Rozważenie podziału na mniejsze sekcje'
  : '- Dokument ma odpowiednią długość dla czytelności\n- Struktura jest adekwatna do zawartości'}

---
*Analiza wygenerowana przez Biuro AI*`;
        
      case 'readability':
        const readabilityScore = Math.random() * 100;
        let readabilityLevel, suggestions;
        
        if (readabilityScore > 80) {
          readabilityLevel = 'Łatwy do czytania';
          suggestions = '- Tekst jest łatwy i przystępny\n- Brak sugestii poprawy czytelności';
        } else if (readabilityScore > 60) {
          readabilityLevel = 'Średnio trudny';
          suggestions = '- Zastosuj krótsze zdania\n- Unikaj żargonu specjalistycznego\n- Dodaj więcej nagłówków';
        } else {
          readabilityLevel = 'Trudny';
          suggestions = '- Znacznie uprość słownictwo\n- Skróć zdania\n- Dodaj wyjaśnienia pojęć specjalistycznych\n- Zastosuj więcej punktowania';
        }
        
        return `## Analiza czytelności

**Poziom czytelności:** ${readabilityLevel}

**Wynik liczbowy:** ${readabilityScore.toFixed(1)}/100

**Statystyki czytelności:**
- Indeks FOG: ${Math.round(readabilityScore / 10)}
- Średnia długość zdania: ${Math.round(Math.random() * 10) + 10} słów
- Procent trudnych słów: ${Math.round(100 - readabilityScore)}%

**Docelowi czytelnicy:**
${readabilityScore > 80 
  ? 'Tekst jest zrozumiały dla szerokiego grona odbiorców, w tym osób bez specjalistycznej wiedzy.' 
  : readabilityScore > 60 
    ? 'Tekst wymaga pewnego poziomu wiedzy specjalistycznej i jest skierowany do osób zaznajomionych z tematyką.' 
    : 'Tekst jest skierowany do ekspertów w danej dziedzinie, wymaga specjalistycznej wiedzy.'}

**Sugestie poprawy czytelności:**
${suggestions}

---
*Analiza wygenerowana przez Biuro AI*`;
        
      case 'improvement':
        return `## Sugestie ulepszeń

**Ogólne zalecenia:**
1. Dodaj jasne wprowadzenie określające cel dokumentu
2. Zastosuj więcej nagłówków i podpunktów dla lepszej struktury
3. Skróć zdania zawierające więcej niż 20 słów
4. Dodaj podsumowanie na końcu dokumentu

**Sugestie stylistyczne:**
- Zastąp pasywne konstrukcje aktywnymi
- Użyj więcej konkretnych przykładów zamiast ogólnych stwierdzeń
- Dodaj przejścia między akapitami dla lepszej płynności

**Sugestie dotyczące zawartości:**
- Rozważ dodanie danych liczbowych wspierających główne tezy
- Uwzględnij więcej wizualnych elementów (tabele, wykresy)
- Dodaj odniesienia do aktualnych trendów branżowych

**Propozycje sformułowań do poprawy:**
${textToAnalyze.length > 200 ? textToAnalyze.slice(0, 100) + '...' : textToAnalyze} → *[Poprawiona wersja z jaśniejszym przekazem]*

---
*Analiza wygenerowana przez Biuro AI*`;
        
      default:
        return `## Analiza tekstu

Przeanalizowany tekst zawiera ${textToAnalyze.split(' ').length} słów i porusza tematykę biznesową.

---
*Analiza wygenerowana przez Biuro AI*`;
    }
  };
  
  // Generate meeting summary
  const generateMeetingSummary = () => {
    if (!meetingDetails.title || !meetingDetails.date) {
      return 'Nie podano wystarczających informacji o spotkaniu.';
    }
    
    return `# Podsumowanie spotkania: ${meetingDetails.title}

**Data:** ${meetingDetails.date}  
**Uczestnicy:** ${meetingDetails.participants || 'Nie określono'}

## Agenda
${meetingDetails.agenda 
  ? meetingDetails.agenda
  : '1. Omówienie bieżących projektów\n2. Planowanie nadchodzących działań\n3. Dyskusja nad wyzwaniami\n4. Ustalenie następnych kroków'}

## Kluczowe punkty dyskusji
${meetingDetails.notes 
  ? meetingDetails.notes.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n')
  : '1. Omówiono postępy w projekcie X - realizacja zgodnie z harmonogramem\n2. Zidentyfikowano wyzwania związane z ograniczeniami budżetowymi\n3. Zaproponowano nowe rozwiązania w zakresie komunikacji z klientami\n4. Przedstawiono wyniki ostatnich działań marketingowych'}

## Działania do wykonania
${meetingDetails.actionItems 
  ? meetingDetails.actionItems.split('\n').map(line => `- ${line}`).join('\n')
  : '- [Anna] Przygotowanie raportu z wynikami kwartalnymi do 15.04\n- [Jan] Kontakt z klientem X w sprawie rozszerzenia umowy\n- [Wszyscy] Przegląd propozycji nowej strategii marketingowej do następnego spotkania\n- [Piotr] Aktualizacja harmonogramu projektu Y'}

## Następne spotkanie
Zaplanowano na: *[data zostanie ustalona]*

---
*Podsumowanie wygenerowane przez Biuro AI ${new Date().toLocaleDateString('pl-PL')}*`;
  };
  
  // Generate email draft
  const generateEmail = () => {
    if (!emailDetails.subject || !emailDetails.purpose) {
      return 'Nie podano wystarczających informacji o emailu.';
    }
    
    const formality = emailDetails.tone === 'formal' ? 'formal' : 
                      emailDetails.tone === 'casual' ? 'casual' : 'professional';
    
    const salutation = formality === 'formal' ? 'Szanowny Panie/Szanowna Pani,' : 
                       formality === 'casual' ? 'Cześć,' : 'Dzień dobry,';
    
    const closing = formality === 'formal' ? 'Z poważaniem,' : 
                    formality === 'casual' ? 'Pozdrawiam,' : 'Z wyrazami szacunku,';
    
    return `Temat: ${emailDetails.subject}

${salutation}

${formality === 'formal' 
  ? 'Uprzejmie informuję, że ' 
  : formality === 'casual' 
    ? 'Chciałem/am poinformować, że ' 
    : 'Informuję, że '}${emailDetails.purpose.toLowerCase().startsWith('uprzejmie') ? emailDetails.purpose.slice(9) : emailDetails.purpose}

${emailDetails.mainPoints 
  ? emailDetails.mainPoints 
  : 'W razie jakichkolwiek pytań, pozostaję do dyspozycji.'}

${closing}
[Twoje imię i nazwisko]
[Stanowisko]
[Dane kontaktowe]

---
*Email wygenerowany przez Biuro AI*`;
  };
  
  // Prioritize tasks
  const prioritizeTasks = () => {
    if (!tasks) {
      return 'Nie wprowadzono listy zadań.';
    }
    
    const taskList = tasks.split('\n').filter(task => task.trim());
    
    // Create prioritized tasks based on selected criteria
    let prioritizedTasks = [...taskList];
    const priorities = ['Wysoki', 'Średni', 'Niski'];
    const deadlines = ['Dziś', 'Jutro', 'W tym tygodniu', 'W przyszłym tygodniu', 'W tym miesiącu'];
    const efforts = ['Mały (< 1h)', 'Średni (2-4h)', 'Duży (> 4h)'];
    
    // Shuffle and assign metadata
    prioritizedTasks = prioritizedTasks.map(task => {
      const priority = priorities[Math.floor(Math.random() * priorities.length)];
      const deadline = deadlines[Math.floor(Math.random() * deadlines.length)];
      const effort = efforts[Math.floor(Math.random() * efforts.length)];
      const score = (
        (priority === 'Wysoki' ? 3 : priority === 'Średni' ? 2 : 1) * 
        (deadline === 'Dziś' ? 5 : deadline === 'Jutro' ? 4 : deadline === 'W tym tygodniu' ? 3 : deadline === 'W przyszłym tygodniu' ? 2 : 1) *
        (effort === 'Mały (< 1h)' ? 3 : effort === 'Średni (2-4h)' ? 2 : 1)
      );
      
      return { task, priority, deadline, effort, score };
    });
    
    // Sort based on criteria
    switch (prioritizationCriteria) {
      case 'deadline':
        prioritizedTasks.sort((a, b) => {
          const deadlineOrder = { 'Dziś': 0, 'Jutro': 1, 'W tym tygodniu': 2, 'W przyszłym tygodniu': 3, 'W tym miesiącu': 4 };
          return deadlineOrder[a.deadline] - deadlineOrder[b.deadline];
        });
        break;
      case 'priority':
        prioritizedTasks.sort((a, b) => {
          const priorityOrder = { 'Wysoki': 0, 'Średni': 1, 'Niski': 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
        break;
      case 'effort':
        prioritizedTasks.sort((a, b) => {
          const effortOrder = { 'Mały (< 1h)': 0, 'Średni (2-4h)': 1, 'Duży (> 4h)': 2 };
          return effortOrder[a.effort] - effortOrder[b.effort];
        });
        break;
      case 'balanced':
        prioritizedTasks.sort((a, b) => b.score - a.score);
        break;
      default:
        // No sorting
    }
    
    return `# Priorytetyzacja zadań

*Kryterium sortowania: ${
  prioritizationCriteria === 'deadline' ? 'Terminy' : 
  prioritizationCriteria === 'priority' ? 'Priorytety' : 
  prioritizationCriteria === 'effort' ? 'Nakład pracy' : 
  'Zbalansowany (priorytety, terminy i nakład pracy)'
}*

## Lista zadań według priorytetów

${prioritizedTasks.map((taskObj, index) => `### ${index + 1}. ${taskObj.task}
- **Priorytet:** ${taskObj.priority}
- **Termin:** ${taskObj.deadline}
- **Nakład pracy:** ${taskObj.effort}
`).join('\n')}

## Zalecany plan działania

1. **Zadania do natychmiastowej realizacji:**
${prioritizedTasks.filter(t => t.priority === 'Wysoki' || t.deadline === 'Dziś').slice(0, 3).map(t => `   - ${t.task}`).join('\n')}

2. **Zadania do zaplanowania na najbliższe dni:**
${prioritizedTasks.filter(t => t.priority === 'Średni' || ['Jutro', 'W tym tygodniu'].includes(t.deadline)).slice(0, 3).map(t => `   - ${t.task}`).join('\n')}

3. **Zadania do delegowania lub przełożenia (jeśli to możliwe):**
${prioritizedTasks.filter(t => t.priority === 'Niski' && !['Dziś', 'Jutro'].includes(t.deadline)).slice(0, 3).map(t => `   - ${t.task}`).join('\n')}

---
*Priorytetyzacja wygenerowana przez Biuro AI*`;
  };
  
  // Get detailed answer for Q&A
  const getDetailedAnswer = (question) => {
    if (!question) {
      return 'Nie zadano pytania.';
    }
    
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('jak napisać cv')) {
      return `# Jak napisać profesjonalne CV

## Kluczowe elementy dobrego CV

1. **Czytelna struktura i formatowanie**
   - Użyj przejrzystego układu z nagłówkami i podpunktami
   - Wybierz profesjonalną czcionkę (np. Arial, Calibri, Garamond)
   - Zachowaj spójny styl w całym dokumencie
   - Ogranicz CV do 1-2 stron

2. **Dane kontaktowe**
   - Imię i nazwisko
   - Numer telefonu
   - Adres e-mail (profesjonalny)
   - Opcjonalnie: LinkedIn, portfolio online
   - Zrezygnuj z adresu zamieszkania, chyba że jest wymagany

3. **Profil zawodowy / podsumowanie**
   - Krótki akapit (2-3 zdania) podkreślający Twoje kluczowe kompetencje
   - Dostosuj treść do stanowiska, o które się ubiegasz
   - Podkreśl wartość, jaką wnosisz dla potencjalnego pracodawcy

4. **Doświadczenie zawodowe**
   - Zastosuj odwróconą chronologię (od najnowszych do najstarszych)
   - Dla każdego stanowiska podaj: nazwę firmy, okres zatrudnienia, stanowisko
   - Opisz swoje osiągnięcia używając konkretnych liczb i danych
   - Używaj czasowników czynnych (np. "zarządzałem", "zwiększyłem", "wdrożyłem")

5. **Wykształcenie**
   - Uczelnia, kierunek, uzyskany tytuł, rok ukończenia
   - Dla osób z niewielkim doświadczeniem: dodaj istotne kursy, projekty, średnią ocen

6. **Umiejętności**
   - Podziel na kategorie (np. umiejętności techniczne, językowe, miękkie)
   - Bądź konkretny (zamiast "dobra znajomość Excel" napisz "zaawansowane formuły Excel, tabele przestawne, VBA")
   - Wskaż poziom znajomości języków obcych według standardu (A1-C2)

7. **Dodatkowe sekcje (opcjonalnie)**
   - Certyfikaty i szkolenia
   - Projekty i osiągnięcia
   - Publikacje
   - Wolontariat
   - Zainteresowania (jeśli są istotne dla stanowiska)

## Praktyczne wskazówki

- **Dostosuj CV do konkretnej oferty pracy** - podkreśl umiejętności i doświadczenia najbardziej odpowiadające wymaganiom
- **Używaj słów kluczowych z ogłoszenia** - pomaga to przejść przez systemy ATS (Applicant Tracking System)
- **Skup się na osiągnięciach, nie obowiązkach** - pokazuj rezultaty swojej pracy, nie tylko zakres odpowiedzialności
- **Unikaj błędów językowych** - poproś kogoś o sprawdzenie dokumentu
- **Zapisz w odpowiednim formacie** - najlepiej PDF, chyba że pracodawca wymaga innego formatu

## Czego unikać

- Zdjęcia, chyba że jest wymagane lub typowe w branży
- Błędów ortograficznych i interpunkcyjnych
- Nieistotnych informacji osobistych (wiek, stan cywilny, etc.)
- Kłamstw i przesady
- Generycznych stwierdzeń bez konkretów

---
*Poradnik wygenerowany przez Biuro AI*`;
    } else if (lowerQuestion.includes('prezentacj')) {
      return `# Najlepsze praktyki w przygotowaniu prezentacji biznesowych

## Planowanie i struktura

1. **Określ jasny cel prezentacji**
   - Co chcesz osiągnąć? Informować, przekonać, zainspirować?
   - Jaka jest główna myśl, którą odbiorcy powinni zapamiętać?

2. **Poznaj swoją publiczność**
   - Dostosuj treść i poziom szczegółowości do wiedzy odbiorców
   - Zrozum, co jest dla nich wartościowe i istotne

3. **Zastosuj strukturę trójdzielną**
   - Wstęp: powiedz, o czym będziesz mówić
   - Rozwinięcie: przedstaw główne punkty
   - Zakończenie: podsumuj, co powiedziałeś

4. **Zasada 10-20-30**
   - Maksymalnie 10 slajdów
   - Nie dłużej niż 20 minut
   - Minimum 30-punktowa czcionka

## Projektowanie slajdów

1. **Minimalizm**
   - Jeden slajd = jedna idea
   - Ogranicz tekst do absolutnego minimum (maksymalnie 6 linii tekstu, 6 słów w linii)
   - Używaj punktów zamiast pełnych zdań

2. **Spójność wizualna**
   - Użyj szablonu z jednolitymi kolorami, czcionkami i układem
   - Zachowaj spójne formatowanie wykresów i elementów graficznych
   - Stosuj kolory firmowe, jeśli to właściwe

3. **Efektywne wykorzystanie multimediów**
   - Używaj wysokiej jakości zdjęć i grafik
   - Stosuj wykresy zamiast tabel z danymi
   - Unikaj clipartów i efektów specjalnych, które rozpraszają

4. **Kontrast i czytelność**
   - Duży kontrast między tekstem a tłem
   - Czytelne czcionki (bezszeryfowe do prezentacji)
   - Wystarczająco duże elementy graficzne

## Prezentowanie

1. **Przygotowanie**
   - Ćwicz prezentację co najmniej 3-5 razy
   - Przygotuj się na pytania i wątpliwości
   - Sprawdź sprzęt i połączenie przed prezentacją

2. **Język ciała i głos**
   - Utrzymuj kontakt wzrokowy z publicznością
   - Mów wyraźnie i z odpowiednią głośnością
   - Używaj gestów naturalnie, by podkreślić kluczowe punkty
   - Kontroluj tempo mówienia (nie za szybko)

3. **Opowiadanie historii**
   - Wykorzystaj elementy storytellingu
   - Zacznij od problemu lub wyzwania, które przykuje uwagę
   - Użyj konkretnych przykładów i anegdot

4. **Interakcja z publicznością**
   - Zadawaj pytania
   - Zachęcaj do dyskusji w odpowiednich momentach
   - Reaguj na sygnały niewerbalne od odbiorców

## Częste błędy do uniknięcia

- Czytanie tekstu ze slajdów słowo w słowo
- Przeładowanie slajdów tekstem i danymi
- Używanie zbyt wielu animacji i przejść
- Przekraczanie wyznaczonego czasu
- Brak przygotowania na problemy techniczne
- Ignorowanie pytań lub wątpliwości publiczności

## Narzędzia i zasoby

- **Oprogramowanie**: PowerPoint, Google Slides, Prezi, Canva, Keynote
- **Banki zdjęć**: Unsplash, Pexels, Shutterstock
- **Ikony i grafiki**: Flaticon, Freepik, The Noun Project
- **Czcionki**: Google Fonts, Adobe Fonts

---
*Poradnik wygenerowany przez Biuro AI*`;
    } else if (lowerQuestion.includes('negocjac')) {
      return `# Porady dotyczące negocjacji biznesowych

## Podstawowe zasady efektywnych negocjacji

1. **Przygotowanie jest kluczem**
   - Zbierz informacje o drugiej stronie (potrzeby, ograniczenia, pozycja rynkowa)
   - Określ swoje cele, BATNA (Best Alternative To a Negotiated Agreement) i czerwone linie
   - Przygotuj argumenty i kontrargumenty poparte danymi
   - Zidentyfikuj potencjalne obszary kompromisu

2. **Skupienie na interesach, nie stanowiskach**
   - Zrozum prawdziwe potrzeby i interesy drugiej strony
   - Szukaj rozwiązań korzystnych dla obu stron (win-win)
   - Odseparuj ludzi od problemu - negocjuj twardo merytorycznie, ale miękko personalnie

3. **Komunikacja i aktywne słuchanie**
   - Zadawaj otwarte pytania
   - Parafrazuj wypowiedzi rozmówcy, aby potwierdzić zrozumienie
   - Obserwuj mowę ciała i sygnały niewerbalne
   - Kontroluj swoje emocje i reaguj spokojnie

## Taktyki negocjacyjne

1. **Taktyki proaktywne**
   - **Salami** - dzielenie negocjacji na małe kroki i osiąganie małych ustępstw
   - **Wysoka piłka/niska piłka** - rozpoczęcie od ekstremalnej pozycji, by później ustąpić
   - **Dobry glina/zły glina** - dwie osoby prezentują odmienne podejścia
   - **Ograniczony mandat** - "Muszę skonsultować to z zarządem/przełożonymi"

2. **Jak reagować na trudne taktyki**
   - Rozpoznawaj manipulacje i niewłaściwe taktyki
   - Nazwij taktykę, gdy ją zauważysz (np. "Wydaje się, że stosujesz presję czasową")
   - Zaproponuj przerwę, gdy atmosfera staje się napięta
   - Skup rozmowę ponownie na merytorycznych aspektach

3. **Budowanie porozumienia**
   - Szukaj wspólnych płaszczyzn i podkreślaj je
   - Używaj małych ustępstw jako gestu dobrej woli
   - Proponuj kreatywne rozwiązania wychodzące poza oczywiste opcje
   - Buduj relację na przyszłość, nie tylko na obecną transakcję

## Negocjacje międzykulturowe

- **Różnice kulturowe** - zapoznaj się z normami kulturowymi, stylami komunikacji i podejściem do czasu
- **Język i komunikacja** - używaj jasnego, prostego języka; unikaj idiomów i żargonu
- **Hierarchia i proces decyzyjny** - zrozum, kto podejmuje decyzje i jak wygląda proces
- **Znaczenie relacji** - w niektórych kulturach budowa relacji poprzedza negocjacje biznesowe

## Typowe błędy negocjacyjne

- **Niewystarczające przygotowanie** - brak wiedzy o drugiej stronie i o własnych możliwościach
- **Skupienie na jednym rozwiązaniu** - ograniczenie kreatywności i elastyczności
- **Zbyt szybkie ustępstwa** - osłabienie własnej pozycji negocjacyjnej
- **Ignorowanie sygnałów niewerbalnych** - przeoczenie ważnych wskazówek
- **Brak zapisania ustaleń** - ryzyko różnych interpretacji tego, co zostało uzgodnione

## Podsumowanie i najlepsze praktyki

1. Dokładnie przygotuj się przed każdymi negocjacjami
2. Ustal jasne cele i priorytety
3. Słuchaj aktywnie i zadawaj właściwe pytania
4. Szukaj rozwiązań korzystnych dla wszystkich stron
5. Buduj długoterminowe relacje, nie tylko jednorazowe transakcje
6. Zawsze spisuj ustalenia na piśmie
7. Analizuj po fakcie, co poszło dobrze, a co można poprawić w przyszłości

---
*Poradnik wygenerowany przez Biuro AI*`;
    } else {
      return `# Odpowiedź na pytanie: "${question}"

Niestety, nie posiadam wystarczającej ilości danych, by udzielić szczegółowej odpowiedzi na to konkretne pytanie. Zalecam:

1. Sprawdzenie wewnętrznych dokumentów firmowych lub bazy wiedzy
2. Konsultację z odpowiednim specjalistą w danej dziedzinie
3. Poszukanie informacji w wiarygodnych źródłach zewnętrznych

Możesz również spróbować zadać bardziej szczegółowe pytanie lub skorzystać z jednej z moich innych funkcji, takich jak generowanie dokumentów czy analiza tekstu.

---
*Odpowiedź wygenerowana przez Biuro AI*`;
    }
  };
  
  return (
    <div className="ai-assistant-page">
      <div className="ai-assistant-header">
        <h1>Asystent AI dla Biura</h1>
        <p>Twój inteligentny asystent, który pomaga w codziennych zadaniach biurowych. Generuj dokumenty, analizuj teksty, twórz podsumowania spotkań i wiele więcej.</p>
      </div>
      
      <div className="ai-metrics">
        <div className="metric-card">
          <div className="metric-value">{aiMetrics.documentsCreated}</div>
          <div className="metric-label">Utworzonych dokumentów</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{aiMetrics.timeSaved}h</div>
          <div className="metric-label">Zaoszczędzonego czasu</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{aiMetrics.tasksAutomated}</div>
          <div className="metric-label">Zautomatyzowanych zadań</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{aiMetrics.accuracy}%</div>
          <div className="metric-label">Dokładność AI</div>
        </div>
      </div>
      
      <div className="ai-assistant-container">
        {/* Left side - features and active feature detail */}
        <div className="assistant-features">
          <h2>Funkcje Asystenta AI</h2>
          
          <div className="features-grid">
            {features.map(feature => (
              <div 
                key={feature.id} 
                className={`feature-card ${activeFeature === feature.id ? 'active' : ''}`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-examples">
                  {feature.examples.map((example, index) => (
                    <span 
                      key={index} 
                      className="feature-example"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExampleClick(feature.id, example);
                      }}
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Active feature detail */}
          {activeFeature && (
            <div className="feature-detail">
              <h3>{features.find(f => f.id === activeFeature)?.detailTitle}</h3>
              <p>{features.find(f => f.id === activeFeature)?.detailDescription}</p>
              
              {activeFeature === 'document-generation' && (
                <>
                  <div className="detail-options">
                    {documentTypes.map(type => (
                      <div 
                        key={type.id}
                        className={`detail-option ${documentType === type.id ? 'active' : ''}`}
                        onClick={() => setDocumentType(type.id)}
                      >
                        <div className="detail-option-title">{type.title}</div>
                        <div className="detail-option-description">{type.description}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="detail-form">
                    <div className="form-group">
                      <label className="form-label">Tytuł dokumentu</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Np. Oferta współpracy z firmą XYZ"
                        value={documentDetails.title}
                        onChange={(e) => setDocumentDetails({...documentDetails, title: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Odbiorca</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Np. Jan Kowalski, Firma ABC"
                        value={documentDetails.recipient}
                        onChange={(e) => setDocumentDetails({...documentDetails, recipient: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Cel dokumentu</label>
                      <textarea 
                        className="form-textarea" 
                        placeholder="Opisz cel dokumentu..."
                        value={documentDetails.purpose}
                        onChange={(e) => setDocumentDetails({...documentDetails, purpose: e.target.value})}
                      ></textarea>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Kluczowe punkty</label>
                      <textarea 
                        className="form-textarea" 
                        placeholder="Wymień najważniejsze elementy, które powinny się znaleźć w dokumencie..."
                        value={documentDetails.keyPoints}
                        onChange={(e) => setDocumentDetails({...documentDetails, keyPoints: e.target.value})}
                      ></textarea>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Ton dokumentu</label>
                      <select 
                        className="form-select"
                        value={documentDetails.tone}
                        onChange={(e) => setDocumentDetails({...documentDetails, tone: e.target.value})}
                      >
                        <option value="formal">Formalny</option>
                        <option value="professional">Profesjonalny</option>
                        <option value="casual">Swobodny</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
              
              {activeFeature === 'text-analysis' && (
                <>
                  <div className="detail-options">
                    {analysisTypes.map(type => (
                      <div 
                        key={type.id}
                        className={`detail-option ${analysisType === type.id ? 'active' : ''}`}
                        onClick={() => setAnalysisType(type.id)}
                      >
                        <div className="detail-option-title">{type.title}</div>
                        <div className="detail-option-description">{type.description}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="detail-form">
                    <div className="form-group">
                      <label className="form-label">Tekst do analizy</label>
                      <textarea 
                        className="form-textarea" 
                        placeholder="Wklej tutaj tekst, który chcesz przeanalizować..."
                        value={textToAnalyze}
                        onChange={(e) => setTextToAnalyze(e.target.value)}
                        rows={8}
                      ></textarea>
                    </div>
                  </div>
                </>
              )}
              
              {activeFeature === 'meeting-summaries' && (
                <div className="detail-form">
                  <div className="form-group">
                    <label className="form-label">Tytuł spotkania</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Np. Cotygodniowe spotkanie zespołu marketingu"
                      value={meetingDetails.title}
                      onChange={(e) => setMeetingDetails({...meetingDetails, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Data spotkania</label>
                    <input 
                      type="date" 
                      className="form-input"
                      value={meetingDetails.date}
                      onChange={(e) => setMeetingDetails({...meetingDetails, date: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Uczestnicy</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Np. Jan Kowalski, Anna Nowak, Piotr Wiśniewski"
                      value={meetingDetails.participants}
                      onChange={(e) => setMeetingDetails({...meetingDetails, participants: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Agenda</label>
                    <textarea 
                      className="form-textarea" 
                      placeholder="Główne punkty agendy spotkania..."
                      value={meetingDetails.agenda}
                      onChange={(e) => setMeetingDetails({...meetingDetails, agenda: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Notatki ze spotkania</label>
                    <textarea 
                      className="form-textarea" 
                      placeholder="Kluczowe punkty omówione podczas spotkania..."
                      value={meetingDetails.notes}
                      onChange={(e) => setMeetingDetails({...meetingDetails, notes: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Działania do wykonania</label>
                    <textarea 
                      className="form-textarea" 
                      placeholder="Lista zadań i osób odpowiedzialnych..."
                      value={meetingDetails.actionItems}
                      onChange={(e) => setMeetingDetails({...meetingDetails, actionItems: e.target.value})}
                    ></textarea>
                  </div>
                </div>
              )}
              
              {activeFeature === 'email-drafting' && (
                <div className="detail-form">
                  <div className="form-group">
                    <label className="form-label">Temat emaila</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Np. Propozycja współpracy / Podziękowanie za spotkanie"
                      value={emailDetails.subject}
                      onChange={(e) => setEmailDetails({...emailDetails, subject: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Odbiorca</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Np. Jan Kowalski, Dyrektor marketingu"
                      value={emailDetails.recipient}
                      onChange={(e) => setEmailDetails({...emailDetails, recipient: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Cel emaila</label>
                    <textarea 
                      className="form-textarea" 
                      placeholder="Główny cel emaila, np. podziękowanie, zapytanie, propozycja..."
                      value={emailDetails.purpose}
                      onChange={(e) => setEmailDetails({...emailDetails, purpose: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Główne punkty</label>
                    <textarea 
                      className="form-textarea" 
                      placeholder="Kluczowe informacje, które chcesz przekazać..."
                      value={emailDetails.mainPoints}
                      onChange={(e) => setEmailDetails({...emailDetails, mainPoints: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Ton wiadomości</label>
                    <select 
                      className="form-select"
                      value={emailDetails.tone}
                      onChange={(e) => setEmailDetails({...emailDetails, tone: e.target.value})}
                    >
                      <option value="formal">Formalny</option>
                      <option value="professional">Profesjonalny</option>
                      <option value="casual">Swobodny</option>
                    </select>
                  </div>
                </div>
              )}
              
              {activeFeature === 'task-prioritization' && (
                <div className="detail-form">
                  <div className="form-group">
                    <label className="form-label">Lista zadań</label>
                    <textarea 
                      className="form-textarea" 
                      placeholder="Wprowadź listę zadań, każde w nowej linii..."
                      value={tasks}
                      onChange={(e) => setTasks(e.target.value)}
                      rows={8}
                    ></textarea>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Kryterium priorytetyzacji</label>
                    <select 
                      className="form-select"
                      value={prioritizationCriteria}
                      onChange={(e) => setPrioritizationCriteria(e.target.value)}
                    >
                      <option value="deadline">Terminy</option>
                      <option value="priority">Ważność</option>
                      <option value="effort">Nakład pracy</option>
                      <option value="balanced">Zbalansowane</option>
                    </select>
                  </div>
                </div>
              )}
              
              {activeFeature === 'qa-assistant' && (
                <div className="detail-form">
                  <p>Asystent pytań i odpowiedzi działa poprzez chat. Zadaj pytanie w polu dialogowym, a AI udzieli odpowiedzi.</p>
                </div>
              )}
              
              {/* Generate button */}
              {activeFeature && activeFeature !== 'qa-assistant' && (
                <div className="action-buttons">
                  <button 
                    className="btn btn-outline"
                    onClick={() => setActiveFeature(null)}
                  >
                    Anuluj
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={handleGenerateContent}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeDasharray="32" strokeDashoffset="12" />
                        </svg>
                        Generowanie...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Generuj
                      </>
                    )}
                  </button>
                </div>
              )}
              
              {/* Generated content result */}
              {generatedContent && !isGenerating && (
                <div className="result-container">
                  <div className="result-header">
                    <div className="result-title">
                      <CheckCircle size={20} className="text-green-500" />
                      Wygenerowano {features.find(f => f.id === activeFeature)?.title.toLowerCase()}
                    </div>
                    <div className="result-actions">
                      <button className="btn btn-icon btn-outline" title="Kopiuj">
                        <Copy size={16} />
                      </button>
                      <button className="btn btn-icon btn-outline" title="Pobierz">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="result-content">
                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                      {generatedContent}
                    </pre>
                  </div>
                  <div className="success-animation">
                    <CheckCircle size={32} />
                  </div>
                </div>
              )}
              
              {/* Loading state */}
              {isGenerating && (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Generowanie {features.find(f => f.id === activeFeature)?.title.toLowerCase()}...</p>
                  <p className="text-sm text-gray-500 mt-2">To zajmie tylko chwilę</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Right side - AI chat */}
        <div className="assistant-chat">
          <div className="chat-header">
            <div className="chat-header-title">
              <BrainCircuit size={20} />
              <span>Asystent AI</span>
            </div>
            <div className="chat-status">
              <span className="status-indicator"></span>
              <span>Online</span>
            </div>
          </div>
          
          <div className="chat-messages">
            {messages.map(message => (
              <div key={message.id} className={`message ${message.sender === 'user' ? 'user' : ''}`}>
                <div className={`message-avatar ${message.sender === 'user' ? 'avatar-user' : 'avatar-ai'}`}>
                  {message.sender === 'user' ? 'JK' : 'AI'}
                </div>
                <div className="message-content">
                  {message.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message">
                <div className="message-avatar avatar-ai">
                  AI
                </div>
                <div className="message-content">
                  <div className="message-typing">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input">
            <input 
              type="text" 
              placeholder="Napisz wiadomość do Asystenta AI..." 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <button 
              className="send-button" 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;