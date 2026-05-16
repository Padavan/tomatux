import * as React from "react";
import { Link } from "../router";
import "./nav.styles.css";

export function Nav() {
  return (
    <nav>
      <Link to="/" activeClassName="active">
        Pomodoro
      </Link>
      <Link to="/settings" activeClassName="active">
        Settings
      </Link>
      <Link to="/statistics" activeClassName="active">
        Statistics
      </Link>
    </nav>
  );
}
