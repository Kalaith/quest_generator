import type { QuestType, Difficulty, QuestLength, RewardType } from '../types';

export const QUEST_TYPES: { basic: QuestType[]; advanced: QuestType[] } = {
  basic: [
    'Kill Quest',
    'Collection Quest', 
    'Delivery Quest',
    'Escort Quest',
    'Exploration Quest'
  ],
  advanced: [
    'Mystery/Investigation',
    'Survival Challenge',
    'Crafting Mission',
    'Diplomacy Quest',
    'Multi-stage Chain',
    'Rescue Mission',
    'Siege Defense',
    'Infiltration/Stealth'
  ]
};

export const CREATURES = [
  'Ancient Red Dragon', 'Frost Wyrm', 'Shadow Dragon', 'Zombie Horde', 'Skeleton Warriors',
  'Vampire Lord', 'Lich Master', 'Goblin Raiders', 'Orc Warband', 'Bandit Leader',
  'Cultist Assassins', 'Dire Wolves', 'Giant Spiders', 'Owlbear', 'Mountain Trolls',
  'Fire Elementals', 'Shadow Demons', 'Fallen Angels', 'Frost Giants', 'Stone Golems',
  'Wyverns', 'Basilisk', 'Manticore', 'Chimera', 'Hydra', 'Minotaur', 'Cyclops',
  'Dark Elves', 'Drow Assassins', 'Mind Flayers', 'Beholders', 'Displacer Beasts'
];

export const LOCATIONS = [
  'Ancient Tomb of Kings', 'Forgotten Crypt', 'Crystal Caverns', 'Village of Millbrook',
  'Port City of Saltmere', 'Capital of Valorhall', 'Darkwood Forest', 'Crimson Desert',
  'Frostpeak Mountains', 'Wizard\'s Tower', 'Fairy Ring Grove', 'Lost Temple of Light',
  'Abandoned Castle Ravenshollow', 'Elven Sanctuary', 'Dwarven Mines', 'Haunted Battlefield',
  'Floating Sky Citadel', 'Underground Labyrinth', 'Cursed Swamplands', 'Dragon\'s Lair',
  'Mystical Library', 'Sunken Pirate Ship', 'Volcanic Forge', 'Ice Palace of the North'
];

export const ITEMS = [
  'Enchanted Blade of Heroes', 'Dwarven Warhammer', 'Elven Longbow', 'Crown of Ancient Kings',
  'Orb of Elemental Power', 'Tome of Forbidden Knowledge', 'Dragon Scales', 'Mithril Ore',
  'Rare Moonflower Herbs', 'Magical Crystals', 'Ancient Gold Coins', 'Precious Ruby Gems',
  'Lost Family Heirloom', 'Healing Potions', 'Scroll of Fireball', 'Blessed Holy Water',
  'Staff of Lightning', 'Cloak of Invisibility', 'Ring of Protection', 'Amulet of Wisdom',
  'Phoenix Feathers', 'Unicorn Horn', 'Star Metal Ingots', 'Sacred Relics'
];

export const NPCS = [
  'King Aldric the Just', 'Princess Elara', 'Duke Ravencrest', 'Trader Magnus',
  'Blacksmith Thorin Ironforge', 'Alchemist Sage Vera', 'High Priest Benedictus',
  'Oracle of Light', 'Archmage Verin', 'Lorekeeper Nolan', 'Farmer Willem',
  'Innkeeper Martha', 'Guard Captain Boris', 'Merchant Caravan Leader',
  'Elder Council Member', 'Royal Ambassador', 'Master Thief Shadowbane', 'War General Stonefist',
  'Mysterious Stranger', 'Village Elder', 'Court Wizard', 'Royal Messenger'
];

export const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard', 'Epic'];

export const QUEST_LENGTHS: QuestLength[] = ['Short', 'Medium', 'Long', 'Campaign'];

export const REWARDS: RewardType[] = [
  'Gold Coins', 'Magical Items', 'Experience', 'Reputation', 'Land Grants', 'Noble Titles'
];

export const COMPLICATIONS = [
  'A rival adventuring party is also seeking the same objective',
  'The weather turns dangerous, creating additional hazards',
  'Key information provided was incorrect or misleading',
  'An important ally is captured or turns against you',
  'The quest location is under siege or heavily guarded',
  'A powerful curse affects the quest area',
  'Time is running out due to an unexpected deadline',
  'Local authorities forbid or complicate the quest',
  'A traitor within your group sabotages the mission',
  'The quest objective has been moved or is heavily protected'
];

