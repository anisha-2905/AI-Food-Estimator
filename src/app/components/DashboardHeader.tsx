import React from 'react';
import Link from 'next/link';
import { Camera, TrendingUp } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Nutrition Overview</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Tuesday, July 1, 2026 · 12 meals analyzed this week
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-positive/10 rounded-lg">
          <TrendingUp size={14} className="text-positive" />
          <span className="text-xs font-medium text-positive">7-day streak</span>
        </div>
        <Link href="/food-recognition">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 btn-primary shadow-card transition-all duration-150 pulse-green">
            <Camera size={16} />
            Analyze New Meal
          </button>
        </Link>
      </div>
    </div>
  );
}