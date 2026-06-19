import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Industries from "@/pages/Industries";
import CaseStudies from "@/pages/CaseStudies";
import Insights from "@/pages/Insights";
import Contact from "@/pages/Contact";
import { ScheduleMeetingProvider, useScheduleMeeting } from "@/hooks/useScheduleMeeting";
import { ScheduleMeeting } from "@/components/ScheduleMeeting";

const queryClient = new QueryClient();

function ScheduleMeetingGlobal() {
  const { open, setOpen } = useScheduleMeeting();
  return <ScheduleMeeting open={open} onOpenChange={setOpen} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/industries" component={Industries} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/insights" component={Insights} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScheduleMeetingProvider>
          <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
            <Router />
          </WouterRouter>
          <ScheduleMeetingGlobal />
          <Toaster />
        </ScheduleMeetingProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
