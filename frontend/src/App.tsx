import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RootLayout from "./components/RootLayout";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Home from "./pages/Home";

import { Provider } from "react-redux";
import { store } from "./data/queries";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="create" element={<Create />} />
            <Route path="edit/:id" element={<Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
