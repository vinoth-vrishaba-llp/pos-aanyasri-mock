import { useState } from "react";
import { login, signup, logout } from "../api/auth.api";
import { getAccessToken } from "../utils/authStorage";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function signIn(email, password) {
    setLoading(true);
    setError(null);
    try {
      await login({ email, password });
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Login failed";
      setError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function signUp(name, email, password) {
    setLoading(true);
    setError(null);
    try {
      await signup({ name, email, password });
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Signup failed";
      setError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }

  function isAuthenticated() {
    return !!getAccessToken();
  }

  return {
    signIn,
    signUp,
    logout,
    loading,
    error,
    isAuthenticated
  };
}
