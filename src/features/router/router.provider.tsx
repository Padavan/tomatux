import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from "react";

type Listener = (args: Location) => void;

export interface History {
  push: (location: string, state?: unknown) => void;
  listen: (listener: Listener) => void;
  destroy: () => void;
}

interface RouterCtxType {
  history: History | null;
  location: Location | null;
}

const __RouterContext = createContext<RouterCtxType>({
  history: null,
  location: null,
});

const RouterCtxProvider = __RouterContext.Provider;

export const useRouter = () => useContext(__RouterContext);

const routerHistory = createBrowserHistory();

export function BrowserRouter(props: PropsWithChildren) {
  const [location, setLocation] = useState(() => ({ ...window.location }));
  const [ctxValue, setCtxValue] = useState<RouterCtxType>({ history: null, location: null });

  const listener = (newLocation: Location): void => {
    setLocation(newLocation);
  };

  useEffect(() => {
    routerHistory.listen(listener);
  }, []);

  useEffect(
    () =>
      setCtxValue({
        history: routerHistory,
        location,
      }),
    [location],
  );

  return <RouterCtxProvider value={ctxValue}>{props.children}</RouterCtxProvider>;
}

function createBrowserHistory() {
  const listeners: Listener[] = [];

  function popstateLister() {
    const pathname = window.location.pathname;
    broadcastToListers(pathname);
  }

  window.addEventListener("popstate", popstateLister);

  function broadcastToListers(pathname: string) {
    const newLocation = { ...window.location, pathname };
    listeners.forEach((listen) => {
      listen(newLocation);
    });
  }

  return {
    push: (pathname: string, state?: unknown) => {
      if (state) {
        console.error("State transfer doesnt supported");
      }
      window.history.pushState(null, "", pathname);
      broadcastToListers(pathname);
    },

    listen: (listener: Listener) => {
      listeners.push(listener);
      return () => listeners.filter((l) => l !== listener);
    },

    destroy: () => {
      window.removeEventListener("popstate", popstateLister);
    },
  };
}
