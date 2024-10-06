import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Intro from "./components/intro";
import Dashboard from "./pages/dashboard";
import Form from "./pages/form";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="App h-full">
      <Intro isVisible={showIntro} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/booking form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
