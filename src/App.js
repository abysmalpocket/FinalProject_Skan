import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import SearchResultPage from "./pages/SearchResultPage";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/home" element={<MainPage />}></Route>
        <Route path="/login_page" element={<LoginPage />}></Route>
        <Route path="/search_page" element={<SearchPage />}></Route>
        <Route path="/results_page" element={<SearchResultPage />}></Route>
        <Route
          path="*"
          element={<Navigate to="/home" replace={true} />}
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
