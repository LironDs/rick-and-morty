import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import EpisodePage from "./components/EpisodePage";
import CharacterPage from "./components/CharacterPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <div className="">
        <img src="/RickAndMorty.png" alt="" style={{ width: "60vw", marginBottom: "25px" }} />
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="episode/:id" element={<EpisodePage />} />
          <Route path="character/:id" element={<CharacterPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
