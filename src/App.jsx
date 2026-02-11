import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';


function App() {
  const [isMobileCompact, setIsMobileCompact] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 400 : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 400px)');
    const onChange = (event) => setIsMobileCompact(event.matches);

    setIsMobileCompact(mediaQuery.matches);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  return (
    <div className={`app-container${isMobileCompact ? ' is-mobile-compact' : ''}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Gallery route can be added later if needed */}
      </Routes>
    </div>
  );
}

export default App;
