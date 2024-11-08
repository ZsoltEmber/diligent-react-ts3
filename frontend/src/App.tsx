import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Userspage from "./components/Userspage";
import Postspage from "./components/Postspage";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="userspage" element={<Userspage />} />
      <Route path="postspage" element={<Postspage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
