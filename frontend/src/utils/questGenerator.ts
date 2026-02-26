import type {
  Quest,
  QuestType,
  Difficulty,
  QuestLength,
  QuestGenerationParams,
} from "../types";
import {
  QUEST_TYPES,
  CREATURES,
  LOCATIONS,
  ITEMS,
  NPCS,
  DIFFICULTIES,
  QUEST_LENGTHS,
  REWARDS,
  COMPLICATIONS,
  TITLE_PREFIXES,
  TITLE_SUFFIXES,
  QUEST_DESCRIPTIONS,
} from "../data/questData";

export class QuestGenerator {
  private static instance: QuestGenerator;

  static getInstance(): QuestGenerator {
    if (!QuestGenerator.instance) {
      QuestGenerator.instance = new QuestGenerator();
    }
    return QuestGenerator.instance;
  }

  private randomChoice<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private getCountByDifficulty(
    difficulty: Difficulty,
    easy: number,
    medium: number,
    hard: number,
    epic: number,
  ): number {
    switch (difficulty) {
      case "Easy":
        return easy;
      case "Medium":
        return medium;
      case "Hard":
        return hard;
      case "Epic":
        return epic;
      default:
        return medium;
    }
  }

  private getDurationEstimate(length: QuestLength): string {
    switch (length) {
      case "Short":
        return "1-2 hours";
      case "Medium":
        return "3-4 hours";
      case "Long":
        return "5-8 hours";
      case "Campaign":
        return "10+ hours";
      default:
        return "3-4 hours";
    }
  }

  private generateQuestTitle(type: QuestType, mainElement: string): string {
    const prefixes = TITLE_PREFIXES[type] || ["The"];
    const prefix = this.randomChoice(prefixes);
    const suffix =
      Math.random() > 0.5 ? " " + this.randomChoice(TITLE_SUFFIXES) : "";

    return `${prefix} the ${mainElement}${suffix}`;
  }

  private generateDescription(
    type: QuestType,
    context: Record<string, string>,
  ): string {
    const templates = QUEST_DESCRIPTIONS[type] || [
      "A quest awaits those brave enough to accept it.",
    ];
    let description = this.randomChoice(templates);

    // Replace placeholders with context
    Object.keys(context).forEach((key) => {
      description = description.replace(
        new RegExp(`{${key}}`, "g"),
        context[key],
      );
    });

    return description;
  }

  private generateRewards(difficulty: Difficulty): string[] {
    const numRewards = this.getCountByDifficulty(difficulty, 1, 2, 2, 3);
    const rewards = [];

    for (let i = 0; i < numRewards; i++) {
      rewards.push(this.randomChoice(REWARDS));
    }

    return [...new Set(rewards)]; // Remove duplicates
  }

  private generateComplications(
    includeComplications: boolean,
    difficulty: Difficulty,
  ): string[] {
    if (!includeComplications) return [];

    const numComplications =
      difficulty === "Epic"
        ? 2
        : difficulty === "Hard"
          ? 1
          : Math.random() > 0.5
            ? 1
            : 0;
    const complications: string[] = [];

    for (let i = 0; i < numComplications; i++) {
      const complication = this.randomChoice(COMPLICATIONS);
      if (!complications.includes(complication)) {
        complications.push(complication);
      }
    }

    return complications;
  }

