import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import Navbar from "./Navbar";
import Updates from "./Updates";
import Footer from "./Footer";

/** Start each new page at the top, or at its #anchor when the link has one. */
const useScrollOnNavigate = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
};

/** Every page: navbar, the page itself, the updates sign-up, and the footer. */
const SiteLayout = () => {
  usePageMeta();
  useScrollOnNavigate();

  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Updates />
      <Footer />
    </div>
  );
};

export default SiteLayout;
