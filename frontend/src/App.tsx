import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Userspage from "./components/Userspage";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="userspage" element={<Userspage />} />
      {/* <Route path="postspage" element={<Postspage />} /> */}
    </Routes>
  </BrowserRouter>
);

export default App;
