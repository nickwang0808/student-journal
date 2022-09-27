import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RootLayout from "./components/RootLayout";
import Create from "./pages/Create";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="edit/:id" element={<Create />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
