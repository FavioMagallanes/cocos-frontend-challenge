import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout";
import { InstrumentsPage, PortfolioPage } from "./pages";

export const App: FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<InstrumentsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};
