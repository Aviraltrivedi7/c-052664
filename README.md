
# Crypto Dashboard

A modern, responsive cryptocurrency dashboard built with React, TypeScript, and Tailwind CSS. Track Bitcoin prices, view market performance, and analyze crypto trends with interactive charts.

## Features

- **Real-time Bitcoin Price Chart**: Interactive TradingView widget showing live Bitcoin price data
- **Portfolio Performance**: Historical Bitcoin price chart showing 6-month performance trends
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Theme**: Modern dark UI with glass morphism effects
- **Live Data**: Real-time market data from CoinGecko API

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Beautiful, accessible UI components
- **TanStack Query** - Powerful data fetching and caching
- **Recharts** - Responsive chart library
- **TradingView Widget** - Professional trading charts
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crypto-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── CryptoChart.tsx      # TradingView Bitcoin chart
│   ├── PortfolioCard.tsx    # Bitcoin performance chart
│   └── ui/                  # Reusable UI components
├── hooks/
│   └── use-toast.ts         # Toast notification hook
├── lib/
│   └── utils.ts             # Utility functions
└── pages/
    └── Index.tsx            # Main dashboard page
```

## Components

### CryptoChart
Displays a professional TradingView chart for Bitcoin price tracking with real-time data.

### PortfolioCard
Shows Bitcoin's 6-month price performance using historical data from CoinGecko API.

## API Integration

The dashboard integrates with:
- **CoinGecko API**: For historical Bitcoin price data
- **TradingView**: For real-time price charts and trading data

## Styling

The project uses a custom design system with:
- Glass morphism effects
- Dark theme optimized for crypto trading
- Responsive breakpoints for all device sizes
- Custom animations and transitions

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Deployment

The app can be deployed to any static hosting service:

### Vercel
```bash
npm run build
npx vercel --prod
```

### Netlify
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

## Environment Variables

No environment variables are required for basic functionality. All APIs used are public and don't require authentication keys.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