  private generateBasicQuest(
    type: QuestType,
    difficulty: Difficulty,
    length: QuestLength,
    params: QuestGenerationParams,
  ): Quest {
    const id = crypto.randomUUID();
    const createdAt = new Date();
    const estimatedDuration = this.getDurationEstimate(length);
    const rewards = this.generateRewards(difficulty);
    const complications = this.generateComplications(
      params.includeComplications || false,
      difficulty,
    );

    switch (type) {
      case "Kill Quest": {
        const creature = this.randomChoice(CREATURES);
        const count = this.getCountByDifficulty(difficulty, 1, 3, 5, 8);
        const title = this.generateQuestTitle(type, creature);
        const description = this.generateDescription(type, {
          creature: creature.toLowerCase(),
        });

        return {
          id,
          title,
          type,
          difficulty,
          length,
          description,
          primaryObjective: `Eliminate ${count} ${creature.toLowerCase()}${count > 1 ? "s" : ""}`,
          secondaryObjectives: params.includeSecondaryObjectives
            ? [
                "Document evidence of the kills",
                "Report back to the quest giver",
                "Collect any bounty rewards",
              ]
            : undefined,
          isAdvanced: false,
          mainElement: creature,
          creature,
          count,
          rewards,
          complications,
          estimatedDuration,
          createdAt,
        } as Quest;
      }

      case "Collection Quest": {
        const item = this.randomChoice(ITEMS);
        const count = this.getCountByDifficulty(difficulty, 3, 5, 8, 12);
        const location = this.randomChoice(LOCATIONS);
        const title = this.generateQuestTitle(type, item);
        const description = this.generateDescription(type, {});

        return {
          id,
          title,
          type,
          difficulty,
          length,
          description,
          primaryObjective: `Collect ${count} ${item.toLowerCase()}${count > 1 ? "s" : ""} from ${location}`,
          secondaryObjectives: params.includeSecondaryObjectives
            ? [
                "Ensure items are in good condition",
                "Avoid damaging the collection site",
                "Return with proof of authenticity",
              ]
            : undefined,
          isAdvanced: false,
          mainElement: item,
          item,
          count,
          location,
          rewards,
          complications,
          estimatedDuration,
          createdAt,
        } as Quest;
      }

      case "Delivery Quest": {
        const item = this.randomChoice(ITEMS);
        const fromNpc = this.randomChoice(NPCS);
        const toLocation = this.randomChoice(LOCATIONS);
        const title = this.generateQuestTitle(type, item);
        const description = this.generateDescription(type, {});

        return {
          id,
          title,
          type,
          difficulty,
          length,
          description,
          primaryObjective: `Deliver ${item} from ${fromNpc} to ${toLocation}`,
          secondaryObjectives: params.includeSecondaryObjectives
            ? [
                "Ensure the package remains unopened",
                "Deliver within the time limit",
                "Obtain delivery confirmation",
              ]
            : undefined,
          isAdvanced: false,
          mainElement: item,
          item,
          fromNpc,
          toLocation,
          rewards,
          complications,
          estimatedDuration,
          createdAt,
        } as Quest;
      }

      case "Escort Quest": {
        const npc = this.randomChoice(NPCS);
        const destination = this.randomChoice(LOCATIONS);
        const title = this.generateQuestTitle(type, npc);
        const description = this.generateDescription(type, {});

        return {
          id,
          title,
          type,
          difficulty,
          length,
          description,
          primaryObjective: `Safely escort ${npc} to ${destination}`,
          secondaryObjectives: params.includeSecondaryObjectives
            ? [
                "Protect the VIP from all threats",
                "Maintain secrecy about the route",
                "Arrive by the appointed time",
              ]
            : undefined,
          isAdvanced: false,
          mainElement: npc,
          npc,
          destination,
          rewards,
          complications,
          estimatedDuration,
          createdAt,
        } as Quest;
      }

      case "Exploration Quest": {
        const location = this.randomChoice(LOCATIONS);
        const title = this.generateQuestTitle(type, location);
        const description = this.generateDescription(type, {});

        return {
          id,
          title,
          type,
          difficulty,
          length,
          description,
          primaryObjective: `Explore and map the ${location}`,
          secondaryObjectives: params.includeSecondaryObjectives
            ? [
                "Create detailed maps of the area",
                "Catalog any discoveries",
                "Report on potential dangers",
              ]
            : undefined,
          isAdvanced: false,
          mainElement: location,
          location,
          rewards,
          complications,
          estimatedDuration,
          createdAt,
        } as Quest;
      }

      default:
        throw new Error(`Unsupported quest type: ${type}`);
    }
  }

