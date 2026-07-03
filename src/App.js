import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LocipherLanding from "./LocipherLanding";
import LocipherApp from "./LocipherApp";
import LocipherAbout from "./LocipherAbout";
import LoadingScreen from "./LoadingScreen";

const go = (navigate, path) => { window.scrollTo(0, 0); navigate(path); };

function Landing() {
  const navigate = useNavigate();
  return <LocipherLanding onTry={() => go(navigate, '/app')} onAbout={() => go(navigate, '/about')} />;
}

function App() {
  const navigate = useNavigate();
  return <LocipherApp onBack={() => go(navigate, '/')} onAbout={() => go(navigate, '/about')} />;
}

function About() {
  const navigate = useNavigate();
  return <LocipherAbout onBack={() => go(navigate, '/')} onTry={() => go(navigate, '/app')} />;
}

function Root() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      {loaded && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<App />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default Root;