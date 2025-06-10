# Skip Booking Application

A modern, user-friendly web application for booking waste management skips. Built with React, TypeScript, and Material-UI.

## Features

- **Intuitive Booking Process**: Step-by-step wizard interface for easy skip booking
- **Location-based Search**: Find available skips in your area using postcode
- **Multiple Skip Sizes**: Choose from various skip sizes (4-40 yards)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Availability**: Check skip availability instantly
- **Secure Checkout**: Safe and easy payment process

## Technology Stack

- React 18
- TypeScript
- Material-UI (MUI)
- Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd -REMWasteCode-Challenge
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── api/          # API service layer
├── assets/       # Static assets
├── components/   # Reusable UI components
├── theme/        # MUI theme customization
├── types/        # TypeScript type definitions
└── App.tsx       # Main application component
```

## Components

- **StepperComponent**: Progress indicator for the booking process
- **SearchForm**: Postcode and area search functionality
- **SkipCard**: Individual skip display with details
- **SkipList**: Grid layout of available skips
- **LoadingState**: Loading indicator component
- **ErrorState**: Error handling display
- **ConfirmationDialog**: Booking confirmation modal

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript compiler check

### Code Style

This project uses:
- ESLint for code linting
- TypeScript for type checking
- Prettier for code formatting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
