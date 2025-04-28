import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./page/mainPage";
import LinkedInCallback from "./page/linkedInCallback";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/linkedin-callback" element={<LinkedInCallback />} />
      </Routes>
    </Router>
  );
};

export default App;
