import React, { useState } from "react";
import type {
  QuestGenerationParams,
  QuestType,
  Difficulty,
  QuestLength,
  MoralAlignment,
} from "../types";
import { useQuestStore } from "../stores/questStore";
import { QUEST_TYPES, DIFFICULTIES, QUEST_LENGTHS } from "../data/questData";

export const QuestGeneratorForm: React.FC = () => {
  const {
    generateQuest,
    generateMultipleQuests,
    generationParams,
    setGenerationParams,
    isGenerating,
  } = useQuestStore();

  const [localParams, setLocalParams] =
    useState<QuestGenerationParams>(generationParams);
  const [questCount, setQuestCount] = useState(1);

  const handleParamChange = <K extends keyof QuestGenerationParams>(
    key: K,
    value: QuestGenerationParams[K],
  ) => {
    const updatedParams = { ...localParams, [key]: value };
    setLocalParams(updatedParams);
    setGenerationParams(updatedParams);
  };

  const handleGenerate = () => {
    if (questCount === 1) {
      generateQuest(localParams);
    } else {
      generateMultipleQuests(questCount, localParams);
    }
  };

  const handleQuickGenerate = () => {
    generateQuest({
      questType: "random",
      difficulty: "random",
      length: "random",
      includeComplications: true,
      includeSecondaryObjectives: true,
    });
  };

  const allQuestTypes: (QuestType | "random")[] = [
    "random",
    ...QUEST_TYPES.basic,
    ...QUEST_TYPES.advanced,
  ];
  const allDifficulties: (Difficulty | "random")[] = [
    "random",
    ...DIFFICULTIES,
  ];
  const allLengths: (QuestLength | "random")[] = ["random", ...QUEST_LENGTHS];
  const alignmentOptions: MoralAlignment[] = ["Any", "Good", "Neutral", "Evil"];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Generate New Quest
      </h2>

      {/* Quick Generate Button */}
      <div className="mb-6 text-center">
        <button
          onClick={handleQuickGenerate}
          disabled={isGenerating}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? "Generating..." : "Quick Generate Random Quest"}
        </button>
        <p className="text-sm text-gray-600 mt-2">
          Or customize your quest below
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quest Type */}
        <div>
          <label
            htmlFor="questType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Quest Type
          </label>
          <select
            id="questType"
            value={localParams.questType || "random"}
            onChange={(e) =>
              handleParamChange(
                "questType",
                e.target.value as QuestType | "random",
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {allQuestTypes.map((type) => (
              <option key={type} value={type}>
                {type === "random" ? "Random" : type}
                {type !== "random" &&
                QUEST_TYPES.advanced.includes(type as QuestType)
                  ? " (Advanced)"
                  : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label
            htmlFor="difficulty"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Difficulty
          </label>
          <select
            id="difficulty"
            value={localParams.difficulty || "random"}
            onChange={(e) =>
              handleParamChange(
                "difficulty",
                e.target.value as Difficulty | "random",
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {allDifficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty === "random" ? "Random" : difficulty}
              </option>
            ))}
          </select>
        </div>

        {/* Length */}
        <div>
          <label
            htmlFor="length"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Quest Length
          </label>
          <select
            id="length"
            value={localParams.length || "random"}
            onChange={(e) =>
              handleParamChange(
                "length",
                e.target.value as QuestLength | "random",
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {allLengths.map((length) => (
              <option key={length} value={length}>
                {length === "random" ? "Random" : length}
                {length === "Short" && " (1-2 hours)"}
                {length === "Medium" && " (3-4 hours)"}
                {length === "Long" && " (5-8 hours)"}
                {length === "Campaign" && " (10+ hours)"}
              </option>
            ))}
          </select>
        </div>

        {/* Moral Alignment */}
        <div>
          <label
            htmlFor="alignment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Moral Alignment
          </label>
          <select
            id="alignment"
            value={localParams.alignment || "Any"}
            onChange={(e) =>
              handleParamChange("alignment", e.target.value as MoralAlignment)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {alignmentOptions.map((alignment) => (
              <option key={alignment} value={alignment}>
                {alignment}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quest Count */}
      <div className="mt-6">
        <label
          htmlFor="questCount"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Number of Quests to Generate
        </label>
        <input
          id="questCount"
          type="number"
          min="1"
          max="10"
          value={questCount}
          onChange={(e) =>
            setQuestCount(
              Math.max(1, Math.min(10, parseInt(e.target.value) || 1)),
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-sm text-gray-600 mt-1">
          Generate up to 10 quests at once
        </p>
      </div>

      {/* Options */}
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Additional Options
        </h3>

        <div className="flex items-center space-x-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localParams.includeComplications || false}
              onChange={(e) =>
                handleParamChange("includeComplications", e.target.checked)
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-2 text-sm text-gray-700">
              Include Complications
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localParams.includeSecondaryObjectives || false}
              onChange={(e) =>
                handleParamChange(
                  "includeSecondaryObjectives",
                  e.target.checked,
                )
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-2 text-sm text-gray-700">
              Include Secondary Objectives
            </span>
          </label>
        </div>
      </div>

      {/* Generate Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating
            ? "Generating..."
            : questCount === 1
              ? "Generate Quest"
              : `Generate ${questCount} Quests`}
        </button>
      </div>

      {/* Help Text */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">
          Quest Generation Tips
        </h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>
            • <strong>Basic Quests:</strong> Simple objectives like kill,
            collect, deliver, escort, or explore
          </li>
          <li>
            • <strong>Advanced Quests:</strong> Complex scenarios like
            mysteries, diplomacy, or multi-stage chains
          </li>
          <li>
            • <strong>Complications:</strong> Add unexpected challenges to make
            quests more interesting
          </li>
          <li>
            • <strong>Secondary Objectives:</strong> Additional goals that
            enhance the quest experience
          </li>
        </ul>
      </div>
    </div>
  );
};
