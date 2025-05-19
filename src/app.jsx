import * as React from 'react';
import { HashRouter } from "react-router-dom";
import { ConfigProvider } from './providers/config.provider';
import { Layout } from './pages/layout';

export function App() {
  return (
    <HashRouter>
      <ConfigProvider>
        <Layout />
      </ConfigProvider>
    </HashRouter>
  );
};