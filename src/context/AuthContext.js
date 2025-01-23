import React, { createContext, useState, useEffect } from 'react';
import { authService } from './apiService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user profile when the component mounts
    const fetchUserProfile = async () => {
      try {
        const profile = await authService.getUserProfile();
        setUser(profile);
      } catch (error) {
        authService.logout(); // Log out if fetching user fails (e.g., invalid token)
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading && children} {/* Only render children after loading */}
    </AuthContext.Provider>
  );
};