  private generateAdvancedQuest(
    type: QuestType,
    difficulty: Difficulty,
    length: QuestLength,
    params: QuestGenerationParams,
  ): Quest {
    const id = crypto.randomUUID();
    const createdAt = new Date();
    const estimatedDuration = this.getDurationEstimate(length);
    const rewards = this.generateRewards(difficulty);
    const complications = this.generateComplications(
      params.includeComplications || false,
      difficulty,
    );

    switch (type) {
      case "Mystery/Investigation": {
        const location = this.randomChoice(LOCATIONS);
        const mysteryNpc = this.randomChoice(NPCS);
        const title = `The Mystery of ${location}`;
        const description = this.generateDescription(type, {});

        return {
          id,
          title,
          type,
          difficulty,
          length,
          description,
          primaryObjective: `Investigate the mysterious events at ${location}`,
          secondaryObjectives: [
            `Interview ${mysteryNpc} for information`,
            "Gather 3 pieces of evidence",
            "Uncover the truth behind the mystery",
          ],
          isAdvanced: true,
          mainElement: location,
          location,
          mysteryNpc,
          rewards,
          complications,
          estimatedDuration,
          createdAt,
        } as Quest;
      }

      case "Survival Challenge": {
        const location = this.randomChoice(LOCATIONS);
        const duration = this.getCountByDifficulty(difficulty, 3, 7, 14, 30);
        const title = `Survival in ${location}`;
        const description = this.generateDescription(type, {});

        return {
          id,
          title,
          type,
          difficulty,
          length,
          description,
          primaryObjective: `Survive for ${duration} days in ${location}`,
          secondaryObjectives: [
            "Establish a secure shelter",
            "Find reliable sources of food and water",
            "Defend against hostile creatures",
          ],
          isAdvanced: true,
          mainElement: location,
          location,
          duration,
          rewards,
          complications,
          estimatedDuration,
          createdAt,
        } as Quest;
      }

      case "Rescue Mission": {
        const npc = this.randomChoice(NPCS);
        const location = this.randomChoice(LOCATIONS);
        const captors = this.randomChoice(CREATURES);
        const title = `Rescue ${npc}`;
        const description = this.generateDescription(type, {});

        return {
          id,
          title,
          type,
          difficulty,
          length,
          description,
          primaryObjective: `Rescue ${npc} from ${location}`,
          secondaryObjectives: [
            `Defeat or avoid the ${captors.toLowerCase()}`,
            "Ensure the captive's safety",
            "Escape without raising alarms",
          ],
          isAdvanced: true,
          mainElement: npc,
          npc,
          location,
          captors,
          rewards,
          complications,
          estimatedDuration,
          createdAt,
        } as Quest;
      }

      default: {
        // For other advanced quest types, generate a basic structure
        const location = this.randomChoice(LOCATIONS);
        const title = this.generateQuestTitle(type, location);
        const description = this.generateDescription(type, {});

        return {
          id,
          title,
          type,
          difficulty,
          length,
          description,
          primaryObjective: `Complete the ${type.toLowerCase()} at ${location}`,
          secondaryObjectives: params.includeSecondaryObjectives
            ? [
                "Gather necessary information",
                "Prepare for challenges ahead",
                "Complete all objectives successfully",
              ]
            : undefined,
          isAdvanced: true,
          mainElement: location,
          rewards,
          complications,
          estimatedDuration,
          createdAt,
        } as Quest;
      }
    }
  }

  generateQuest(params: QuestGenerationParams = {}): Quest {
    // Determine quest type
    const questType =
      params.questType === "random" || !params.questType
        ? this.randomChoice([...QUEST_TYPES.basic, ...QUEST_TYPES.advanced])
        : params.questType;

    // Determine difficulty
    const difficulty =
      params.difficulty === "random" || !params.difficulty
        ? this.randomChoice(DIFFICULTIES)
        : params.difficulty;

    // Determine length
    const length =
      params.length === "random" || !params.length
        ? this.randomChoice(QUEST_LENGTHS)
        : params.length;

    // Check if it's an advanced quest
    const isAdvanced = QUEST_TYPES.advanced.includes(questType);

    if (isAdvanced) {
      return this.generateAdvancedQuest(questType, difficulty, length, params);
    } else {
      return this.generateBasicQuest(questType, difficulty, length, params);
    }
  }

  generateMultipleQuests(
    count: number,
    params: QuestGenerationParams = {},
  ): Quest[] {
    const quests: Quest[] = [];
    for (let i = 0; i < count; i++) {
      quests.push(this.generateQuest(params));
    }
    return quests;
  }
}
