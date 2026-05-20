import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [completedConcepts, setCompletedConcepts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize DB in LocalStorage and restore user session
  useEffect(() => {
    // Preseed mock users database if it doesn't exist
    const usersDb = localStorage.getItem('sql_users_db');
    if (!usersDb) {
      const defaultUsers = [
        { username: 'sql_learner', email: 'learner@sqlforge.com', password: 'sql123' },
        { username: 'admin', email: 'admin@sqlforge.com', password: 'admin123' }
      ];
      localStorage.setItem('sql_users_db', JSON.stringify(defaultUsers));
    }

    // Check for active session
    const activeSession = localStorage.getItem('sql_active_user');
    if (activeSession) {
      const parsedUser = JSON.parse(activeSession);
      setUser(parsedUser);
      
      // Load completed concepts for this user
      const userCompletions = localStorage.getItem(`sql_completed_${parsedUser.username}`) || '[]';
      setCompletedConcepts(JSON.parse(userCompletions));
    }
    setLoading(false);
  }, []);

  // Login action
  const login = (usernameOrEmail, password) => {
    const users = JSON.parse(localStorage.getItem('sql_users_db') || '[]');
    const matchedUser = users.find(
      u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
    );

    if (matchedUser) {
      const sessionUser = { username: matchedUser.username, email: matchedUser.email };
      localStorage.setItem('sql_active_user', JSON.stringify(sessionUser));
      setUser(sessionUser);

      // Load completions
      const userCompletions = localStorage.getItem(`sql_completed_${matchedUser.username}`) || '[]';
      setCompletedConcepts(JSON.parse(userCompletions));
      return { success: true };
    } else {
      return { success: false, error: 'Invalid username/email or password.' };
    }
  };

  // Register action
  const register = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem('sql_users_db') || '[]');
    
    // Check if user already exists
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      return { success: false, error: 'Username is already taken.' };
    }
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Email is already registered.' };
    }

    const newUser = { username, email, password };
    const updatedUsers = [...users, newUser];
    localStorage.setItem('sql_users_db', JSON.stringify(updatedUsers));

    return { success: true };
  };

  // Logout action
  const logout = () => {
    localStorage.removeItem('sql_active_user');
    setUser(null);
    setCompletedConcepts([]);
  };

  // Complete a concept tracker
  const toggleConceptComplete = (conceptId) => {
    if (!user) return;
    
    let updated;
    if (completedConcepts.includes(conceptId)) {
      updated = completedConcepts.filter(id => id !== conceptId);
    } else {
      updated = [...completedConcepts, conceptId];
    }
    
    setCompletedConcepts(updated);
    localStorage.setItem(`sql_completed_${user.username}`, JSON.stringify(updated));
  };

  const isCompleted = (conceptId) => completedConcepts.includes(conceptId);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, completedConcepts, toggleConceptComplete, isCompleted }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
