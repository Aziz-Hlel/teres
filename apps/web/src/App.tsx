import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Events from './pages/Events';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import NotFound from './pages/NotFound';
import { ScrollToTop } from './lib/ScrollToTop';
import Menu2 from './pages/Menu2';
import MainLayout from './layouts/MainLayout';
import NoFooterLayout from './layouts/NoFooterLayout';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          {/* Routes WITH footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/menu" element={<Menu />} />
          </Route>

          {/* Routes WITHOUT footer */}
          <Route element={<NoFooterLayout />}>
            <Route path="/menu2" element={<Menu2 />} />
            <Route path="/all" element={<Menu />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
