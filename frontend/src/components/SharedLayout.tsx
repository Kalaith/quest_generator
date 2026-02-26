import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuestStore } from "../stores/questStore";

interface SharedLayoutProps {
  children: React.ReactNode;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { questHistory, clearAll } = useQuestStore();

  const handleClearAll = () => {
    if (
      window.confirm(
        "Are you sure you want to clear ALL data including saved quests, history, and favorites? This cannot be undone.",
      )
    ) {
      clearAll();
    }
  };

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/library") return "library";
    if (path === "/history") return "history";
    return "generator";
  };

  const activeTab = getActiveTab();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Fantasy Quest Generator
              </h1>
              <p className="text-gray-600 mt-1">
                Create epic adventures for your D&D campaigns
              </p>
            </div>
            <div className="flex space-x-2">
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
            <Link
              to="/"
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "generator"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Quest Generator
            </Link>
            <Link
              to="/library"
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "library"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Quest Library
            </Link>
            <Link
              to="/history"
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "history"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Quest History
              {questHistory.length > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {questHistory.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              Fantasy Quest Generator - Create endless adventures for your
              tabletop RPG campaigns
            </p>
            <p className="text-sm">
              Perfect for D&D 5e, Pathfinder, and other fantasy RPG systems
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SharedLayout;
