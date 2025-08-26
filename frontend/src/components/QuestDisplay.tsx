import React from 'react';
import type { Quest } from '../types';
import { useQuestStore } from '../stores/questStore';

interface QuestDisplayProps {
  quest: Quest;
}

export const QuestDisplay: React.FC<QuestDisplayProps> = ({ quest }) => {
  const { addToFavorites, removeFromFavorites, isFavorite, saveQuest, duplicateQuest } = useQuestStore();
  
  const isQuestFavorite = isFavorite(quest.id);

  const handleFavoriteToggle = () => {
    if (isQuestFavorite) {
      removeFromFavorites(quest.id);
    } else {
      addToFavorites(quest.id);
    }
  };

  const handleSave = () => {
    saveQuest(quest);
  };

  const handleDuplicate = () => {
    duplicateQuest(quest);
  };

  const handleCopyToClipboard = async () => {
    const questText = `
**${quest.title}**

**Type:** ${quest.type}
**Difficulty:** ${quest.difficulty}
**Length:** ${quest.length}
**Duration:** ${quest.estimatedDuration}

**Description:**
${quest.description}

**Primary Objective:**
${quest.primaryObjective}

${quest.secondaryObjectives ? `**Secondary Objectives:**
${quest.secondaryObjectives.map(obj => `• ${obj}`).join('\n')}` : ''}

${quest.rewards && quest.rewards.length > 0 ? `**Rewards:**
${quest.rewards.map(reward => `• ${reward}`).join('\n')}` : ''}

${quest.complications && quest.complications.length > 0 ? `**Complications:**
${quest.complications.map(comp => `• ${comp}`).join('\n')}` : ''}
    `.trim();

    try {
      await navigator.clipboard.writeText(questText);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy quest:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{quest.title}</h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {quest.type}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              quest.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              quest.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              quest.difficulty === 'Hard' ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'
            }`}>
              {quest.difficulty}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              {quest.length}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
              {quest.estimatedDuration}
            </span>
            {quest.isAdvanced && (
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                Advanced
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleFavoriteToggle}
            className={`p-2 rounded-lg transition-colors ${
              isQuestFavorite
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={isQuestFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            onClick={handleSave}
            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
            title="Save quest"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
          </button>

          <button
            onClick={handleDuplicate}
            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
            title="Duplicate quest"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>

          <button
            onClick={handleCopyToClipboard}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            title="Copy to clipboard"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
        <p className="text-gray-700 leading-relaxed">{quest.description}</p>
      </div>

      {/* Objectives */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Objectives</h3>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-3">
          <h4 className="font-medium text-blue-800 mb-1">Primary Objective</h4>
          <p className="text-blue-700">{quest.primaryObjective}</p>
        </div>

        {quest.secondaryObjectives && quest.secondaryObjectives.length > 0 && (
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">Secondary Objectives</h4>
            <ul className="text-purple-700 space-y-1">
              {quest.secondaryObjectives.map((objective, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  {objective}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Rewards */}
      {quest.rewards && quest.rewards.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Rewards</h3>
          <div className="bg-green-50 p-4 rounded-lg">
            <ul className="text-green-700 space-y-1">
              {quest.rewards.map((reward, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {reward}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Complications */}
      {quest.complications && quest.complications.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Complications</h3>
          <div className="bg-red-50 p-4 rounded-lg">
            <ul className="text-red-700 space-y-1">
              {quest.complications.map((complication, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">⚠</span>
                  {complication}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Quest Details */}
      <div className="border-t pt-4">
        <div className="text-sm text-gray-500">
          <p>Quest ID: {quest.id}</p>
          <p>Created: {quest.createdAt.toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};