import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the authentication store
const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      // Set user data and authentication status
      setUser: (user) => set({ user, isAuthenticated: !!user }),

      // Set token in state and localStorage
      setToken: (token) => {
        set({ token });
        localStorage.setItem('authToken', token);  // Store token in localStorage
      },

      // Clear user and token when logging out
      clearAuth: () => {
        set({ user: null, isAuthenticated: false, token: null });
        localStorage.removeItem('authToken');  // Remove token on logout
      },

      // function: Get headers with Authorization token
      getAuthHeaders: () => {
        const token = get().token || localStorage.getItem('authToken');
        return token ? { Authorization: `Token ${token}` } : {};
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
