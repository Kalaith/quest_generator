import React from "react";
import { QuestDisplay } from "../components/QuestDisplay";
import { QuestGeneratorForm } from "../components/QuestGeneratorForm";
import { useQuestStore } from "../stores/questStore";

const QuestGeneratorPage: React.FC = () => {
  const { generatedQuests, currentQuest } = useQuestStore();

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Quest Generator
        </h2>
        <p className="text-gray-600 mb-6">
          Generate unique fantasy quests for your D&D campaigns and tabletop RPG
          adventures.
        </p>
        <QuestGeneratorForm />
      </div>

      {currentQuest && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Generated Quest
          </h2>
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
  );
};

export default QuestGeneratorPage;
