import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Bookmarks from './pages/Bookmarks';
import CategoryFeed from './pages/CategoryFeed';
import SearchFeed from './pages/SearchFeed';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashProgress, setSplashProgress] = useState(0);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setSplashProgress((currentProgress) => Math.min(currentProgress + 5, 100));
    }, 90);

    const splashTimer = setTimeout(() => {
      setSplashProgress(100);
      setShowSplash(false);
    }, 2000);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(splashTimer);
    };
  }, []);

  if (showSplash) {
    return <SplashScreen progress={splashProgress} />;
  }

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-5 sm:py-8 max-w-6xl w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/category/:name" element={<CategoryFeed />} />
              <Route path="/search" element={<SearchFeed />} />
              
              {/* Protected Routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/bookmarks" element={
                <ProtectedRoute>
                  <Bookmarks />
                </ProtectedRoute>
              } />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

