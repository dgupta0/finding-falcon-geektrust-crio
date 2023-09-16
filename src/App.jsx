import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from "./Components/game"
import Rules from "./Components/rules"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Rules />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  )
}

export default App
