import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout";
import { Spinner } from "./components/shared/spinner.tsx";

const LazyInstrumentsPage = lazy(() =>
  import("./pages").then(module => ({ default: module.InstrumentsPage }))
);
const LazyPortfolioPage = lazy(() =>
  import("./pages").then(module => ({ default: module.PortfolioPage }))
);

export const App = () => {
  return (
    <Router>
      <MainLayout>
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-screen">
              <Spinner />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<LazyInstrumentsPage />} />
            <Route path="/portfolio" element={<LazyPortfolioPage />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
};
