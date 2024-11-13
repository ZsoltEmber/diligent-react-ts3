import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import UsersPage from "./pages/Userspage";
import PostsPage from "./pages/Postspage";




const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="userspage" element={<UsersPage />} />
      <Route path="postspage" element={<PostsPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
