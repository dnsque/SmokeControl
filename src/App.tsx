import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Articles from './pages/Articles'
import RegisterPage from './pages/RegisterPage'
import AccountPage from './pages/AccountPage'
import Header from './pages/Header'
import Footer from './pages/Footer'
import ArticleDetail from './pages/ArticleDetail'
import UserRatingsPage from './pages/UserRatingsPage'
// Component to handle title changes based on routes
function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    // Set default title
    let title = 'SmokeControl';
    
    // Update title based on current path
    switch(location.pathname) {
      case '/':
        title = 'SmokeControl - Pagrindinis';
        break;
      case '/login':
        title = 'SmokeControl - Prisijungimas';
        break;
      case '/articles':
        title = 'SmokeControl - Straipsniai';
        break;
      case '/register':
        title = 'SmokeControl - Registracija';
        break;
      case '/account':
        title = 'SmokeControl - Paskyra';
        break;
      case '/ratings':
        title = 'SmokeControl - Vartotojų reitingas';
        break;
      default:
        // Check if it's an article page
        if (location.pathname.startsWith('/articles/')) {
          title = 'SmokeControl - Straipsnis';
        } else {
          title = 'SmokeControl';
        }
    }
    
    // Update document title
    document.title = title;
  }, [location]);

  return null;
}

function App() {
  return (
    <>
      <Router>
        <TitleUpdater />
        <Header />
        <div className="flex justify-center items-center min-h-screen pt-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/ratings" element={<UserRatingsPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  )
}

export default App