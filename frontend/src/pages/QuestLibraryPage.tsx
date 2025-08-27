import React from 'react';
import { QuestLibrary } from '../components/QuestLibrary';

const QuestLibraryPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quest Library</h2>
        <p className="text-gray-600">
          Browse and manage your saved quests, favorites, and custom quest templates.
        </p>
      </div>
      
      <QuestLibrary />
    </div>
  );
};

export default QuestLibraryPage;