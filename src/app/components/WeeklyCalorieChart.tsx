'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer,  } from 'recharts';
import { weeklyCalorieData } from '@/lib/mockData';
import { TrendingDown } from 'lucide-react';

// Backend integration: replace weeklyCalorieData with API call to /api/meals/weekly-summary

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const calories = payload.find((p) => p.name === 'calories')?.value ?? 0;
  const goal = payload.find((p) => p.name === 'goal')?.value ?? 2000;
  const diff = calories - goal;
  return (
    <div className="bg-card border border-border rounded-xl shadow-card-lg px-4 py-3 min-w-[160px]">
      <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span className="text-xs text-muted-foreground">Calories</span>
          <span className="text-xs font-semibold font-mono-nums text-foreground">{calories.toLocaleString()} kcal</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-xs text-muted-foreground">Goal</span>
          <span className="text-xs font-mono-nums text-muted-foreground">2,000 kcal</span>
        </div>
        <div className="pt-1 border-t border-border">
          <span className={`text-xs font-semibold ${diff > 0 ? 'text-negative' : 'text-positive'}`}>
            {diff > 0 ? `+${diff}` : diff} kcal vs goal
          </span>
        </div>
      </div>
    </div>
  );
}

export default function WeeklyCalorieChart() {
  const avgCalories = Math.round(
    weeklyCalorieData.reduce((s, d) => s + d.calories, 0) / weeklyCalorieData.length
  );
  const overGoalDays = weeklyCalorieData.filter((d) => d.calories > d.goal).length;

  return (
    <div className="bg-card border border-border rounded-xl shadow-card p-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground">Weekly Calorie Intake</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Mon Jun 25 – Sun Jul 1, 2026</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Weekly Avg</p>
            <p className="text-lg font-bold metric-value text-foreground">{avgCalories.toLocaleString()}</p>
            <p className="text-2xs text-muted-foreground">kcal/day</p>
          </div>
          {overGoalDays > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800/50">
              <TrendingDown size={13} className="text-amber-600" />
              <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
                {overGoalDays}d over goal
              </span>
            </div>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={weeklyCalorieData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="calorieGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="goalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--muted-foreground)" stopOpacity={0.1} />
              <stop offset="95%" stopColor="var(--muted-foreground)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
            domain={[1000, 2500]}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={2000}
            stroke="var(--warning)"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{ value: 'Goal', fontSize: 10, fill: 'var(--warning)', position: 'right' }}
          />
          <Area
            type="monotone"
            dataKey="goal"
            stroke="var(--border)"
            strokeWidth={1.5}
            fill="url(#goalGradient)"
            strokeDasharray="4 4"
            dot={false}
            name="goal"
          />
          <Area
            type="monotone"
            dataKey="calories"
            stroke="var(--primary)"
            strokeWidth={2.5}
            fill="url(#calorieGradient)"
            dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 2, stroke: 'var(--card)' }}
            activeDot={{ r: 6, fill: 'var(--primary)', strokeWidth: 2, stroke: 'var(--card)' }}
            name="calories"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-primary rounded" />
          <span className="text-xs text-muted-foreground">Actual intake</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 border-t-2 border-dashed border-border rounded" />
          <span className="text-xs text-muted-foreground">Daily goal (2,000 kcal)</span>
        </div>
      </div>
    </div>
  );
}