import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const useAutoLogout = () => {
  const { logout, currentUser } = useAuth();
  const location = useLocation();
  const wasOnAdminPage = useRef(false);

  useEffect(() => {
    // Track if we're currently on admin page
    if (location.pathname === '/admin' && currentUser) {
      wasOnAdminPage.current = true;
    }
    
    // If we were on admin page and now we're not, logout
    if (wasOnAdminPage.current && location.pathname !== '/admin' && currentUser) {
      wasOnAdminPage.current = false;
      logout().catch((error) => {
        console.error("Auto-logout failed:", error);
      });
    }
  }, [location.pathname, currentUser, logout]);

  // Handle browser navigation away from the page
  useEffect(() => {
    if (location.pathname === '/admin' && currentUser) {
      const handleBeforeUnload = () => {
        // This will trigger when user closes tab, refreshes, or navigates away
        logout().catch(console.error);
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [location.pathname, currentUser, logout]);
};