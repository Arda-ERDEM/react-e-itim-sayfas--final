import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { DocsLayout } from "@/components/layout/DocsLayout";

import { Home } from "@/pages/Home";
import { Projeler } from "@/pages/Projeler";
import { ProjeDetay } from "@/pages/ProjeDetay";
import { Hakkinda } from "@/pages/Hakkinda";
import { Ilerleme } from "@/pages/Ilerleme";
import { Giris } from "@/pages/docs/Giris";
import { Kurulum } from "@/pages/docs/Kurulum";
import { Jsx } from "@/pages/docs/Jsx";
import { Componentler } from "@/pages/docs/Componentler";
import { State } from "@/pages/docs/State";
import { Effect } from "@/pages/docs/Effect";
import { Events } from "@/pages/docs/Events";
import { Listeler } from "@/pages/docs/Listeler";
import { Formlar } from "@/pages/docs/Formlar";
import { Hooks } from "@/pages/docs/Hooks";
import { Router as RouterDocs } from "@/pages/docs/Router";
import { TypeScriptDersi } from "@/pages/docs/TypeScript";
import { ApiVeri } from "@/pages/docs/ApiVeri";
import { CustomHooks } from "@/pages/docs/CustomHooks";
import { ContextDersi } from "@/pages/docs/Context";
import { Performans } from "@/pages/docs/Performans";
import { IleriKonular } from "@/pages/docs/IleriKonular";
import { StilYonetimi } from "@/pages/docs/StilYonetimi";
import { FormValidasyon } from "@/pages/docs/FormValidasyon";
import { CheatSheet } from "@/pages/CheatSheet";
import { Sozluk } from "@/pages/Sozluk";
import { ReactTsxOdev } from "@/pages/ReactTsxOdev";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projeler" component={Projeler} />
      <Route path="/projeler/:id" component={ProjeDetay} />
      <Route path="/hakkinda" component={Hakkinda} />
      <Route path="/ilerleme" component={Ilerleme} />
      <Route path="/docs/giris"><DocsLayout><Giris /></DocsLayout></Route>
      <Route path="/docs/kurulum"><DocsLayout><Kurulum /></DocsLayout></Route>
      <Route path="/docs/jsx"><DocsLayout><Jsx /></DocsLayout></Route>
      <Route path="/docs/componentler"><DocsLayout><Componentler /></DocsLayout></Route>
      <Route path="/docs/state"><DocsLayout><State /></DocsLayout></Route>
      <Route path="/docs/effect"><DocsLayout><Effect /></DocsLayout></Route>
      <Route path="/docs/events"><DocsLayout><Events /></DocsLayout></Route>
      <Route path="/docs/listeler"><DocsLayout><Listeler /></DocsLayout></Route>
      <Route path="/docs/formlar"><DocsLayout><Formlar /></DocsLayout></Route>
      <Route path="/docs/hooks"><DocsLayout><Hooks /></DocsLayout></Route>
      <Route path="/docs/router"><DocsLayout><RouterDocs /></DocsLayout></Route>
      <Route path="/docs/typescript"><DocsLayout><TypeScriptDersi /></DocsLayout></Route>
      <Route path="/docs/api"><DocsLayout><ApiVeri /></DocsLayout></Route>
      <Route path="/docs/custom-hooks"><DocsLayout><CustomHooks /></DocsLayout></Route>
      <Route path="/docs/context"><DocsLayout><ContextDersi /></DocsLayout></Route>
      <Route path="/docs/performans"><DocsLayout><Performans /></DocsLayout></Route>
      <Route path="/docs/ileri"><DocsLayout><IleriKonular /></DocsLayout></Route>
      <Route path="/docs/stil"><DocsLayout><StilYonetimi /></DocsLayout></Route>
      <Route path="/docs/form-validasyon"><DocsLayout><FormValidasyon /></DocsLayout></Route>
      <Route path="/cheat-sheet" component={CheatSheet} />
      <Route path="/sozluk" component={Sozluk} />
      <Route path="/odev/react-tsx" component={ReactTsxOdev} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;