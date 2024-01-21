import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './componants/Game.js';
import Homepage from './componants/Homepage.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/play" element={<Game />} />
      </Routes>
    </Router>
  );
};

export default App;
