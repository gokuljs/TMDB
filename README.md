# Movie Dashboard

## Overview

This project is a movie dashboard web application that fetches popular movies from TMDB (The Movie Database) and displays them in a list format. It supports infinite scrolling, allowing users to view thousands of movies without degrading performance. The application also features a responsive design, making it suitable for various devices, and includes some UI enhancements for a better user experience.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Testing](#testing)
- [Project Structure](#ProjectStructure)
- [Bonus Features](#bonus-features)

## Prerequisites

Before getting started, ensure you have the following installed on your machine:

- Node.js
- TMDB API key (obtainable by creating a free account at TMDB)

## Installation Instructions

1. Install Node.js:
   - Download and install Node.js from [nodejs.org](https://nodejs.org/).
2. Clone the TMDB library repository:

   ```bash
   git clone https://github.com/gokuljs/TMDB.git
   ```

3. Navigate to the cloned repository:

   ```bash
   cd TMDB
   ```

4. Install dependencies using npm:

   ```bash
   npm install
   ```

5. Create a `.env.local` file:

   ```bash
   touch .env.local
   ```

6. Obtain a TMDB Read Access Token:

   - Visit [TMDB Developer](https://developer.themoviedb.org/docs/getting-started) and create an account if you haven't already.
   - Generate a Read Access Token.

7. Add the token to the `.env.local` file:
   ```plaintext
   NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

Replace `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with the token you obtained.

8. Run the project:
   ```bash
   npm run dev
   ```

## Testing

Unit tests are included for critical components and utility functions. Run the tests using:

```bash
npm run test
```

# ProjectStructure

This project is structured to support a scalable and maintainable architecture, utilizing the Next.js framework, TypeScript, and Tailwind CSS among other technologies. Below is an outline of the main directories and files, along with their purpose within the application.

## Directory Structure

- **/app**: Contains the main application logic and page-specific components, adhering to Next.js 14 app router folder conventions.
- **/globals.css**: Global styles that are applied throughout the app.
- **/components/ui**: Houses reusable UI components for global use across the application.
- \*\*/lib Dedicated to utility functions, custom hooks, and models that define the data structures used in the app.
- **/public**: Stores all static assets like logos and icons, accessible throughout the UI.

## Root Files

- **.eslintrc.json**: Configures ESLint for code quality standards.
- **.gitignore**: Lists files and directories for Git to ignore.
- **.prettierignore**: Specifies files to exclude from Prettier formatting.
- **.prettierrc**: Configures Prettier for code formatting.
- **components.json**: (Optional) Contains metadata about the project's components.
- **jest.config.ts**: Configures Jest for testing.
- **jest.setup.ts**: Provides setup configurations for Jest tests.
- **next-env.d.ts**: TypeScript declaration file for Next.js, ensuring type safety.
- **next.config.mjs**: Main configuration file for Next.js.
- **package-lock.json**: Locks the versions of npm dependencies for consistent installs.
- **package.json**: Defines project metadata and lists dependencies.
- **postcss.config.js**: Configuration for PostCSS, enhancing CSS processing.
- **README.md**: Introduces and provides setup instructions for the project.
- **tailwind.config.ts**: Configures Tailwind CSS for utility-first styling.
- **tsconfig.json**: Sets the TypeScript compiler options for the project.

This structure is designed to promote efficient development practices and ensure a clear organization of the project's codebase.

## Bonus Features

1. **Mobile Responsiveness**: The application is designed to be responsive across various screen sizes.
2. **UI Design**: Incorporates smooth animations and transitions to enhance user experience.
3. **Performance Optimization**: Includes optimizations such as lazy loading images, React virtualization, and infinite scroll to ensure fast load times and smooth scrolling.
