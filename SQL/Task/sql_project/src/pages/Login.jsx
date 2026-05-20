import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!identifier.trim() || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    // Small delay to simulate network request
    setTimeout(() => {
      const res = login(identifier.trim(), password);
      if (res.success) {
        navigate('/');
      } else {
        setError(res.error || 'Invalid credentials.');
      }
      setLoading(false);
    }, 450);
  };

  const handleAutofill = () => {
    setIdentifier('sql_learner');
    setPassword('sql123');
    setError('');
  };

  return (
    <div className="auth-page">
      <div className="grid-bg"></div>
      
      <div className="auth-container animate-fade-up">
        <div className="auth-header">
          <div className="auth-logo">&gt;_</div>
          <h1>Welcome to <span className="logo-highlight">SQL Forge</span></h1>
          <p>Login to query, learn, and master relational databases.</p>
        </div>

        <div className="glass-card auth-card">
          <h2 className="card-title">Sign In</h2>
          
          {error && (
            <div className="auth-error-message">
              <span className="error-icon">⚠</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="identifier">Username or Email</label>
              <input
                id="identifier"
                type="text"
                className="form-control"
                placeholder="Enter username or email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full btn-auth" disabled={loading}>
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          <div className="autofill-banner" onClick={handleAutofill}>
            <span className="autofill-sparkle">⚡</span>
            <span>Click here to auto-fill demo credentials</span>
          </div>

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
