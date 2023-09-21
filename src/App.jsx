import { Routes, Route } from 'react-router-dom';
import Game from "./Components/Game"
import Rules from "./Components/Rules"

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
