import React from 'react';
import { Utensils, Flame, TrendingUp, Tag } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const kpiCards = [
  {
    id: 'kpi-total-meals',
    label: 'Total Meals Analyzed',
    value: '64',
    unit: 'meals',
    change: '+8 this week',
    changePositive: true,
    icon: Utensils,
    iconBg: 'bg-blue-50 dark:bg-blue-950/40',
    iconColor: 'text-blue-600 dark:text-blue-400',
    span: 'col-span-1',
  },
  {
    id: 'kpi-today-calories',
    label: "Today\'s Estimated Calories",
    value: '1,085',
    unit: 'kcal',
    change: '915 kcal remaining',
    changePositive: true,
    icon: Flame,
    iconBg: 'bg-orange-50 dark:bg-orange-950/40',
    iconColor: 'text-orange-500',
    span: 'col-span-1',
    highlight: true,
  },
  {
    id: 'kpi-avg-calories',
    label: '7-Day Avg. Daily Calories',
    value: '1,932',
    unit: 'kcal/day',
    change: '+68 vs prior week',
    changePositive: false,
    icon: TrendingUp,
    iconBg: 'bg-teal-50 dark:bg-teal-950/40',
    iconColor: 'text-teal-600',
    span: 'col-span-1',
  },
  {
    id: 'kpi-top-category',
    label: 'Most Detected Category',
    value: 'Breakfast',
    unit: '18 detections',
    change: 'Followed by Salads (14)',
    changePositive: true,
    icon: Tag,
    iconBg: 'bg-purple-50 dark:bg-purple-950/40',
    iconColor: 'text-purple-600',
    span: 'col-span-1',
  },
];

export default function DashboardKPIGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpiCards?.map((card) => {
        const Icon = card?.icon;
        return (
          <div
            key={card?.id}
            className={`
              bg-card border border-border rounded-xl p-5 shadow-card card-hover
              ${card?.highlight ? 'ring-2 ring-primary/20' : ''}
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground leading-tight max-w-[140px]">
                {card?.label}
              </p>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${card?.iconBg}`}>
                <Icon size={18} className={card?.iconColor} />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 mb-1.5">
              <span className="metric-value text-3xl text-foreground">{card?.value}</span>
              <span className="text-xs text-muted-foreground font-medium">{card?.unit}</span>
            </div>
            <p className={`text-xs font-medium ${card?.changePositive ? 'text-positive' : 'text-negative'}`}>
              {card?.change}
            </p>
            {card?.highlight && (
              <div className="mt-3">
                <div className="flex justify-between text-2xs text-muted-foreground mb-1">
                  <span>Daily goal progress</span>
                  <span>54%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700"
                    style={{ width: '54%' }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}