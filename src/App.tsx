import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { SummaryPage } from './pages/SummaryPage';
import { UserDetailPage } from './pages/UserDetailPage';
import { LogPage } from './pages/LogPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-h-screen bg-[#f5f5f5]">
          <Routes>
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/user-detail" element={<UserDetailPage />} />
            <Route path="/log" element={<LogPage />} />
            <Route path="*" element={<Navigate to="/summary" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}