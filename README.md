# Textarea

A lightweight, shareable text editor built with Next.js that stores content directly in the URL hash. Type, share, and collaborate instantly - no backend required.

## Features

- **URL-based Storage**: Content is stored in the URL hash as base64-encoded data, making it instantly shareable
- **Real-time Updates**: Content automatically syncs to the URL as you type
- **Performance Optimized**: Uses debounce (500ms) and throttle (100ms) to optimize URL updates
- **No Backend Required**: Everything works client-side with no database or API calls
- **Shareable Links**: Copy the URL to share your content with others
- **Browser History Support**: Navigate through content versions using browser back/forward buttons

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd textarea
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

The editor uses a contentEditable div that:

- Encodes your content to base64 and stores it in the URL hash
- Automatically updates the URL after 500ms of inactivity (debounced)
- Loads content from the URL hash on page load
- Supports browser navigation (back/forward buttons)

## Usage

1. Start typing in the editor
2. The URL will automatically update with your content (encoded in the hash)
3. Copy and share the URL to let others view or edit the same content
4. Use browser back/forward buttons to navigate through content history

## Technology Stack

- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling

## Project Structure

```
textarea/
├── app/
│   ├── page.tsx          # Main page component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   └── editor.tsx        # Editor component with URL hash logic
└── package.json
```

## Development

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Lint

```bash
npm run lint
```

## Limitations

- URL length limits: Browsers have URL length limits (typically 2000-8000 characters), so very long content may not fit in the URL hash
- No persistence: Content is only stored in the URL, so clearing browser history will lose the content
- No collaboration: Multiple users editing the same URL won't see each other's changes in real-time
