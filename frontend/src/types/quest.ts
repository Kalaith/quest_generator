export type QuestType = 
  // Basic Types
  | 'Kill Quest'
  | 'Collection Quest' 
  | 'Delivery Quest'
  | 'Escort Quest'
  | 'Exploration Quest'
  // Advanced Types
  | 'Mystery/Investigation'
  | 'Survival Challenge'
  | 'Crafting Mission'
  | 'Diplomacy Quest'
  | 'Multi-stage Chain'
  | 'Rescue Mission'
  | 'Siege Defense'
  | 'Infiltration/Stealth';

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Epic';
export type QuestLength = 'Short' | 'Medium' | 'Long' | 'Campaign';
export type RewardType = 'Gold Coins' | 'Magical Items' | 'Experience' | 'Reputation' | 'Land Grants' | 'Noble Titles';
export type MoralAlignment = 'Good' | 'Neutral' | 'Evil' | 'Any';

export interface BaseQuest {
  id: string;
  title: string;
  type: QuestType;
  difficulty: Difficulty;
  length: QuestLength;
  description: string;
  primaryObjective: string;
  secondaryObjectives?: string[];
  isAdvanced: boolean;
  mainElement: string;
  rewards?: string[];
  complications?: string[];
  estimatedDuration?: string;
  createdAt: Date;
}

export interface KillQuest extends BaseQuest {
  type: 'Kill Quest';
  creature: string;
  count: number;
}

export interface CollectionQuest extends BaseQuest {
  type: 'Collection Quest';
  item: string;
  count: number;
  location: string;
}

export interface DeliveryQuest extends BaseQuest {
  type: 'Delivery Quest';
  item: string;
  fromNpc: string;
  toLocation: string;
}

export interface EscortQuest extends BaseQuest {
  type: 'Escort Quest';
  npc: string;
  destination: string;
}

export interface ExplorationQuest extends BaseQuest {
  type: 'Exploration Quest';
  location: string;
}

export interface MysteryQuest extends BaseQuest {
  type: 'Mystery/Investigation';
  location: string;
  mysteryNpc: string;
}

export interface SurvivalQuest extends BaseQuest {
  type: 'Survival Challenge';
  location: string;
  duration: number;
}

export interface CraftingQuest extends BaseQuest {
  type: 'Crafting Mission';
  item: string;
  materials: string[];
  location: string;
}

export interface DiplomacyQuest extends BaseQuest {
  type: 'Diplomacy Quest';
  factions: string[];
  conflict: string;
}

export interface RescueQuest extends BaseQuest {
  type: 'Rescue Mission';
  npc: string;
  location: string;
  captors: string;
}

export interface DefenseQuest extends BaseQuest {
  type: 'Siege Defense';
  location: string;
  attackers: string;
  duration: number;
}

export interface StealthQuest extends BaseQuest {
  type: 'Infiltration/Stealth';
  location: string;
  objective: string;
  guards: string;
}

export interface ChainQuest extends BaseQuest {
  type: 'Multi-stage Chain';
  stages: {
    title: string;
    objective: string;
    location: string;
  }[];
}

export type Quest = KillQuest | CollectionQuest | DeliveryQuest | EscortQuest | 
                   ExplorationQuest | MysteryQuest | SurvivalQuest | CraftingQuest |
                   DiplomacyQuest | RescueQuest | DefenseQuest | StealthQuest | ChainQuest;

export interface QuestGenerationParams {
  questType?: QuestType | 'random';
  difficulty?: Difficulty | 'random';
  length?: QuestLength | 'random';
  alignment?: MoralAlignment;
  includeComplications?: boolean;
  includeSecondaryObjectives?: boolean;
}

export interface QuestTemplate {
  id: string;
  name: string;
  description: string;
  type: QuestType;
  template: Partial<Quest>;
}