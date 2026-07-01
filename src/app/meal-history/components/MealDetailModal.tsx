'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import AppImage from '@/components/ui/AppImage';
import Badge from '@/components/ui/Badge';
import { type MealRecord } from '@/lib/mockData';
import { Trash2, AlertTriangle } from 'lucide-react';

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

interface Props {
  meal: MealRecord;
  onClose: () => void;
  onDelete: () => void;
}

export default function MealDetailModal({ meal, onClose, onDelete }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dt = new Date(meal.analyzedAt);
  const dateStr = dt.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const macros = [
    { id: 'dm-cal', label: 'Calories', value: meal.calories, unit: 'kcal', color: 'text-orange-500' },
    { id: 'dm-prot', label: 'Protein', value: meal.protein, unit: 'g', color: 'text-blue-500' },
    { id: 'dm-carb', label: 'Carbohydrates', value: meal.carbs, unit: 'g', color: 'text-amber-500' },
    { id: 'dm-fat', label: 'Total Fat', value: meal.fat, unit: 'g', color: 'text-teal-500' },
    { id: 'dm-fiber', label: 'Dietary Fiber', value: meal.fiber, unit: 'g', color: 'text-positive' },
  ];

  const confidenceColor = meal.confidence >= 90 ? 'bg-positive' : meal.confidence >= 75 ? 'bg-amber-500' : 'bg-negative';

  return (
    <Modal open onClose={onClose} title="Meal Analysis Details" size="lg">
      {!confirmDelete ? (
        <div className="space-y-5">
          {/* Image + header */}
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted shrink-0">
              <AppImage
                src={meal.imageUrl}
                alt={meal.imageAlt}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground leading-tight">{meal.foodName}</h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge variant={categoryVariant[meal.category] ?? 'gray'}>{meal.category}</Badge>
                <span className="text-xs text-muted-foreground">{meal.servingSize}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{dateStr} at {timeStr}</p>
            </div>
          </div>

          {/* Confidence */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground font-medium">AI Prediction Confidence</span>
              <span className="font-bold font-mono-nums text-foreground">{meal.confidence.toFixed(1)}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full confidence-bar-fill ${confidenceColor}`}
                style={{ width: `${meal.confidence}%` }}
              />
            </div>
          </div>

          {/* Macros grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {macros.map((m) => (
              <div key={m.id} className="bg-muted/50 rounded-xl p-3 text-center">
                <p className="text-2xs text-muted-foreground font-medium mb-1">{m.label}</p>
                <p className={`text-lg font-bold metric-value ${m.color}`}>
                  {m.value}
                </p>
                <p className="text-2xs text-muted-foreground">{m.unit}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="px-4 py-3 bg-muted/30 rounded-xl border border-border">
            <p className="text-xs text-muted-foreground leading-relaxed">{meal.description}</p>
          </div>

          {/* Disclaimer */}
          <p className="text-2xs text-muted-foreground/70 italic">
            ⚠️ These values are AI-estimated approximations for educational purposes only.
          </p>

          {/* Actions */}
          <div className="flex justify-between items-center pt-1 border-t border-border">
            <button
              onClick={() => setConfirmDelete(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-negative border border-negative/20 rounded-lg hover:bg-negative/5 transition-colors duration-150"
            >
              <Trash2 size={13} />
              Delete Record
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-border transition-colors duration-150"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-center py-4">
          <div className="w-14 h-14 rounded-full bg-negative/10 flex items-center justify-center mx-auto">
            <AlertTriangle size={24} className="text-negative" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground mb-1">Delete this meal record?</h3>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{meal.foodName}</span> will be permanently removed from your meal history. This cannot be undone.
            </p>
          </div>
          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => setConfirmDelete(false)}
              className="px-5 py-2 text-sm font-medium border border-border rounded-lg hover:bg-secondary transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="px-5 py-2 text-sm font-semibold bg-negative text-white rounded-lg hover:opacity-90 btn-primary transition-all duration-150"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}