export const TITLE_PREFIXES = {
  'Kill Quest': ['Eliminate', 'Destroy', 'Hunt', 'Slay', 'Vanquish'],
  'Collection Quest': ['Gather', 'Collect', 'Retrieve', 'Obtain', 'Acquire'],
  'Delivery Quest': ['Deliver', 'Transport', 'Escort', 'Carry', 'Bring'],
  'Escort Quest': ['Protect', 'Guide', 'Escort', 'Safeguard', 'Accompany'],
  'Exploration Quest': ['Discover', 'Explore', 'Investigate', 'Survey', 'Scout'],
  'Mystery/Investigation': ['Uncover', 'Solve', 'Investigate', 'Reveal', 'Expose'],
  'Survival Challenge': ['Survive', 'Endure', 'Outlast', 'Withstand', 'Overcome'],
  'Crafting Mission': ['Forge', 'Create', 'Craft', 'Build', 'Construct'],
  'Diplomacy Quest': ['Negotiate', 'Mediate', 'Resolve', 'Unite', 'Reconcile'],
  'Multi-stage Chain': ['The', 'Epic', 'Grand', 'Ultimate', 'Legendary'],
  'Rescue Mission': ['Rescue', 'Save', 'Liberate', 'Free', 'Recover'],
  'Siege Defense': ['Defend', 'Protect', 'Hold', 'Guard', 'Fortify'],
  'Infiltration/Stealth': ['Infiltrate', 'Sneak', 'Penetrate', 'Breach', 'Slip Into']
};

export const TITLE_SUFFIXES = [
  'of Legend', 'of Power', 'of Destiny', 'of Honor', 'of Shadows', 
  'of Light', 'of the Ancient', 'of the Forgotten', 'of the Lost',
  'of Mystery', 'of Valor', 'of the Cursed', 'of the Sacred'
];

export const QUEST_DESCRIPTIONS = {
  'Kill Quest': [
    'A dangerous {creature} has been terrorizing the local area. The threat must be eliminated before more innocent lives are lost.',
    'Reports of {creature} attacks have reached the authorities. Heroes are needed to end this menace.',
    'The {creature} has claimed many victims. Someone must step forward to stop this evil.'
  ],
  'Collection Quest': [
    'Ancient artifacts have been scattered across dangerous territories. These precious items must be recovered before they fall into the wrong hands.',
    'Rare materials are needed for an important ritual. Brave souls must venture forth to gather them.',
    'Lost treasures lie hidden in perilous places. Only the bravest adventurers dare retrieve them.'
  ],
  'Delivery Quest': [
    'Important cargo needs to be transported safely across dangerous lands. Time is of the essence, and the cargo must arrive intact.',
    'A crucial message must reach its destination despite the perils of the journey.',
    'Precious goods require safe passage through hostile territory.'
  ],
  'Escort Quest': [
    'A valuable person needs safe passage through hostile territory. Your protection skills will be put to the test.',
    'An important figure must travel safely to their destination. Guardians are required.',
    'Someone of great importance needs protection on a dangerous journey.'
  ],
  'Exploration Quest': [
    'Uncharted territories hold secrets waiting to be uncovered. Brave the unknown and map out these mysterious lands.',
    'Ancient ruins have been discovered. Explorers are needed to investigate their secrets.',
    'New lands await discovery. Adventurers must chart these unknown regions.'
  ],
  'Mystery/Investigation': [
    'Strange occurrences have been reported, and someone needs to get to the bottom of it. Follow the clues and uncover the truth.',
    'A puzzling mystery requires skilled investigators. The truth must be revealed.',
    'Unusual events have the locals concerned. Detectives are needed to solve the case.'
  ],
  'Survival Challenge': [
    'The harsh wilderness tests even the most experienced adventurers. Survive against all odds in this unforgiving environment.',
    'Dangerous lands challenge all who enter. Only the strongest will endure.',
    'A test of endurance awaits in the most hostile environments.'
  ],
  'Crafting Mission': [
    'Master craftsmen are needed to create something of great importance. Gather materials and demonstrate your skills.',
    'An important item must be forged with the finest materials and greatest skill.',
    'Ancient crafting techniques must be employed to create a legendary artifact.'
  ],
  'Diplomacy Quest': [
    'Tensions between factions threaten to erupt into war. Skilled negotiators must find a peaceful solution.',
    'Diplomatic relations have broken down. Peace-makers are needed to restore harmony.',
    'Conflicts between groups require careful mediation to prevent bloodshed.'
  ],
  'Multi-stage Chain': [
    'A great destiny unfolds across multiple challenges. Each step brings you closer to an epic conclusion.',
    'This is but the beginning of a grand adventure that will span many trials.',
    'A complex series of tasks must be completed to achieve the ultimate goal.'
  ],
  'Rescue Mission': [
    'Someone important has been captured and needs to be rescued before it\'s too late.',
    'Prisoners are being held in a dangerous location. Heroes must free them.',
    'A rescue operation is needed to save those who cannot save themselves.'
  ],
  'Siege Defense': [
    'Enemy forces are approaching, and defenses must be prepared. The siege will test everyone\'s courage.',
    'A location of great importance is under threat. Defenders must hold the line.',
    'Hostile armies gather at the gates. The defense of this place falls to you.'
  ],
  'Infiltration/Stealth': [
    'Success depends on moving unseen and unheard. Stealth and cunning are your greatest weapons.',
    'A covert operation requires agents who can move through shadows without detection.',
    'The mission demands absolute secrecy. Discovery means failure - or worse.'
  ]
};