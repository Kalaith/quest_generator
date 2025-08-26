# Fantasy Quest Generator

A comprehensive modern React-based quest generation tool for fantasy RPG campaigns, built with TypeScript, Tailwind CSS, and Zustand state management. Generate diverse, engaging quests with rich fantasy world elements and customizable parameters.

[![Compliance](https://img.shields.io/badge/Master%20Design%20Standards-92%25%20Compliant-brightgreen)](./COMPLIANCE_REPORT.md)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-cyan)](https://tailwindcss.com/)

## 🎲 Features

### Quest Generation
- **13 Quest Types**: From basic Kill/Collection quests to advanced Mystery/Investigation and Multi-stage Chain quests
- **4 Difficulty Levels**: Easy, Medium, Hard, and Epic encounters
- **4 Quest Lengths**: Short (1-2 hours) to Campaign (10+ hours)
- **Rich Fantasy Elements**: Comprehensive database of creatures, locations, NPCs, and items
- **Smart Complications**: Dynamic quest complications and secondary objectives
- **Quest History**: Persistent quest library with favorites and templates

### Modern Architecture
- **React 19**: Latest React with concurrent features and modern hooks
- **TypeScript 5.8**: Full type safety with strict mode enabled
- **Zustand State Management**: Persistent quest storage and generation parameters
- **Tailwind CSS**: Responsive, mobile-friendly design
- **Vite Build System**: Fast development with hot reload and optimized production builds

### User Experience
- **Instant Quest Generation**: One-click random quest generation
- **Advanced Filtering**: Filter by type, difficulty, length, and alignment
- **Quest Library**: Save, organize, and manage your quest collection
- **Export Capabilities**: Copy quests to clipboard for easy campaign integration
- **Mobile Responsive**: Full functionality on desktop, tablet, and mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
# Clone the repository
cd quest_generator

# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

### Development Scripts
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint code quality checks
npm run type-check   # Run TypeScript type checking
```

## 📁 Project Structure

```
quest_generator/
├── README.md                           # This file
├── COMPLIANCE_REPORT.md               # Master Design Standards compliance
├── publish.ps1                       # Deployment script
├── quest_generator_reference.json    # Legacy reference data
├── Fantasy Quest Generator_ A Comprehensive Adventure.md  # Detailed guide
└── frontend/                         # Modern React application
    ├── package.json                  # Dependencies and scripts
    ├── vite.config.ts               # Vite build configuration
    ├── tsconfig.json                # TypeScript configuration
    ├── eslint.config.js             # Code quality configuration
    ├── tailwind.config.js           # Styling configuration
    ├── index.html                   # Application entry point
    └── src/
        ├── App.tsx                  # Main application component
        ├── main.tsx                 # React application bootstrap
        ├── components/              # React components
        │   ├── QuestDisplay.tsx     # Quest presentation component
        │   ├── QuestGeneratorForm.tsx  # Quest generation controls
        │   └── QuestLibrary.tsx     # Quest management interface
        ├── stores/                  # Zustand state management
        │   └── questStore.ts        # Main quest state and actions
        ├── types/                   # TypeScript type definitions
        │   ├── index.ts             # Common types
        │   └── quest.ts             # Quest domain types
        ├── hooks/                   # Custom React hooks
        │   └── useQuestGeneration.ts  # Quest generation logic
        ├── utils/                   # Utility functions
        │   └── questGenerator.ts    # Core generation engine
        └── data/                    # Quest generation data
            └── questData.ts         # Creatures, locations, NPCs, items
```

## 🎮 Quest Types

### Basic Quest Types
- **Kill Quest**: Eliminate specific creatures or bosses
- **Collection Quest**: Gather materials, artifacts, or resources
- **Delivery Quest**: Transport items or messages between locations
- **Escort Quest**: Protect NPCs during dangerous journeys
- **Exploration Quest**: Discover new locations or investigate phenomena

### Advanced Quest Types
- **Mystery/Investigation**: Solve crimes and uncover hidden truths
- **Survival Challenge**: Endure hostile environments with limited resources
- **Crafting Mission**: Create powerful artifacts or essential tools
- **Diplomacy Quest**: Resolve conflicts through negotiation and relationship building
- **Multi-stage Chain**: Epic storylines spanning multiple sessions
- **Rescue Mission**: Infiltrate strongholds to save captured allies
- **Siege Defense**: Fortify and defend locations against attacking forces
- **Infiltration/Stealth**: Accomplish objectives without being detected

## 📊 Quest Generation System

The quest generator employs sophisticated algorithms to create balanced, engaging adventures:

- **Weighted Randomization**: Ensures varied output while maintaining thematic consistency
- **Difficulty Scaling**: Adjusts quest complexity, enemy strength, and reward values
- **Context-Aware Generation**: Matches quest elements for logical, immersive adventures
- **Complication System**: Adds moral dilemmas, time pressure, and unexpected twists
- **Secondary Objectives**: Provides additional challenges and reward opportunities

## 🎯 Usage Examples

### Generate a Random Quest
1. Open the application
2. Click "Generate Random Quest" for instant adventure
3. Quest appears with all details: objectives, rewards, complications, and estimated duration

### Create Targeted Content
1. Select specific quest type (e.g., "Mystery/Investigation")
2. Choose difficulty level (Easy to Epic)
3. Set quest length (Short to Campaign)
4. Apply filters (alignment, complications, secondary objectives)
5. Generate customized quest matching your campaign needs

### Manage Your Quest Library
1. Save generated quests to your library
2. Mark favorites for quick access
3. Create templates from successful quests
4. Export quest collections for campaign notes

## 🔧 Technical Details

### Dependencies
- **React 19**: Modern UI library with concurrent features
- **TypeScript 5.8**: Type-safe development with strict mode
- **Vite 6.3**: Fast build tooling with hot module replacement
- **Tailwind CSS 4.1**: Utility-first CSS framework
- **Zustand 5.0**: Lightweight state management with persistence
- **ESLint**: Code quality and consistency enforcement

### Configuration Files
- `tsconfig.json`: TypeScript strict mode configuration
- `vite.config.ts`: Build system setup with React and Tailwind plugins
- `eslint.config.js`: Code quality rules matching Master Design Standards
- `tailwind.config.js`: CSS utility configuration

### State Management
The application uses Zustand for predictable state management:
- Quest generation parameters and history
- Saved quests and favorites
- Templates and user preferences
- Persistent storage across browser sessions

## 📖 Documentation

- **[Compliance Report](./COMPLIANCE_REPORT.md)**: Master Design Standards assessment (92% compliant)
- **[Comprehensive Guide](./Fantasy%20Quest%20Generator_%20A%20Comprehensive%20Adventure.md)**: Detailed documentation of quest design theory and implementation
- **[Reference Data](./quest_generator_reference.json)**: Legacy quest generation data and examples

## 🚀 Deployment

### Production Build
```bash
cd frontend
npm run build
```
The built application will be in the `frontend/dist/` directory.

### PowerShell Deployment Script
Use the included `publish.ps1` script for automated deployment following WebHatchery standards.

## 🤝 Contributing

This project follows WebHatchery Master Design Standards:
- React 19+ with TypeScript strict mode
- Functional components with hooks only
- Tailwind CSS for styling
- ESLint for code quality
- Comprehensive type safety

## 📝 License

Part of the WebHatchery game application suite. See individual license files for specific terms.

## 🎲 Get Started

Ready to create epic adventures? [Launch the Quest Generator](./frontend/dist/index.html) and generate your first quest in seconds!
