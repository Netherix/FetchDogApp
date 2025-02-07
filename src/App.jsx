import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import LogOut from "./pages/LogOut/LogOut";
import Search from "./pages/Search/Search";
import Match from "./pages/Match/Match";
import Favorites from './pages/Favorites/Favorites'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/match" element={<Match />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
