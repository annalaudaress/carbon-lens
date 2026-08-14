import { useState } from 'react';
import { Dashboard } from './pages/Dashboard';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { TerminalPage } from './pages/TerminalPage';

type Tab = 'dashboard' | 'how-it-works' | 'terminal';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const tabs: { key: Tab; label: string; shortcut: string }[] = [
    { key: 'dashboard', label: 'Dashboard', shortcut: 'F1' },
    { key: 'how-it-works', label: 'Como Funciona?', shortcut: 'F2' },
    { key: 'terminal', label: 'Terminal', shortcut: 'F3' },
  ];

  return (
    <div className="min-h-screen bg-term-bg flex flex-col scanlines">
      {/* Tab bar - k9s style */}
      <div className="bg-black border-b border-term-border flex items-center px-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              px-3 py-1 text-xs font-mono border-b-2 transition-colors
              ${
                activeTab === tab.key
                  ? 'border-term-green text-term-green bg-term-highlight'
                  : 'border-transparent text-term-dim hover:text-term-fg hover:bg-term-highlight/50'
              }
            `}
          >
            <span className="text-term-dim mr-1">[{tab.shortcut}]</span>
            {tab.label}
          </button>
        ))}
        <div className="flex-1" />
        <span className="text-term-dim text-xs px-2">
          Carbon Lens v1.0.0
        </span>
      </div>

      {/* Page content */}
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'how-it-works' && <HowItWorksPage />}
      {activeTab === 'terminal' && <TerminalPage />}
    </div>
  );
}

export default App;
