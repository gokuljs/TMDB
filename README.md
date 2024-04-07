# Movie Dashboard

## Overview

This project is a movie dashboard web application that fetches popular movies from TMDB (The Movie Database) and displays them in a list format. It supports infinite scrolling, allowing users to view thousands of movies without degrading performance. The application also features a responsive design, making it suitable for various devices, and includes some UI enhancements for a better user experience.

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




