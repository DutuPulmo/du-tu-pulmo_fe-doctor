import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { OverviewPage } from '@/pages/OverviewPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/doctor/overview" replace />} />
        <Route path="/doctor" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/doctor/overview" replace />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="*" element={<div>Not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
