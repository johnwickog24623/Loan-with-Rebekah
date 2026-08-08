"use client";

import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";

interface SearchParamsProps {
  searchParams: Promise<{ code?: string; status?: string; message?: string; email?: string }>;
}

export default function AdminPage(props: SearchParamsProps) {
  const searchParams = use(props.searchParams);
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [connectedEmail, setConnectedEmail] = useState<string | null>(searchParams?.email || null);
  const [isConnected, setIsConnected] = useState<boolean>(searchParams?.status === "connected");
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [authRes, statusRes] = await Promise.all([
          fetch(`${backendUrl}/api/v1/google/login`),
          fetch(`${backendUrl}/api/v1/google/status`)
        ]);
        if (authRes.ok) {
          const authBody = await authRes.json();
          if (authBody?.data?.auth_url) {
            setAuthUrl(authBody.data.auth_url);
          }
        }
        if (statusRes.ok) {
          const statusBody = await statusRes.json();
          if (statusBody?.data?.connected) {
            setIsConnected(true);
            if (statusBody.data.google_email) {
              setConnectedEmail(statusBody.data.google_email);
            }
          }
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to connect to backend server";
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [backendUrl]);

  const handleConnect = () => {
    if (!authUrl) return;
    setConnecting(true);
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-ink text-text py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-champagne bg-surface-raised px-4 py-1.5 rounded-full border border-line">
            Admin Console
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-text">
            Google Calendar Integration
          </h1>
          <p className="text-muted text-base max-w-xl mx-auto">
            Authorize your Google Account to allow the AI voice assistant to seamlessly inspect availability and schedule appointments on your calendar.
          </p>
        </motion.div>

        {isConnected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-500/20 px-2.5 py-0.5 rounded-md">
                  Active Connection
                </span>
                <h3 className="font-semibold text-emerald-950 text-base mt-1">Connected Google Account</h3>
                <p className="text-sm font-medium text-emerald-800">
                  {connectedEmail ? connectedEmail : "Google Calendar Active"}
                </p>
              </div>
            </div>
            <button
              onClick={handleConnect}
              className="px-4 py-2 text-xs font-semibold text-emerald-900 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              Reconnect
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="light-glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-lg">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-surface rounded-2xl shadow-sm border border-line">
                  <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-text">Google Workspace Sync</h2>
                  <p className="text-xs text-muted">OAuth 2.0 Offline Calendar Access</p>
                </div>
              </div>
              <p className="text-sm text-text/80 leading-relaxed">
                Connect your business Google Calendar account to enable real-time booking, slot validation, and automatic customer calendar invite dispatch.
              </p>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  <span>Automated Calendar Invites</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  <span>Real-time Slot Checking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  <span>Fernet Encrypted Tokens</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  <span>Instant Revocation Control</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-full md:w-auto shrink-0 space-y-4">
              {loading ? (
                <div className="flex items-center space-x-3 px-6 py-4 rounded-2xl bg-surface-raised border border-line text-sm font-medium text-muted">
                  <svg className="animate-spin h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Checking Status...</span>
                </div>
              ) : error ? (
                <div className="text-center space-y-2">
                  <p className="text-xs text-rose-600 bg-rose-50 px-4 py-2 rounded-xl border border-rose-200">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-xs font-semibold text-accent underline hover:text-text cursor-pointer"
                  >
                    Retry Connection
                  </button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConnect}
                  disabled={connecting}
                  className="w-full sm:w-auto px-8 py-4 bg-jet text-white font-medium text-sm rounded-2xl shadow-lg hover:bg-accent transition-colors flex items-center justify-center space-x-3 cursor-pointer"
                >
                  {connecting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Redirecting to Google...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>{isConnected ? "Reconnect Account" : "Connect Google Account"}</span>
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-surface border border-line rounded-2xl space-y-2">
            <h3 className="font-semibold text-sm text-text">1. Grant Consent</h3>
            <p className="text-xs text-muted">Authenticate via Google OAuth consent screen with offline calendar permissions.</p>
          </div>
          <div className="p-6 bg-surface border border-line rounded-2xl space-y-2">
            <h3 className="font-semibold text-sm text-text">2. Receive Tokens</h3>
            <p className="text-xs text-muted">Backend securely exchanges code for access token and base64 Fernet encrypted refresh token.</p>
          </div>
          <div className="p-6 bg-surface border border-line rounded-2xl space-y-2">
            <h3 className="font-semibold text-sm text-text">3. Auto Sync</h3>
            <p className="text-xs text-muted">Appointments booked via Vapi AI automatically update your live Google Calendar.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
