import { useCallback } from 'react';
import { useQuestStore } from '../stores/questStore';
import type { QuestGenerationParams } from '../types';

export const useQuestGeneration = () => {
  const {
    generateQuest,
    generateMultipleQuests,
    isGenerating,
    generationParams,
    setGenerationParams,
  } = useQuestStore();

  const generateRandomQuest = useCallback(() => {
    generateQuest({
      questType: 'random',
      difficulty: 'random',
      length: 'random',
      includeComplications: true,
      includeSecondaryObjectives: true,
    });
  }, [generateQuest]);

  const generateQuestWithParams = useCallback((params: QuestGenerationParams) => {
    generateQuest(params);
  }, [generateQuest]);

  const generateBatch = useCallback((count: number, params?: QuestGenerationParams) => {
    const finalParams = params || generationParams;
    generateMultipleQuests(count, finalParams);
  }, [generateMultipleQuests, generationParams]);

  const updateParams = useCallback((params: Partial<QuestGenerationParams>) => {
    setGenerationParams({ ...generationParams, ...params });
  }, [generationParams, setGenerationParams]);

  return {
    generateRandomQuest,
    generateQuestWithParams,
    generateBatch,
    updateParams,
    isGenerating,
    currentParams: generationParams,
  };
};