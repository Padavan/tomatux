import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import { Timer } from './components/Timer';
import { Settings } from './components/Settings';
import { Statistics } from './components/Statistics';
import { Snackbar } from './components/Snackbar';
import { Nav } from './components/Nav';

export const AppRouter = () => (
  <>
    <Nav />
    <Routes>
      <Route path="/" element={<Timer />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/statistics" element={<Statistics />} />
    </Routes>
    <Snackbar />
  </>
);
