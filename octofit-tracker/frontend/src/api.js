// Utility function to get API base URL
export function getApiUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }
  
  // Fallback to localhost for local development
  return `http://localhost:8000`
}
