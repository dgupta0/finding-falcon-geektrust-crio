import { Routes, Route } from 'react-router-dom';
import Game from "./Components/Game"
import Rules from "./Components/Rules"
import Result from './Components/Result';
import Header from './Components/Header';
import Footer from './Components/Footer';


function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Rules />} />
        <Route path="/game" element={<Game />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
