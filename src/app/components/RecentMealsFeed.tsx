import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { mockMealHistory } from '@/lib/mockData';
import { ArrowRight, Clock } from 'lucide-react';
import Badge from '@/components/ui/Badge';

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const categoryVariant: Record<string, 'green' | 'amber' | 'blue' | 'teal' | 'purple' | 'orange' | 'red'> = {
  Salad: 'green',
  Breakfast: 'amber',
  Pizza: 'red',
  Bowl: 'teal',
  Snack: 'blue',
  Dessert: 'purple',
  Tacos: 'orange',
  'Smoothie Bowl': 'teal',
  Soup: 'blue',
  'Stir Fry': 'green',
};

const recentMeals = mockMealHistory.slice(0, 5);

export default function RecentMealsFeed() {
  return (
    <div className="bg-card border border-border rounded-xl shadow-card h-full flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h3 className="text-base font-semibold text-foreground">Recent Analyses</h3>
        <Link href="/meal-history">
          <button className="flex items-center gap-1 text-xs font-medium text-primary hover:underline transition-colors">
            View all <ArrowRight size={12} />
          </button>
        </Link>
      </div>

      <div className="flex-1 divide-y divide-border overflow-y-auto scrollbar-thin">
        {recentMeals.map((meal) => (
          <div key={meal.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors duration-150 group">
            <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-muted">
              <AppImage
                src={meal.imageUrl}
                alt={meal.imageAlt}
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate leading-tight">{meal.foodName}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant={categoryVariant[meal.category] ?? 'gray'} className="text-2xs">
                  {meal.category}
                </Badge>
                <span className="text-xs text-muted-foreground font-mono-nums">{meal.calories} kcal</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-2xs text-muted-foreground font-medium">{formatDate(meal.analyzedAt)}</p>
              <div className="flex items-center gap-1 justify-end mt-0.5">
                <Clock size={10} className="text-muted-foreground" />
                <p className="text-2xs text-muted-foreground">{formatTime(meal.analyzedAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-border">
        <Link href="/food-recognition">
          <button className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors duration-150">
            + Analyze New Meal
          </button>
        </Link>
      </div>
    </div>
  );
}