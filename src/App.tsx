import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Articles from './pages/ArticlesPage'
import RegisterPage from './pages/RegisterPage'
import AccountPage from './pages/AccountPage'
import Header from './components/Header'
import Footer from './components/Footer'
import ArticleDetail from './pages/ArticleDetailPage'
import UserRatingsPage from './pages/RatingsPage'
import TitleUpdater from './components/TitleUpdater'

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