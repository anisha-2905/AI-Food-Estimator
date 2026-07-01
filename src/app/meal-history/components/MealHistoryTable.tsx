'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Badge from '@/components/ui/Badge';
import { type MealRecord } from '@/lib/mockData';
import type { SortField, SortDir } from './MealHistoryClient';
import { ArrowUpDown, Eye, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import { Search } from 'lucide-react';

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

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
  };
}

function ConfidenceBadge({ value }: { value: number }) {
  if (value >= 90) return <Badge variant="green" dot>{value.toFixed(1)}%</Badge>;
  if (value >= 75) return <Badge variant="amber" dot>{value.toFixed(1)}%</Badge>;
  return <Badge variant="red" dot>{value.toFixed(1)}%</Badge>;
}

interface SortHeaderProps {
  label: string;
  field: SortField;
  currentField: SortField;
  currentDir: SortDir;
  onSort: (f: SortField) => void;
}

function SortHeader({ label, field, currentField, currentDir, onSort }: SortHeaderProps) {
  const active = currentField === field;
  return (
    <button
      onClick={() => onSort(field)}
      className="flex items-center gap-1 group hover:text-foreground transition-colors duration-150"
    >
      <span className={active ? 'text-foreground font-semibold' : ''}>{label}</span>
      <span className="text-muted-foreground">
        {active ? (
          currentDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
        ) : (
          <ArrowUpDown size={11} className="opacity-40 group-hover:opacity-70" />
        )}
      </span>
    </button>
  );
}

interface Props {
  data: MealRecord[];
  sortField: SortField;
  sortDir: SortDir;
  onSort: (f: SortField) => void;
  selectedIds: Set<string>;
  onSelectRow: (id: string) => void;
  onSelectAll: () => void;
  onViewDetail: (meal: MealRecord) => void;
  onDelete: (id: string) => void;
  deletingIds: Set<string>;
  allSelected: boolean;
}

export default function MealHistoryTable({
  data,
  sortField,
  sortDir,
  onSort,
  selectedIds,
  onSelectRow,
  onSelectAll,
  onViewDetail,
  onDelete,
  deletingIds,
  allSelected,
}: Props) {
  if (data.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title="No meals found"
        description="No meal records match your current search or filter. Try adjusting your search query or selecting a different category."
        action={{ label: 'Clear Filters', onClick: () => {} }}
      />
    );
  }

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full text-sm min-w-[900px]">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="px-4 py-3 text-left w-10">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
                className="rounded border-border accent-primary cursor-pointer"
                aria-label="Select all rows"
              />
            </th>
            <th className="px-4 py-3 text-left w-14">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Image</span>
            </th>
            <th className="px-4 py-3 text-left">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <SortHeader label="Food Name" field="foodName" currentField={sortField} currentDir={sortDir} onSort={onSort} />
              </span>
            </th>
            <th className="px-4 py-3 text-left">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</span>
            </th>
            <th className="px-4 py-3 text-right">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <SortHeader label="Calories" field="calories" currentField={sortField} currentDir={sortDir} onSort={onSort} />
              </span>
            </th>
            <th className="px-4 py-3 text-right">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <SortHeader label="Protein" field="protein" currentField={sortField} currentDir={sortDir} onSort={onSort} />
              </span>
            </th>
            <th className="px-4 py-3 text-right">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <SortHeader label="Carbs" field="carbs" currentField={sortField} currentDir={sortDir} onSort={onSort} />
              </span>
            </th>
            <th className="px-4 py-3 text-right">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <SortHeader label="Fat" field="fat" currentField={sortField} currentDir={sortDir} onSort={onSort} />
              </span>
            </th>
            <th className="px-4 py-3 text-center">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <SortHeader label="Confidence" field="confidence" currentField={sortField} currentDir={sortDir} onSort={onSort} />
              </span>
            </th>
            <th className="px-4 py-3 text-left">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <SortHeader label="Date & Time" field="analyzedAt" currentField={sortField} currentDir={sortDir} onSort={onSort} />
              </span>
            </th>
            <th className="px-4 py-3 text-center w-20">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((meal, idx) => {
            const { date, time } = formatDateTime(meal.analyzedAt);
            const isDeleting = deletingIds.has(meal.id);
            const isSelected = selectedIds.has(meal.id);
            return (
              <tr
                key={meal.id}
                className={`
                  border-b border-border group transition-all duration-300
                  ${isDeleting ? 'opacity-0 scale-y-0 max-h-0 overflow-hidden' : 'opacity-100'}
                  ${isSelected ? 'bg-primary/5' : idx % 2 === 0 ? 'bg-transparent' : 'bg-muted/20'}
                  hover:bg-muted/40
                `}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelectRow(meal.id)}
                    className="rounded border-border accent-primary cursor-pointer"
                    aria-label={`Select ${meal.foodName}`}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                    <AppImage
                      src={meal.imageUrl}
                      alt={meal.imageAlt}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground max-w-[180px] truncate" title={meal.foodName}>
                    {meal.foodName}
                  </p>
                  <p className="text-2xs text-muted-foreground mt-0.5">{meal.servingSize}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={categoryVariant[meal.category] ?? 'gray'}>{meal.category}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-semibold font-mono-nums text-foreground">{meal.calories}</span>
                  <span className="text-2xs text-muted-foreground ml-0.5">kcal</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-mono-nums text-foreground">{meal.protein}</span>
                  <span className="text-2xs text-muted-foreground ml-0.5">g</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-mono-nums text-foreground">{meal.carbs}</span>
                  <span className="text-2xs text-muted-foreground ml-0.5">g</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-mono-nums text-foreground">{meal.fat}</span>
                  <span className="text-2xs text-muted-foreground ml-0.5">g</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <ConfidenceBadge value={meal.confidence} />
                </td>
                <td className="px-4 py-3">
                  <p className="text-xs text-foreground font-medium">{date}</p>
                  <p className="text-2xs text-muted-foreground mt-0.5">{time}</p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <div className="relative group/btn">
                      <button
                        onClick={() => onViewDetail(meal)}
                        className="p-1.5 rounded-lg hover:bg-info/10 text-muted-foreground hover:text-info transition-colors duration-150"
                        aria-label={`View details for ${meal.foodName}`}
                      >
                        <Eye size={14} />
                      </button>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-foreground text-background text-2xs rounded-md opacity-0 group-hover/btn:opacity-100 pointer-events-none whitespace-nowrap z-10 transition-opacity">
                        View details
                      </div>
                    </div>
                    <div className="relative group/btn">
                      <button
                        onClick={() => onDelete(meal.id)}
                        className="p-1.5 rounded-lg hover:bg-negative/10 text-muted-foreground hover:text-negative transition-colors duration-150"
                        aria-label={`Delete ${meal.foodName}`}
                      >
                        <Trash2 size={14} />
                      </button>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-foreground text-background text-2xs rounded-md opacity-0 group-hover/btn:opacity-100 pointer-events-none whitespace-nowrap z-10 transition-opacity">
                        Delete record
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}