import React, {
  createContext,
  useMemo,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
  ReactElement,
} from "react";

type RouterCtxType = { history: any; location: any };

const __RouterContext = createContext<RouterCtxType>({
  history: null,
  location: null,
});

const RouterCtxProvider = __RouterContext.Provider;

const routerHistory = createBrowserHistory();

export const useRouter = () => useContext(__RouterContext);

export function BrowserRouter(props: PropsWithChildren) {
  const [location, setLocation] = useState(() => ({ ...window.location }));
  const [ctxValue, setCtxValue] = useState(null);

  useEffect(() => routerHistory.listen(setLocation), []);

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

export function Switch(props: PropsWithChildren) {
  const routerCtx = useRouter();

  const matchedChild = useMemo(() => {
    if (!routerCtx) return null;
    const path = routerCtx.location.pathname.toUpperCase();
    const child = props.children?.find((child) => child.props.path.toUpperCase() === path);

    return child || null;
  }, [routerCtx]);

  return <>{matchedChild}</>;
}

export interface RouteProps {
  component: ReactElement;
  path: string;
}

export function Route(props: RouteProps) {
  const routeCtx = useRouter();
  const { component: Component } = props;
  return <Component {...routeCtx} />;
}

export function Link(props) {
  const { to, ...rest } = props;
  const routerCtx = useRouter();

  function doNavigate(e) {
    e.preventDefault();
    routerCtx.history.push(to);
  }

  const classnames = useMemo(() => {
    const currentPath = routerCtx?.location?.pathname ?? "";
    if (currentPath.toUpperCase() === to.toUpperCase()) {
      return `${props.className ?? ""} ${props.activeClassName}`.trim();
    } else {
      return props.className;
    }
  }, [routerCtx]);

  return (
    <a href={to} onClick={doNavigate} className={classnames} {...rest}>
      {props.children}
    </a>
  );
}
export function Redirect(props) {
  const { to } = props;
  const route = useContext(__RouterContext);

  useEffect(() => {
    route.history.push(to);
  }, []);

  return null;
}

function createBrowserHistory() {
  const listeners = [];

  function popstateLister() {
    const pathname = window.location.pathname;
    broadcastToListers(pathname);
  }

  window.addEventListener("popstate", popstateLister);

  function broadcastToListers(pathname) {
    const newLocation = { ...window.location, pathname };
    listeners.forEach((listen) => {
      listen(newLocation);
    });
  }

  return {
    push: (pathname) => {
      window.history.pushState(null, null, pathname);
      broadcastToListers(pathname);
    },

    listen: (listener) => {
      listeners.push(listener);
      return () => listeners.filter((l) => l !== listener);
    },

    destroy: () => {
      window.removeEventListener("popstate", popstateLister);
    },
  };
}
