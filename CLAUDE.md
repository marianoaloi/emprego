# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Next.js 15 application with TypeScript and Redux Toolkit for state management. The app fetches employment data from `http://localhost:5000/data` and displays it in a responsive table component.

## Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npx tsc --noEmit
```

## Project Architecture

### Key Components
- **DataTable** (`src/components/DataTable.tsx`): Main table component that displays data from the Redux store
- **StoreProvider** (`src/app/StoreProvider.tsx`): Redux provider wrapper for the app

### Redux Setup
- **Store** (`src/lib/store.ts`): Main Redux store configuration
- **Data Slice** (`src/lib/features/dataSlice.ts`): Handles data fetching from backend API with async thunks
- **Hooks** (`src/lib/hooks.ts`): Typed Redux hooks for useSelector and useDispatch

### Backend Integration
- API endpoint: `http://localhost:5000/data`
- Data fetching handled through Redux Toolkit's `createAsyncThunk`
- Automatic loading states and error handling

### Styling
- Uses Tailwind CSS for styling
- Responsive design with mobile-first approach
- Clean table design with hover effects and loading states

## Data Flow
1. DataTable component mounts and dispatches `fetchData` action
2. Redux slice makes HTTP request to backend server
3. Data is stored in Redux store with loading/error states
4. Table component renders data dynamically based on data structure

## Backend Requirements
Ensure your backend server is running on `http://localhost:5000` with a `/data` endpoint that returns JSON data. The table will automatically adapt to whatever data structure is returned.