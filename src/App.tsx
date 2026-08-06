import { Route, Routes } from "react-router-dom";
import { Catalog } from "./pages/Catalog";
import { Navigation } from "./components/Navigation";
import { CreatePost } from "./pages/CreatePost";
import { PostDetails } from "./pages/PostDetails";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <div className="max-w-360 mx-auto">
      <Navigation />
      <Routes>
        <Route path="/" element={<Catalog />}>
          Catalog
        </Route>
        <Route path="/create" element={<CreatePost />}>
          Catalog
        </Route>
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
