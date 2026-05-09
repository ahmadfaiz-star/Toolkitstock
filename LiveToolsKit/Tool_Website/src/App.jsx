import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/homepage";
import BlogDetail from "./page/BlogPage";
import ScrollToTop from "./components/scroll";
import LoginPage from "./page/loginpage";
import SignupPage from "./page/signuppage";
import CategoriesSection from "./components/categories section";
import WordsCounterPage from "./page/wordscounter";
import PasswordGeneratorPage from "./page/password";
import ImageConverterPage from "./page/image";
import TextConverterPage from "./page/textconverter";
import JsonFormatterPage from "./page/jsonformat";
import Contact from "./components/contact";
import Privacy from "./components/privacy";
import Terms from "./components/terms";
import HumanizeComingSoonPage from "./page/humainizeai";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/signuppage" element={<SignupPage />} />
          <Route path="/categories section" element={<CategoriesSection />} />
          <Route path="/BlogPage" element={<BlogDetail />} />
          <Route path="/wordscounter" element={<WordsCounterPage />} />
          <Route path="/password" element={<PasswordGeneratorPage />} />
          <Route path="/image" element={<ImageConverterPage />} />
          <Route path="/textconverter" element={<TextConverterPage />} />
          <Route path="/jsonformat" element={<JsonFormatterPage />} />
          <Route path="/humainizeai" element={<HumanizeComingSoonPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
