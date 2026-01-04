# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official documentation website for BehaviorTree.CPP, a C++ library for building behavior trees used in robotics and AI systems. The site is built with Docusaurus 3 and hosted at https://www.behaviortree.dev/

## Common Commands

```bash
npm install        # Install dependencies (requires Node.js 20+)
npm run start      # Local dev server at http://localhost:3000 (hot reload)
npm run build      # Production build to /build directory
npm run serve      # Serve production build locally
npm run clear      # Clear Docusaurus cache
```

## Architecture

### Documentation Structure
- `docs/` - Current version (4.8) documentation in Markdown
  - `learn-the-basics/` - Fundamental BT concepts
  - `tutorial-basics/` - Tutorials 01-11 (beginner)
  - `tutorial-advanced/` - Tutorials 12-16 (advanced)
  - `guides/` - Topic guides (async nodes, ports, scripting)
  - `nodes-library/` - Node type reference
- `versioned_docs/` - Legacy versions (3.8, 4.0.2)
- `blog/` - Release announcements

### Custom Pages (React)
- `src/pages/index.js` - Homepage with hero section and feature carousel
- `src/pages/groot.js` - Groot2 IDE page with pricing/licensing (uses Chargebee)
- `src/pages/moveit_studio.js` - MoveIt Studio integration page
- `src/components/ContactFormModal/` - Email contact form (EmailJS)
- `src/components/HomepageFeatures/` - Homepage feature cards

### Configuration
- `docusaurus.config.js` - Main config (versions, navbar, footer, Prism languages)
- `sidebars.js` - Auto-generated from filesystem structure
- `versions.json` - Supported doc versions

### Key Technical Details
- Prism syntax highlighting configured for `cpp` and `xml-doc`
- Bootstrap 5 + React Bootstrap for UI components
- Download tracking via Netlify Functions + Neon PostgreSQL database
- Dark mode disabled (light mode only)