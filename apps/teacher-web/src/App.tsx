import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { LessonsPage } from './pages/LessonsPage';
import { StudentsPage } from './pages/StudentsPage';
import { AssignmentsPage } from './pages/AssignmentsPage';
import { LoginPage } from './pages/LoginPage';
import { useAuthStore } from './stores/authStore';

export const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <Layout>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/lessons" element={<LessonsPage />} />
                  <Route path="/students" element={<StudentsPage />} />
                  <Route path="/assignments" element={<AssignmentsPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
