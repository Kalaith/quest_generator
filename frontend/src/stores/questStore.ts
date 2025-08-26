import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Quest, QuestGenerationParams, QuestTemplate, QuestType } from '../types';
import { QuestGenerator } from '../utils/questGenerator';

interface QuestState {
  generatedQuests: Quest[];
  currentQuest: Quest | null;
  savedQuests: Quest[];
  questHistory: Quest[];
  favorites: string[];
  templates: QuestTemplate[];
  generationParams: QuestGenerationParams;
  isGenerating: boolean;
}

interface QuestActions {
  // Quest Generation
  generateQuest: (params?: QuestGenerationParams) => void;
  generateMultipleQuests: (count: number, params?: QuestGenerationParams) => void;
  setGenerationParams: (params: QuestGenerationParams) => void;
  clearGeneratedQuests: () => void;

  // Quest Management
  setCurrentQuest: (quest: Quest | null) => void;
  saveQuest: (quest: Quest) => void;
  deleteQuest: (questId: string) => void;
  duplicateQuest: (quest: Quest) => void;

  // Favorites
  addToFavorites: (questId: string) => void;
  removeFromFavorites: (questId: string) => void;
  isFavorite: (questId: string) => boolean;

  // Templates
  saveAsTemplate: (quest: Quest, templateName: string, description: string) => void;
  deleteTemplate: (templateId: string) => void;
  generateFromTemplate: (template: QuestTemplate) => void;

  // History
  clearHistory: () => void;
  getQuestById: (questId: string) => Quest | undefined;

  // Export/Import
  exportQuests: (quests: Quest[]) => string;
  importQuests: (jsonData: string) => void;

  // Utility
  clearAll: () => void;
}

type QuestStore = QuestState & QuestActions;

const questGenerator = QuestGenerator.getInstance();

