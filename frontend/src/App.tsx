
import React, { useState } from 'react';
import { QuestDisplay } from './components/QuestDisplay';
import { QuestGeneratorForm } from './components/QuestGeneratorForm';
import { QuestLibrary } from './components/QuestLibrary';
import { useQuestStore } from './stores/questStore';
import './App.css';

type Tab = 'generator' | 'library' | 'history';

function App() {
  const { generatedQuests, currentQuest, questHistory, clearHistory, clearAll } = useQuestStore();
  const [activeTab, setActiveTab] = useState<Tab>('generator');

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all quest history? This cannot be undone.')) {
      clearHistory();
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear ALL data including saved quests, history, and favorites? This cannot be undone.')) {
      clearAll();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fantasy Quest Generator</h1>
              <p className="text-gray-600 mt-1">Create epic adventures for your D&D campaigns</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleClearHistory}
                className="px-4 py-2 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Clear History
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('generator')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'generator'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Quest Generator
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'library'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Quest Library
              {/* {savedQuests.length > 0 && (
                <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                  {savedQuests.length}
                </span>
              )} */}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Quest History
              {questHistory.length > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {questHistory.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'generator' && (
          <div className="space-y-8">
            <QuestGeneratorForm />
            {currentQuest && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Quest</h2>
                <QuestDisplay quest={currentQuest} />
              </div>
            )}
            {generatedQuests.length > 1 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Additional Generated Quests ({generatedQuests.length - 1})
                </h2>
                <div className="space-y-6">
                  {generatedQuests.slice(1).map((quest) => (
                    <QuestDisplay key={quest.id} quest={quest} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'library' && <QuestLibrary />}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Quest History</h2>
                <div className="text-sm text-gray-600">
                  {questHistory.length} quest{questHistory.length !== 1 ? 's' : ''} generated
                </div>
              </div>
              
              {questHistory.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-600 text-lg mb-2">No quest history yet</p>
                  <p className="text-gray-500">Generate some quests to see them appear here!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {questHistory.map((quest) => (
                    <QuestDisplay key={quest.id} quest={quest} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Fantasy Quest Generator - Create endless adventures for your tabletop RPG campaigns</p>
            <p className="text-sm">Perfect for D&D 5e, Pathfinder, and other fantasy RPG systems</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
