# Turfly Frontend

A modern React-based frontend application for the Turfly platform. Built with Vite, React 19, and Tailwind CSS, this application provides an intuitive user interface with seamless API integration that connects to the robust Turfly backend.

## 🚀 Live Demo

**[Visit Turfly Frontend](https://turfly-frontend.vercel.app)**

## 📋 Overview

Turfly Frontend is a contemporary web application built with the latest React and web technologies. It delivers a responsive, performant user experience with beautiful styling powered by Tailwind CSS. The application features JWT-based authentication, dynamic routing, and seamless integration with the Turfly backend API.

## 🛠️ Technology Stack

- **Framework**: React 19.2.8
- **Build Tool**: Vite 8.2.2
- **Styling**: Tailwind CSS 4.3.3
- **Routing**: React Router DOM 7.18.3
- **HTTP Client**: Axios 1.20.0
- **Icons**: Lucide React 1.39.0
- **Package Manager**: npm
- **Hosting**: Vercel (Deployed)

## ✨ Key Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design with Tailwind CSS
- ⚡ **Lightning Fast** - Optimized with Vite for instant HMR and fast builds
- 🔐 **Secure Authentication** - JWT-based auth integration with backend
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🧭 **Client-side Routing** - Smooth navigation with React Router
- 🎯 **Component Architecture** - Well-organized, reusable React components
- 📡 **API Integration** - Axios-based HTTP client for seamless backend communication
- 🎭 **Icon Support** - Beautiful icons via Lucide React

## 📁 Project Structure

```
turfly-frontend/
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/              # Page components (full page views)
│   ├── api/                # API service layer (axios calls)
│   ├── context/            # React Context for state management
│   ├── utils/              # Utility functions and helpers
│   ├── App.jsx             # Main App component with routing
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
├── package.json            # Dependencies and scripts
├── index.html              # HTML entry point
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 📸 Application Screenshots

1. ![Screenshot](https://raw.githubusercontent.com/Steve-B17/turfly-frontend/main/docs/screenshots/1.png)

2. ![Screenshot](https://raw.githubusercontent.com/Steve-B17/turfly-frontend/main/docs/screenshots/2.png)

3. ![Screenshot](https://raw.githubusercontent.com/Steve-B17/turfly-frontend/main/docs/screenshots/3.png)

4. ![Screenshot](https://raw.githubusercontent.com/Steve-B17/turfly-frontend/main/docs/screenshots/4.png)

5. ![Screenshot](https://raw.githubusercontent.com/Steve-B17/turfly-frontend/main/docs/screenshots/5.png)

6. ![Screenshot](https://raw.githubusercontent.com/Steve-B17/turfly-frontend/main/docs/screenshots/6.png)

## 🚀 Getting Started

### Prerequisites

- Node.js 16.0 or higher
- npm 7.0 or higher (or yarn)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Steve-B17/turfly-frontend.git
cd turfly-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
```bash
# .env
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=Turfly
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 📦 Dependencies

### Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.2.8 | Core React library |
| `react-dom` | ^19.2.8 | DOM rendering |
| `react-router-dom` | ^7.18.3 | Client-side routing |
| `axios` | ^1.20.0 | HTTP client for API calls |
| `tailwindcss` | ^4.3.3 | Utility-first CSS framework |
| `@tailwindcss/vite` | ^4.3.3 | Vite plugin for Tailwind |
| `lucide-react` | ^1.39.0 | Icon library |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^8.2.2 | Build tool and dev server |
| `@vitejs/plugin-react` | ^6.1.0 | React support for Vite |
| `eslint` | ^10.9.0 | Code quality linting |
| `@types/react` | ^19.2.18 | React TypeScript types |
| `@types/react-dom` | ^19.2.4 | React DOM TypeScript types |

## 🔗 API Integration

The frontend communicates with the Turfly Backend via REST API calls using Axios.

### API Base URL Configuration

Set your backend API URL in the `.env` file:

```env
VITE_API_URL=https://api.turfly.com
```

### Example API Call

```javascript
// src/api/auth.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = (email, password) => {
  return axios.post(`${API_URL}/api/auth/login`, {
    email,
    password
  });
};
```

## 🔐 Authentication

The application uses JWT (JSON Web Token) authentication:

1. User logs in with credentials
2. Backend returns JWT token
3. Token is stored in localStorage/sessionStorage
4. Token is included in Authorization header for subsequent requests
5. Token refresh/logout handled automatically

## 🎨 Styling

### Tailwind CSS

This project uses Tailwind CSS v4 for styling. Customize the design:

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      // Custom theme configuration
    }
  }
}
```

### Global Styles

Global styles are in `src/index.css`:

```css
@import "tailwindcss";

