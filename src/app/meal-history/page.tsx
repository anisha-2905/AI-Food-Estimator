import React from 'react';
import AppLayout from '@/components/AppLayout';
import MealHistoryClient from './components/MealHistoryClient';

export default function MealHistoryPage() {
  return (
    <AppLayout>
      <div className="space-y-5 fade-in">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Meal History</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Browse all analyzed meals. Search, filter, and manage your food recognition history.
          </p>
        </div>
        <MealHistoryClient />
      </div>
    </AppLayout>
  );
}