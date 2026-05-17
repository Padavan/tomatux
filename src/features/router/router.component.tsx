import React, {
  useMemo,
  JSXElementConstructor,
  useEffect,
  ReactElement,
  MouseEventHandler,
} from "react";
import { useRouter } from "./router.provider";

export function Switch(props: { children: ReactElement[] }) {
  const routerCtx = useRouter();

  const matchedChild = useMemo(() => {
    if (!routerCtx) return null;
    const path = routerCtx.location?.pathname.toUpperCase();
    const child = props.children?.find((child) => child.props.path.toUpperCase() === path);

    return child || null;
  }, [routerCtx]);

  return <>{matchedChild}</>;
}

export interface RouteProps {
  component: JSXElementConstructor<any>;
  path: string;
}

export function Route(props: RouteProps) {
  const routeCtx = useRouter();
  const { component: Component } = props;
  if (!Component) return null;
  return <Component {...routeCtx} />;
}

export interface LinkProps extends React.AnchorHTMLAttributes<{}> {
  to: string;
  activeClassName?: string;
}

export function Link(props: LinkProps) {
  const { to, ...rest } = props;
  const routerCtx = useRouter();

  const doNavigate: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    routerCtx.history?.push(to);
  };

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

export function Redirect(props: { to: string }) {
  const { to } = props;
  const route = useRouter();

  useEffect(() => {
    route.history?.push(to);
  }, []);

  return null;
}
