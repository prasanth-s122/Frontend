import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import ConceptDetail from './pages/ConceptDetail';
import './App.css';

// Protected Route Guard: Allows only authenticated users
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="auth-page">
        <div className="grid-bg"></div>
        <div style={{ textAlign: 'center', fontSize: '1.2rem', fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'inline-block', animation: 'pulse 1.5s infinite', fontWeight: 'bold' }}>Loading SQL Forge...</span>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Auth Route Guard: Prevents logged in users from seeing login/register again
const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="auth-page">
        <div className="grid-bg"></div>
        <div style={{ textAlign: 'center', fontSize: '1.2rem', fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'inline-block', animation: 'pulse 1.5s infinite', fontWeight: 'bold' }}>Loading SQL Forge...</span>
        </div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* Auth Routes */}
          <Route 
            path="/login" 
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <AuthRoute>
                <Register />
              </AuthRoute>
            } 
          />

          {/* Protected Learning Workspace Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Landing />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/concept/:id" 
            element={
              <ProtectedRoute>
                <ConceptDetail />
              </ProtectedRoute>
            } 
          />

          {/* Fallback Wildcard redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
