'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menu, Sun, Moon, Bell, Camera } from 'lucide-react';

interface TopbarProps {
  onMenuToggle?: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

const breadcrumbMap: Record<string, string> = {
  '/': 'Dashboard',
  '/food-recognition': 'Food Recognition',
  '/meal-history': 'Meal History',
  '/about': 'About Project',
};

export default function Topbar({ onMenuToggle, isDark, onThemeToggle }: TopbarProps) {
  const pathname = usePathname();
  const pageName = breadcrumbMap[pathname] ?? 'NutriVision AI';

  return (
    <header className="fixed top-0 right-0 left-0 h-16 z-30 bg-card border-b border-border flex items-center px-4 gap-3">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors duration-150"
        aria-label="Toggle menu"
      >
        <Menu size={20} className="text-muted-foreground" />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-semibold text-foreground truncate">{pageName}</h1>
        <p className="text-2xs text-muted-foreground hidden sm:block">
          NutriVision AI · Educational Food Recognition
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Quick analyze */}
        <Link href="/food-recognition">
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 btn-primary transition-all duration-150">
            <Camera size={14} />
            <span>Analyze</span>
          </button>
        </Link>

        {/* Theme toggle */}
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-lg hover:bg-secondary transition-colors duration-150"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun size={18} className="text-muted-foreground" />
          ) : (
            <Moon size={18} className="text-muted-foreground" />
          )}
        </button>

        {/* Notifications placeholder */}
        <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors duration-150" aria-label="Notifications">
          <Bell size={18} className="text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
          S
        </div>
      </div>
    </header>
  );
}