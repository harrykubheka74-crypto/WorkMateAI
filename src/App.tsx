import { useState } from 'react';
import type { PageId } from './types';
import { ToastProvider } from './components/ToastContext';
import AppLayout from './components/AppLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import EmailGenerator from './pages/EmailGenerator';
import MeetingSummarizer from './pages/MeetingSummarizer';
import TaskPlanner from './pages/TaskPlanner';
import ResearchAssistant from './pages/ResearchAssistant';
import Chatbot from './pages/Chatbot';
import PromptLab from './pages/PromptLab';
import ResponsibleAI from './pages/ResponsibleAI';
import About from './pages/About';

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const isLanding = currentPage === 'landing';

  return (
    <ToastProvider>
      {isLanding ? (
        <Landing onNavigate={handleNavigate} />
      ) : (
        <AppLayout currentPage={currentPage} onNavigate={handleNavigate}>
          {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
          {currentPage === 'email' && <EmailGenerator />}
          {currentPage === 'meeting' && <MeetingSummarizer />}
          {currentPage === 'tasks' && <TaskPlanner />}
          {currentPage === 'research' && <ResearchAssistant />}
          {currentPage === 'chatbot' && <Chatbot />}
          {currentPage === 'prompt-lab' && <PromptLab />}
          {currentPage === 'responsible-ai' && <ResponsibleAI />}
          {currentPage === 'about' && <About onNavigate={handleNavigate} />}
        </AppLayout>
      )}
    </ToastProvider>
  );
}

export default App;
