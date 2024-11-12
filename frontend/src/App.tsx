import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import UsersPage from "./components/UsersPage";
import PostsPage from "./components/PostsPage";




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
