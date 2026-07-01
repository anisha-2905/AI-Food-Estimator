'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('nutrivision-theme');
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const handleThemeToggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nutrivision-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nutrivision-theme', 'light');
    }
  };

  const sidebarWidth = sidebarCollapsed ? 64 : 240;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — desktop always visible, mobile conditional */}
      <div className={`hidden lg:block`}>
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((v) => !v)} />
      </div>

      {/* Mobile sidebar */}
      <div
        className={`
          lg:hidden fixed inset-y-0 left-0 z-40 sidebar-transition
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
      </div>

      {/* Topbar */}
      <div
        className="sidebar-transition"
        style={{ paddingLeft: `${sidebarWidth}px` }}
      >
        <div className="lg:hidden" style={{ paddingLeft: 0 }}>
          <Topbar onMenuToggle={() => setMobileOpen((v) => !v)} isDark={isDark} onThemeToggle={handleThemeToggle} />
        </div>
        <div className="hidden lg:block">
          <Topbar isDark={isDark} onThemeToggle={handleThemeToggle} />
        </div>
      </div>

      {/* Main content */}
      <main
        className="pt-16 min-h-screen sidebar-transition"
        style={{ paddingLeft: `${sidebarWidth}px` }}
      >
        <div className="p-6 max-w-screen-2xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}