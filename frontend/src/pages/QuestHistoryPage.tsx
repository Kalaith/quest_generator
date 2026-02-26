import React from "react";
import { QuestDisplay } from "../components/QuestDisplay";
import { useQuestStore } from "../stores/questStore";

const QuestHistoryPage: React.FC = () => {
  const { questHistory, clearHistory } = useQuestStore();

  const handleClearHistory = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all quest history? This cannot be undone.",
      )
    ) {
      clearHistory();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Quest History</h2>
            <p className="text-gray-600 mt-1">
              View all previously generated quests and re-use them in your
              campaigns.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {questHistory.length} quest{questHistory.length !== 1 ? "s" : ""}{" "}
              generated
            </div>
            {questHistory.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear History
              </button>
            )}
          </div>
        </div>

        {questHistory.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 text-lg mb-2">No quest history yet</p>
            <p className="text-gray-500">
              Generate some quests to see them appear here!
            </p>
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
  );
};

export default QuestHistoryPage;
