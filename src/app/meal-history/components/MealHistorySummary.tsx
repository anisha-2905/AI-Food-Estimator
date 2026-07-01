import React from 'react';
import { type MealRecord } from '@/lib/mockData';

interface Props {
  records: MealRecord[];
}

export default function MealHistorySummary({ records }: Props) {
  const totalCalories = records.reduce((s, r) => s + r.calories, 0);
  const avgCalories = records.length ? Math.round(totalCalories / records.length) : 0;
  const avgProtein = records.length ? (records.reduce((s, r) => s + r.protein, 0) / records.length).toFixed(1) : '0';
  const avgConfidence = records.length ? (records.reduce((s, r) => s + r.confidence, 0) / records.length).toFixed(1) : '0';

  const stats = [
    { id: 'hs-total', label: 'Total Records', value: records.length.toString(), unit: 'meals' },
    { id: 'hs-avg-cal', label: 'Avg. Calories/Meal', value: avgCalories.toLocaleString(), unit: 'kcal' },
    { id: 'hs-avg-prot', label: 'Avg. Protein/Meal', value: avgProtein, unit: 'g' },
    { id: 'hs-avg-conf', label: 'Avg. AI Confidence', value: avgConfidence, unit: '%' },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.id} className="bg-card border border-border rounded-xl px-4 py-3 shadow-card">
          <p className="text-2xs font-semibold uppercase tracking-wide text-muted-foreground">{s.label}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold metric-value text-foreground">{s.value}</span>
            <span className="text-xs text-muted-foreground">{s.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
}