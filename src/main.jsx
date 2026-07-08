import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '30px', backgroundColor: '#09090b', color: '#f43f5e', minHeight: '100vh', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '24px' }}>🚨 React Runtime Error:</h2>
          <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#18181b', border: '1px solid #27272a', padding: '20px', borderRadius: '12px', color: '#fafafa', fontSize: '14px', margin: 0 }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#71717a', fontSize: '12px', overflowX: 'auto', margin: 0 }}>
            {this.state.error && this.state.error.stack}
          </pre>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              onClick={() => { localStorage.clear(); window.location.reload(); }}
              style={{ padding: '12px 24px', backgroundColor: '#f59e0b', color: '#09090b', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
            >
              Clear Storage & Reload
            </button>
            <button 
              onClick={() => window.location.reload()}
              style={{ padding: '12px 24px', backgroundColor: '#27272a', color: '#fafafa', border: '1px solid #3f3f46', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

if ("serviceWorker" in navigator) {
  // Always unregister service workers to prevent aggressive caching and blank white screens
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister().then((success) => {
        if (success) console.log("Successfully unregistered SW");
      });
    }
  });
}
