import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RegisterForm } from './components/RegisterForm';
import { LoginForm } from './components/LoginForm';
import TraineeDashboard from './components/TraineeDashboard';
import TrainerDashboard from './components/TrainerDashboard';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

// RTL קונפיגורציה בשביל
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// יצירת ערכת נושא מותאמת עם תמיכה ב-RTL
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: [
      'Rubik',
      'Arial',
      'sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>טוען...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const DashboardRouter: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return user.user_type === 'trainer' ? <TrainerDashboard /> : <TraineeDashboard />;
};

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider 
          maxSnack={3} 
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardRouter />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/" 
                  element={<Navigate to="/dashboard" replace />} 
                />
              </Routes>
            </Router>
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
