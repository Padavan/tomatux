import * as React from 'react';
import { connect } from 'react-redux';
import { Routes, Route, Link } from "react-router-dom";
import { Timer } from './components/Timer';
import { Settings } from './components/Settings';
import { Statistics } from './components/Statistics';
import { About } from './components/About';
import { Snackbar } from './components/Snackbar';
import { Nav } from './components/Nav';

export const AppRouter = () => (
  <>
    <Nav />
    <Routes>
      <Route path="/" element={<Timer />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/about" element={<About />} />
    </Routes>
    <Snackbar />
  </>
);
