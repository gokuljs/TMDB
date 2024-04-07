# Movie Dashboard

## Overview

This project is a movie dashboard web application that fetches popular movies from TMDB (The Movie Database) and displays them in a list format. It supports infinite scrolling, allowing users to view thousands of movies without degrading performance. The application also features a responsive design, making it suitable for various devices, and includes some UI enhancements for a better user experience.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Testing](#testing)
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
# Project Folder Structure

## /app
### /__components
Holds the main application logic and page-specific components, following Next.js 14 app router folder conventions.

### /globals.css
The global CSS file that is applied throughout the app.

## /components/ui
Includes reusable Global UI components.

## /lib/hooks
Houses utility functions, custom hooks, and models defining the data structures used throughout the app.

## /public
Contains all static assets like logos and icons used in the UI.

## Root Files
- `.eslintrc.json`: Configuration for ESLint to maintain code quality.
- `.gitignore`: Specifies intentionally untracked files to ignore by Git.
- `.prettierignore`: Lists files that Prettier will ignore when formatting.
- `.prettierrc`: Configuration for Prettier code formatter.
- `components.json`: Could contain metadata about components used in the project.
- `jest.config.ts`: Configuration for Jest, a JavaScript testing framework.
- `jest.setup.ts`: Setup file for Jest tests to configure or set up before the tests run.
- `next-env.d.ts`: TypeScript declaration file for Next.js which ensures Next.js types are picked up by the TypeScript compiler.
- `next.config.mjs`: Configuration file for Next.js.
- `package-lock.json`: Automatically generated file for any operations where npm modifies either the node_modules tree or `package.json`.
- `package.json`: Defines the project metadata and the list of dependency packages.
- `postcss.config.js`: Configuration file for PostCSS, a tool for transforming CSS with JavaScript plugins.
- `README.md`: Markdown file with the project's introduction, setup guide, and other helpful information.
- `tailwind.config.ts`: Configuration file for Tailwind CSS, a utility-first CSS framework.
- `tsconfig.json`: Configuration file for the TypeScript compiler.


## Bonus Features

1. **Mobile Responsiveness**: The application is designed to be responsive across various screen sizes.
2. **UI Design**: Incorporates smooth animations and transitions to enhance user experience.
3. **Performance Optimization**: Includes optimizations such as lazy loading images, React virtualization, and infinite scroll to ensure fast load times and smooth scrolling.




