'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { LayoutDashboard, Camera, History, ChevronLeft, ChevronRight, Info, BookOpen,  } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'nav-dashboard', label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { id: 'nav-food-recognition', label: 'Food Recognition', href: '/food-recognition', icon: Camera },
  { id: 'nav-meal-history', label: 'Meal History', href: '/meal-history', icon: History, badge: 3 },
];

const bottomNavItems: NavItem[] = [
  { id: 'nav-about', label: 'About Project', href: '/about', icon: Info },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full z-40 flex flex-col
        bg-card border-r border-border shadow-card sidebar-transition
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 px-3 border-b border-border ${collapsed ? 'justify-center' : 'gap-2'}`}>
        <AppLogo size={32} />
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-sm text-foreground leading-tight truncate">NutriVision</span>
            <span className="text-2xs text-muted-foreground font-medium">AI Food Estimator</span>
          </div>
        )}
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {!collapsed && (
          <p className="px-3 mb-2 text-2xs font-semibold uppercase tracking-widest text-muted-foreground">
            Main
          </p>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link key={item.id} href={item.href}>
              <div
                className={`nav-item relative group ${active ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span className="badge badge-green text-2xs px-1.5 py-0.5">{item.badge}</span>
                    )}
                  </>
                )}
                {collapsed && item.badge && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity duration-150">
                    {item.label}
                  </div>
                )}
              </div>
            </Link>
          );
        })}

        {!collapsed && (
          <p className="px-3 mt-4 mb-2 text-2xs font-semibold uppercase tracking-widest text-muted-foreground">
            Info
          </p>
        )}
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link key={item.id} href={item.href}>
              <div
                className={`nav-item relative group ${active ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity duration-150">
                    {item.label}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Disclaimer */}
      {!collapsed && (
        <div className="mx-2 mb-3 p-2.5 rounded-lg bg-warning/10 border border-warning/20">
          <div className="flex gap-2">
            <BookOpen size={13} className="text-warning shrink-0 mt-0.5" />
            <p className="text-2xs text-warning leading-relaxed">
              Educational purposes only. Nutritional values are approximate AI estimates.
            </p>
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <div className="px-2 pb-4">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center h-8 rounded-lg border border-border hover:bg-secondary transition-colors duration-150"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={14} className="text-muted-foreground" /> : <ChevronLeft size={14} className="text-muted-foreground" />}
        </button>
      </div>
    </aside>
  );
}