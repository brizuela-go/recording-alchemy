# Recording Alchemy

A professional platform for musicians and producers to learn recording, mixing, and mastering techniques through courses, templates, and community support.

![Recording Alchemy](public/og.png)

## Overview

Recording Alchemy provides educational resources and community support to help artists confidently record, mix, and master their own music. The platform offers various membership options, downloadable resources, and live coaching sessions.

## Features

- 🎵 **Course Offerings**: Group coaching, 1-on-1 sessions, and in-studio experiences
- 🎚️ **Educational Resources**: Vocal chain templates, mixing guides, and production techniques
- 👥 **Community Support**: Access to Discord community for feedback and collaboration
- 🎓 **Live Sessions**: Weekly Zoom calls, demos, and Q&A sessions
- 📱 **Responsive Design**: Fully responsive across all devices

## Tech Stack

- **Framework**: Next.js 15.3.1 with Turbopack
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion & CSS Transitions
- **Carousels**: Embla Carousel with autoplay
- **Utility Libraries**: clsx & tailwind-merge
- **UI Components**: Custom-built component library
- **Form Handling**: Native React state
- **Type Checking**: TypeScript 5

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm (recommended package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/brizuela-go/recording-alchemy.git
   cd recording-alchemy
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server with Turbopack:

   ```bash
   pnpm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

## Development Workflow

### File Structure

```
recording-alchemy/
├── app/                     # Next.js app router
│   ├── components/          # Shared components
│   │   ├── ui/              # UI components
│   │   └── ...              # Section components
│   ├── lib/                 # Utility functions
│   ├── page.tsx             # Homepage
│   ├── layout.tsx           # Root layout
│   ├── not-found.tsx        # 404 page
│   └── terms-and-conditions/ # Terms and conditions page
├── public/                  # Static assets
│   └── images/              # Image assets
├── styles/                  # Global styles
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json            # TypeScript configuration
├── README.md
└── tailwind.config.js
```

### Key Components

- **UI Components**: Reusable interface elements (buttons, forms, cards)
- **Section Components**: Larger page sections (hero, features, pricing)
- **Layout Components**: Page structure elements (navbar, footer)

### Styling Approach

The project uses Tailwind CSS v4 with custom extensions:

- Custom color palette with gold gradients
- Responsive design utilities
- Component-specific custom classes
- Class utilities management with clsx and tailwind-merge

## Component Library

### Base Components

- **GoldGradientText**: Text with signature gold gradient styling
- **PricingButton**: Call-to-action button for pricing sections
- **DurationTab**: Interactive tabs for selecting subscription durations
- **FeatureItem**: List items for feature sections

### Section Components

- **RealStoriesVideos**: Video testimonials carousel with Embla Carousel
- **CoursePricingSection**: Pricing options and packages
- **CommunityForm**: Email signup and community connection
- **DownloadForm**: Lead generation for free resources

### Animation Strategy

The project uses Framer Motion for complex animations and transitions, with simpler animations handled by Tailwind's transition utilities. This provides a smooth user experience while maintaining performance.

## Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Contact

Jamin - [jamin@recordingalchemy.com](mailto:jamin@recordingalchemy.com)

Project Link: [https://github.com/brizuela-go/recording-alchemy](https://github.com/brizuela-go/recording-alchemy)
