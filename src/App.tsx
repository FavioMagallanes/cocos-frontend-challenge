import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout";
import { InstrumentsPage, PortfolioPage } from "./pages";

export const App = () => {
  return (
    <Router basename="/cocos-frontend-challenge">
      <MainLayout>
        <Routes>
          <Route path="/" element={<InstrumentsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};
