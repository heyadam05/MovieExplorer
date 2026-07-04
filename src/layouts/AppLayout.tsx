import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { PageFallback } from "../components/ui/PageFallback";
import { RouteEffects } from "../routes/RouteEffects";

export function AppLayout() {
  return (
    <div className="app-shell">
      <RouteEffects />
      <Navbar />
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--surface)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          },
        }}
      />
    </div>
  );
}
