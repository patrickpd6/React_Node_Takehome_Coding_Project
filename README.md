# Image List

Image List application is integrated with GraphQL powered backend for fetching media information.
The intention of building this application was to focus on 2 parts:
- Backend where an REST API is exposed for powering the UI
- Frontend where output is server side rendered and pagination is enabled

## Prerequesties

- Node.js >= 14.x
- npm or yarn

Note: yarn.lock is already committed in the repository, so prefer using Yarn.

## Directory Structure

```
|
|---- constants
|---- pages
|---- services
|---- styles
|---- public
|---- yarn.lock
|---- package.json
```

## Running the application

Run the development server using this command:

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Tools Integrated
- Prettier
- TypeScript
- Material UI
- SCSS

## Expected Output
- Api can be accessed via [http://localhost:3000/api/media-list](http://localhost:3000/api/media-list)

## What you would do if you had more time?
- Integrate a state management system like redux or may be use Context API + useReducer
- Caching of pages on the UI layer. So new page is not fetching everytime the user navigates
- Write test scripts
- Write better styling for the page. Though SCSS is integrated, I focused on writing minimal CSS and use material component for designing. But if I had more time, I would surely like to use "CSS Modules" for styling the application
- Use a Docker file for running the application
- Use husky for pre-commit hooks