/* Custom global styles */
```

## 🧪 Linting

Check code quality with ESLint:

```bash
# Lint all files
npm run lint

# Lint specific directory
npm run lint src/
```

## 📱 Responsive Design

The application is fully responsive:

- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

Use Tailwind's responsive prefixes:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms

The project can be deployed to:
- Netlify
- GitHub Pages
- AWS Amplify
- Firebase Hosting
- Any static host

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Use a different port
npm run dev -- --port 3000
```

### API Connection Issues

- Verify `VITE_API_URL` in `.env`
- Check backend is running and accessible
- Review browser console for CORS errors
- Verify API endpoint URLs

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf dist .vite
npm run build
```

## 📚 Component Structure

### Creating a New Component

```javascript
// src/components/MyComponent.jsx
export function MyComponent({ prop1, prop2 }) {
  return (
    <div className="p-4 rounded-lg bg-white shadow">
      <h2 className="text-lg font-bold">{prop1}</h2>
      <p>{prop2}</p>
    </div>
  );
}
```

### Using Components in Pages

```javascript
// src/pages/MyPage.jsx
import { MyComponent } from '../components/MyComponent';

export function MyPage() {
  return (
    <div className="container mx-auto p-4">
      <MyComponent prop1="Title" prop2="Content" />
    </div>
  );
}
```

## 🌐 Routing

React Router v7 handles client-side routing:

```javascript
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 💾 State Management

Use React Context for global state:

```javascript
// src/context/AuthContext.jsx
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit changes (`git commit -m 'Add AmazingFeature'`)
5. Push to branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Code Style Guidelines

- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Keep components small and focused
- Write reusable, modular code
- Add comments for complex logic

## 📄 Environment Variables

Create a `.env` file in the root directory:

```bash
# Backend API URL
VITE_API_URL=http://localhost:8080

# Application Name
VITE_APP_NAME=Turfly

# API Timeout (in ms)
VITE_API_TIMEOUT=5000
```

## 🔄 Git Workflow

```bash
# Create a feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: add your feature"

# Push to GitHub
git push origin feature/your-feature

# Create Pull Request on GitHub
```

## 📞 Support & Feedback

For issues, feature requests, or questions:

- **GitHub Issues**: [Open an Issue](https://github.com/Steve-B17/turfly-frontend/issues)
- **GitHub Discussions**: [Start a Discussion](https://github.com/Steve-B17/turfly-frontend/discussions)

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Lucide Icons](https://lucide.dev)

## 📄 License

This project is part of the Turfly application ecosystem.

## 🔗 Related Projects

- **[Turfly Backend](https://github.com/Steve-B17/turfly)** - Spring Boot backend API
- **Turfly Mobile** - Mobile application (coming soon)

## 👤 Author

**Steve-B17**
- GitHub: [@Steve-B17](https://github.com/Steve-B17)
- Email: [your-email]

---

**Last Updated**: September 2026

**Live Demo**: [https://turfly-frontend.vercel.app](https://turfly-frontend.vercel.app)

**Status**: Active Development ✨
