# Market Creation Demo Frontend

This is a standalone demo frontend for the market creation functionality, extracted from the main project. It allows users to create different types of prediction markets (binary, categorical, and numeric) through a step-by-step interface.

## Features

- Create three types of markets:
  - **Binary Markets**: Yes/No outcomes
  - **Categorical Markets**: Multiple custom outcomes
  - **Numeric Markets**: Range of numeric values
- Step-by-step creation process
- Form validation
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd demo-frontend
npm install
```

### Running the Development Server

```bash
npm run dev
```

This will start the development server, typically on [http://localhost:3000](http://localhost:3000).

### Backend Connection

This demo frontend is designed to connect to the existing backend server. Make sure the backend server is running on port 5001 before using the demo.

To start the backend server, navigate to the backend directory and run:

```bash
cd ../backend
python server.py
```

## Project Structure

- `src/app/page.tsx` - Main create market page
- `src/app/layout.tsx` - App layout
- `src/components/create-market/` - Components for market creation
- `src/utils/rpc.ts` - Utility for backend communication

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
