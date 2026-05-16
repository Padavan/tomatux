import * as React from "react";
import { ConfigProvider } from "./providers/config.provider";
import { ToastProvider } from "./providers/toast.provider";
import { TimerProvider } from "./providers/timer.provider";
import { Layout } from "./pages/layout";
import { BrowserRouter } from "./features/router";

export function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <ToastProvider>
          <TimerProvider>
            <Layout />
          </TimerProvider>
        </ToastProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}
