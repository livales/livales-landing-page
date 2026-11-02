import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import SiteLayout from "@/components/layout/SiteLayout";
import { ROUTES } from "@/lib/seo";
import Index from "./pages/Index";
import Products from "./pages/Products";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/** App-wide providers, shared by the browser app and the build-time prerender. */
export const AppProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export const AppRoutes = () => (
  <Routes>
    <Route element={<SiteLayout />}>
      <Route path={ROUTES.home} element={<Index />} />
      <Route path={ROUTES.products} element={<Products />} />
      <Route path={ROUTES.about} element={<About />} />
      <Route path={ROUTES.blog} element={<Blog />} />
      <Route path={`${ROUTES.blog}/:slug`} element={<BlogPost />} />
      {/* New pages also go in ROUTES (src/lib/seo.ts) so they're prerendered. */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
