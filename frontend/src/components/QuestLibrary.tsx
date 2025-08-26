import React, { useState, useMemo } from 'react';
import type { Quest, QuestType, Difficulty } from '../types';
import { useQuestStore } from '../stores/questStore';

export const QuestLibrary: React.FC = () => {
  const {
    savedQuests,
    favorites,
    setCurrentQuest,
    deleteQuest,
    duplicateQuest,
    exportQuests,
    importQuests,
  } = useQuestStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<QuestType | 'all'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'all'>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'difficulty'>('date');

  const filteredQuests = useMemo(() => {
    let filtered = [...savedQuests];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(quest =>
        quest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quest.primaryObjective.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(quest => quest.type === filterType);
    }

    // Filter by difficulty
    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(quest => quest.difficulty === filterDifficulty);
    }

    // Filter by favorites
    if (showFavoritesOnly) {
      filtered = filtered.filter(quest => favorites.includes(quest.id));
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'difficulty':
          const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3, Epic: 4 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'date':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [savedQuests, searchTerm, filterType, filterDifficulty, showFavoritesOnly, sortBy, favorites]);

  const handleExport = () => {
    const questsToExport = showFavoritesOnly 
      ? savedQuests.filter(q => favorites.includes(q.id))
      : savedQuests;
      
    const exportData = exportQuests(questsToExport);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `quests-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          importQuests(content);
          // Could add success toast here
        } catch (error) {
          console.error('Import failed:', error);
          // Could add error toast here
        }
      };
      reader.readAsText(file);
    }
  };

  const uniqueTypes = [...new Set(savedQuests.map(q => q.type))];
  const uniqueDifficulties = [...new Set(savedQuests.map(q => q.difficulty))];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Quest Library</h2>
          <div className="text-sm text-gray-600">
            {filteredQuests.length} of {savedQuests.length} quests
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search quests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as QuestType | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value as Difficulty | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Difficulties</option>
              {uniqueDifficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'difficulty')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="difficulty">Sort by Difficulty</option>
            </select>
          </div>
        </div>

        {/* Additional Filters and Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showFavoritesOnly}
                onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-700">Favorites Only</span>
            </label>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Export Quests
            </button>
            <label className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer text-sm">
              Import Quests
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Quest Grid */}
      {filteredQuests.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-600 text-lg mb-2">
            {savedQuests.length === 0 ? 'No saved quests yet' : 'No quests match your filters'}
          </p>
          <p className="text-gray-500">
            {savedQuests.length === 0 
              ? 'Generate some quests and save them to build your library!'
              : 'Try adjusting your search or filter criteria'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuests.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              isFavorite={favorites.includes(quest.id)}
              onView={() => setCurrentQuest(quest)}
              onDelete={() => deleteQuest(quest.id)}
              onDuplicate={() => duplicateQuest(quest)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface QuestCardProps {
  quest: Quest;
  isFavorite: boolean;
  onView: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest, isFavorite, onView, onDelete, onDuplicate }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1">{quest.title}</h3>
        {isFavorite && (
          <svg className="w-5 h-5 text-red-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        )}
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{quest.type}</span>
        <span className={`px-2 py-1 rounded text-xs ${
          quest.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
          quest.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          quest.difficulty === 'Hard' ? 'bg-orange-100 text-orange-800' :
          'bg-red-100 text-red-800'
        }`}>
          {quest.difficulty}
        </span>
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">{quest.length}</span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{quest.description}</p>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {quest.createdAt.toLocaleDateString()}
        </span>
        <div className="flex space-x-1">
          <button
            onClick={onView}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
          >
            View
          </button>
          <button
            onClick={onDuplicate}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-xs"
          >
            Copy
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};