'use client';

import React from 'react';
import { Search, Filter } from 'lucide-react';

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  categories: string[];
  totalCount: number;
}

const categoryColors: Record<string, string> = {
  All: 'bg-secondary text-secondary-foreground',
  Breakfast: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/40',
  Salad: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800/40',
  Bowl: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-400 dark:border-teal-800/40',
  Pizza: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800/40',
  Snack: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800/40',
  Dessert: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-800/40',
  Tacos: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800/40',
  'Smoothie Bowl': 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-400',
  Soup: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400',
  'Stir Fry': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400',
};

export default function MealHistoryFilters({ search, onSearchChange, category, onCategoryChange, categories, totalCount }: Props) {
  return (
    <div className="px-5 py-4 border-b border-border space-y-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search food name or category..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground text-foreground"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Filter size={13} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            <span className="font-semibold font-mono-nums text-foreground">{totalCount}</span> results
          </span>
        </div>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={`cat-chip-${cat}`}
            onClick={() => onCategoryChange(cat)}
            className={`
              px-2.5 py-1 text-xs font-medium rounded-full border transition-all duration-150
              ${category === cat
                ? cat === 'All' ?'bg-primary text-primary-foreground border-primary'
                  : `${categoryColors[cat]} border-current ring-1 ring-current ring-opacity-50`
                : `${categoryColors[cat] ?? 'bg-secondary text-secondary-foreground border-border'} opacity-70 hover:opacity-100`
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}