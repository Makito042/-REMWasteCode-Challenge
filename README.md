# Skip Distance Calculator App

A modern web application built with React, TypeScript, and Vite that helps users calculate and visualize skip distances. This app provides an intuitive interface for selecting different skip distances and viewing corresponding information.

## Features

- Interactive skip distance selection
- Visual representation of skip distances (4yd to 40yd)
- Search functionality for quick distance lookup
- Responsive design for all devices
- Modern UI with custom theming

## Available Skip Distances

- 4 yards
- 6 yards
- 8 yards
- 10 yards
- 12 yards
- 14 yards
- 16 yards
- 20 yards
- 40 yards

## Tech Stack

- React 18
- TypeScript
- Vite
- ESLint for code quality

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── api/         # API service layer
├── components/  # Reusable UI components
├── context/     # React context providers
├── theme/       # Theme configuration
├── types/       # TypeScript type definitions
└── utils/       # Utility functions
```

## Development

### ESLint Configuration

The project uses a comprehensive ESLint setup with type-aware lint rules. To enable stricter type checking, update the ESLint configuration as follows:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
