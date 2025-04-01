import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
// import LifterPage from './pages/LifterPage';
// import DashboardPage from './pages/DashboardPage';
import { useState } from 'react';
import reactLogo from './assets/logo.svg';
import viteLogo from '/vite.svg';
import './App.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, 
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            {/* <Route path="lifters/:name" element={<LifterPage />} /> */}
            {/* <Route path="dashboard" element={<DashboardPage />} /> */}
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App
