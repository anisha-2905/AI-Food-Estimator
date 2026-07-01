import React from 'react';
import AppLayout from '@/components/AppLayout';
import DashboardKPIGrid from './components/DashboardKPIGrid';
import WeeklyCalorieChart from './components/WeeklyCalorieChart';
import RecentMealsFeed from './components/RecentMealsFeed';
import DashboardHeader from './components/DashboardHeader';
import DisclaimerBanner from './components/DisclaimerBanner';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6 fade-in">
        <DisclaimerBanner />
        <DashboardHeader />
        <DashboardKPIGrid />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <WeeklyCalorieChart />
          </div>
          <div className="xl:col-span-1">
            <RecentMealsFeed />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}