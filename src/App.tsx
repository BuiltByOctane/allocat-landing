import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import type { RouteRecord } from "vite-react-ssg";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useLenis } from "@/hooks/useLenis";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageViewOnce } from "@/lib/track";
import Index from "./pages/Index.tsx";
import Story from "./pages/Story.tsx";
import WhyFree from "./pages/WhyFree.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

// Root layout: all app-wide providers, plus Lenis smooth scroll, wrap whichever route matched.
const Layout = () => {
  useLenis();
  // One anonymous page_view per browser session (see src/lib/track.ts).
  useEffect(trackPageViewOnce, []);

  // Client-side navigation keeps the old scroll offset; start each page at its top
  // unless the link targets an anchor.
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Outlet />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const routes: RouteRecord[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Index },
      { path: "story", Component: Story },
      { path: "why-free", Component: WhyFree },
      // ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE
      { path: "*", Component: NotFound },
    ],
  },
];

export default routes;
