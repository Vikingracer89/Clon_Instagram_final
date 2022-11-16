import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { PostPage } from "./pages/PostPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Footer } from "./components/Footer";
import { UserPage } from "./pages/UserPage";

function App() {
  return (
    <main className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/photo/:id" element={<PostPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
