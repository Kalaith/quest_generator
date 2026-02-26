# Quest Generator

Frontend-only WebHatchery app for generating fantasy RPG quests.

## Stack

1. React + TypeScript + Vite
2. Tailwind CSS
3. Zustand
4. Vitest + Testing Library

## Structure

```text
quest_generator/
  .github/workflows/ci.yml
  frontend/
    src/
      api/
      components/
      data/
      hooks/
      pages/
      stores/
      types/
      utils/
      test/
```

## Local Development

```powershell
cd frontend
npm install
npm run dev
```

## Quality Gates

```powershell
cd frontend
npm run lint
npm run type-check
npm run test:run
npm run build
```

Combined:

```powershell
cd frontend
npm run ci
```

## Environment

See `frontend/.env.example`.

## Deployment

From app root:

```powershell
.\publish.ps1
```

## Notes

1. Standardized in migration pilot wave as **frontend-only**.
2. Added minimal Vitest config + smoke test to keep CI test gate active.
