# Emprego - Job Board Application

"Emprego" is a web application designed to help users find job opportunities. It provides a clean, intuitive interface for browsing, searching, and viewing job listings. The application is built with a modern tech stack, ensuring a fast and responsive user experience.

## Features

*   **Job Listings**: View job opportunities in a clear, sortable data table.
*   **Search and Filter**: Easily search for specific jobs and filter them based on various criteria.
*   **Detailed Job Descriptions**: Click on a job to view a detailed description in a modal window.
*   **User Authentication**: Secure user authentication powered by Firebase.
*   **Geographic Job Search**: Includes functionality to display jobs on a map (powered by Leaflet), with a focus on Italian provinces.
*   **Responsive Design**: A responsive layout that works on both desktop and mobile devices.

## Tech Stack

This project is built with a modern and robust tech stack:

*   **Frontend**:
    *   [Next.js](https://nextjs.org/) - A React framework for building server-side rendered and static web applications.
    *   [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
    *   [Redux Toolkit](https://redux-toolkit.js.org/) - For predictable state management.
    *   [Material-UI (MUI)](https://mui.com/) - A comprehensive suite of UI tools to help you ship new features faster.
    *   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
    *   [Leaflet](https://leafletjs.com/) - An open-source JavaScript library for mobile-friendly interactive maps.
*   **Backend & Services**:
    *   [Firebase](https://firebase.google.com/) - Used for authentication and as a backend data store.
    *   [Cloud Functions for Firebase](https://firebase.google.com/docs/functions) - For running backend code in response to events.
*   **Language**:
    *   [TypeScript](https://www.typescriptlang.org/) - For static typing.

## Project Structure

The project's source code is organized in the `src/` directory:

```
src/
├── app/              # Main application pages and layout
├── components/       # Reusable React components
│   └── auth/         # Authentication-related components
├── lib/              # Redux store, hooks, and feature slices
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v20 or later)
*   npm, yarn, or pnpm

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-github-username/emprego.git
    cd emprego
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env.local
    ```

    You will need to add your Firebase project configuration to this file. At a minimum, the `NEXT_PUBLIC_FIREBASE_API_KEY` is required.

    ```ini
    # Required: Firebase API Key
    NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here

    # Optional: Other Firebase config (defaults provided)
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    # ... other optional variables
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
