import {
  setAccessToken,
  setRefreshToken,
  clearAuth
} from "../utils/authStorage";

// Mock user data
const MOCK_USER = {
  id: "mock-user-001",
  name: "Demo User",
  email: "demo@example.com"
};

// Helper: Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function login(data) {
  await delay(500); // Simulate API latency
  
  // Accept any credentials
  const response = {
    accessToken: "mock-access-token-" + Date.now(),
    refreshToken: "mock-refresh-token-" + Date.now(),
    user: MOCK_USER
  };

  setAccessToken(response.accessToken);
  setRefreshToken(response.refreshToken);
  
  return response;
}

export async function signup(data) {
  await delay(500);
  
  const response = {
    accessToken: "mock-access-token-" + Date.now(),
    refreshToken: "mock-refresh-token-" + Date.now(),
    user: { ...MOCK_USER, ...data }
  };

  setAccessToken(response.accessToken);
  setRefreshToken(response.refreshToken);
  
  return response;
}

export function logout() {
  clearAuth();
  window.location.href = "/login";
}
