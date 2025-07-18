# iTodo - Vite + React To-Do App

iTodo is a modern, minimal, and responsive To-Do application built with [React](https://react.dev/) and [Vite](https://vitejs.dev/). It features dark mode, filtering, priorities, categories, and persistent storage using localStorage.

## Features

- Add, edit, and delete tasks
- Set due dates, categories, and priorities
- Filter tasks by category and priority
- Search tasks by text
- Mark tasks as completed
- Show/hide finished tasks
- Responsive design with dark mode
- Data persists in browser localStorage

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd to-do
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```sh
npm run build
# or
yarn build
```

### Preview Production Build

```sh
npm run preview
# or
yarn preview
```

## Project Structure

```
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── .gitignore
```

## Customization

- Tailwind CSS is used for styling. You can customize styles in `tailwind.config.js` and the CSS files.
- All logic is in the `src` folder.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.