export const useQuestStore = create<QuestStore>()(
  persist(
    (set, get) => ({
      // State
      generatedQuests: [],
      currentQuest: null,
      savedQuests: [],
      questHistory: [],
      favorites: [],
      templates: [],
      generationParams: {
        questType: 'random',
        difficulty: 'random',
        length: 'random',
        alignment: 'Any',
        includeComplications: true,
        includeSecondaryObjectives: true,
      },
      isGenerating: false,

      // Quest Generation
      generateQuest: (params) => {
        set({ isGenerating: true });
        
        try {
          const finalParams = { ...get().generationParams, ...params };
          const quest = questGenerator.generateQuest(finalParams);
          
          set((state) => ({
            generatedQuests: [quest],
            currentQuest: quest,
            questHistory: [quest, ...state.questHistory].slice(0, 100), // Keep last 100
            isGenerating: false,
          }));
        } catch (error) {
          console.error('Failed to generate quest:', error);
          set({ isGenerating: false });
        }
      },

      generateMultipleQuests: (count, params) => {
        set({ isGenerating: true });
        
        try {
          const finalParams = { ...get().generationParams, ...params };
          const quests = questGenerator.generateMultipleQuests(count, finalParams);
          
          set((state) => ({
            generatedQuests: quests,
            currentQuest: quests[0] || null,
            questHistory: [...quests, ...state.questHistory].slice(0, 100),
            isGenerating: false,
          }));
        } catch (error) {
          console.error('Failed to generate quests:', error);
          set({ isGenerating: false });
        }
      },

      setGenerationParams: (params) =>
        set((state) => ({
          generationParams: { ...state.generationParams, ...params },
        })),

      clearGeneratedQuests: () =>
        set({
          generatedQuests: [],
          currentQuest: null,
        }),

      // Quest Management
      setCurrentQuest: (quest) => set({ currentQuest: quest }),

      saveQuest: (quest) =>
        set((state) => {
          const existingIndex = state.savedQuests.findIndex(q => q.id === quest.id);
          if (existingIndex >= 0) {
            // Update existing quest
            const updatedQuests = [...state.savedQuests];
            updatedQuests[existingIndex] = quest;
            return { savedQuests: updatedQuests };
          } else {
            // Add new quest
            return { savedQuests: [...state.savedQuests, quest] };
          }
        }),

      deleteQuest: (questId) =>
        set((state) => ({
          savedQuests: state.savedQuests.filter(q => q.id !== questId),
          favorites: state.favorites.filter(id => id !== questId),
          currentQuest: state.currentQuest?.id === questId ? null : state.currentQuest,
        })),

      duplicateQuest: (quest) => {
        const duplicatedQuest: Quest = {
          ...quest,
          id: crypto.randomUUID(),
          title: `${quest.title} (Copy)`,
          createdAt: new Date(),
        };
        
        set((state) => ({
          savedQuests: [...state.savedQuests, duplicatedQuest],
          currentQuest: duplicatedQuest,
        }));
      },

      // Favorites
      addToFavorites: (questId) =>
        set((state) => ({
          favorites: state.favorites.includes(questId) 
            ? state.favorites 
            : [...state.favorites, questId],
        })),

      removeFromFavorites: (questId) =>
        set((state) => ({
          favorites: state.favorites.filter(id => id !== questId),
        })),

      isFavorite: (questId) => get().favorites.includes(questId),

      // Templates
      saveAsTemplate: (quest, templateName, description) => {
        const template: QuestTemplate = {
          id: crypto.randomUUID(),
          name: templateName,
          description,
          type: quest.type,
          template: {
            type: quest.type,
            difficulty: quest.difficulty,
            length: quest.length,
            description: quest.description,
            primaryObjective: quest.primaryObjective,
            secondaryObjectives: quest.secondaryObjectives,
            isAdvanced: quest.isAdvanced,
          },
        };

        set((state) => ({
          templates: [...state.templates, template],
        }));
      },

      deleteTemplate: (templateId) =>
        set((state) => ({
          templates: state.templates.filter(t => t.id !== templateId),
        })),

      generateFromTemplate: (template) => {
        set({ isGenerating: true });
        
        try {
          // Generate quest with template constraints
          const quest = questGenerator.generateQuest({
            questType: template.type,
            difficulty: template.template.difficulty,
            length: template.template.length,
            includeComplications: get().generationParams.includeComplications,
            includeSecondaryObjectives: get().generationParams.includeSecondaryObjectives,
          });

          set((state) => ({
            generatedQuests: [quest],
            currentQuest: quest,
            questHistory: [quest, ...state.questHistory].slice(0, 100),
            isGenerating: false,
          }));
        } catch (error) {
          console.error('Failed to generate quest from template:', error);
          set({ isGenerating: false });
        }
      },

      // History
      clearHistory: () => set({ questHistory: [] }),

      getQuestById: (questId) => {
        const state = get();
        return state.savedQuests.find(q => q.id === questId) ||
               state.questHistory.find(q => q.id === questId) ||
               state.generatedQuests.find(q => q.id === questId);
      },

      // Export/Import
      exportQuests: (quests) => {
        const exportData = {
          quests,
          exportedAt: new Date().toISOString(),
          version: '1.0',
        };
        return JSON.stringify(exportData, null, 2);
      },

      importQuests: (jsonData) => {
        try {
          const importData = JSON.parse(jsonData);
          const importedQuests = importData.quests || [];

          set((state) => ({
            savedQuests: [
              ...state.savedQuests,
              ...importedQuests.filter((q: Quest) => 
                !state.savedQuests.some(existing => existing.id === q.id)
              ),
            ],
          }));
        } catch (error) {
          console.error('Failed to import quests:', error);
          throw new Error('Invalid quest data format');
        }
      },

      // Utility
      clearAll: () =>
        set({
          generatedQuests: [],
          currentQuest: null,
          savedQuests: [],
          questHistory: [],
          favorites: [],
          templates: [],
        }),
    }),
    {
      name: 'quest-generator-storage',
      partialize: (state) => ({
        savedQuests: state.savedQuests,
        questHistory: state.questHistory,
        favorites: state.favorites,
        templates: state.templates,
        generationParams: state.generationParams,
      }),
    }
  )
);