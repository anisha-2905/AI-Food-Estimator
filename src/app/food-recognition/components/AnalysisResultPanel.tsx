'use client';

import React, { useState } from 'react';

import Badge from '@/components/ui/Badge';
import type { AnalysisResult } from './FoodRecognitionClient';
import { CheckCircle, Save, RefreshCw, Info, Leaf, Ruler } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface AnalysisResultPanelProps {
  result: AnalysisResult;
  onSave: () => void;
  savedToHistory: boolean;
  onAnalyzeAnother: () => void;
}

const categoryVariant: Record<string, 'green' | 'amber' | 'blue' | 'teal' | 'purple' | 'orange' | 'red'> = {
  Salad: 'green',
  Breakfast: 'amber',
  Pizza: 'red',
  Bowl: 'teal',
  Snack: 'blue',
  Dessert: 'purple',
  Tacos: 'orange',
};

function ConfidenceMeter({ value }: { value: number }) {
  const color = value >= 90 ? 'bg-positive' : value >= 75 ? 'bg-amber-500' : 'bg-negative';
  const label = value >= 90 ? 'High Confidence' : value >= 75 ? 'Moderate Confidence' : 'Low Confidence';
  const badgeVariant = value >= 90 ? 'green' : value >= 75 ? 'amber' : 'red';

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">Prediction Confidence</span>
        <Badge variant={badgeVariant as 'green' | 'amber' | 'red'}>{label}</Badge>
      </div>
      <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full confidence-bar-fill ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-2xs text-muted-foreground">0%</span>
        <span className="text-xs font-bold font-mono-nums text-foreground">{value.toFixed(1)}%</span>
        <span className="text-2xs text-muted-foreground">100%</span>
      </div>
    </div>
  );
}

interface MacroBarProps {
  label: string;
  value: number;
  unit: string;
  max: number;
  color: string;
  icon: React.ElementType;
}

function MacroBar({ label, value, unit, max, color, icon: Icon }: MacroBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon size={12} className={color} />
          <span className="text-xs text-muted-foreground font-medium">{label}</span>
        </div>
        <span className="text-xs font-bold font-mono-nums text-foreground">{value}g</span>
      </div>
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full macro-bar-fill`}
          style={{ width: `${pct}%`, backgroundColor: `var(${color.includes('positive') ? '--positive' : color.includes('amber') ? '--warning' : color.includes('info') ? '--info' : '--accent'})` }}
        />
      </div>
    </div>
  );
}

export default function AnalysisResultPanel({ result, onSave, savedToHistory, onAnalyzeAnother }: AnalysisResultPanelProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden slide-up">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border bg-positive/5">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle size={16} className="text-positive" />
          <span className="text-xs font-semibold text-positive uppercase tracking-wide">Analysis Complete</span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-foreground leading-tight">{result.foodName}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={categoryVariant[result.category] ?? 'gray'}>{result.category}</Badge>
              <span className="text-xs text-muted-foreground">{result.servingSize}</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-3xl font-bold metric-value text-foreground">{result.calories}</p>
            <p className="text-xs text-muted-foreground">kcal</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Confidence meter */}
        <ConfidenceMeter value={result.confidence} />

        {/* Macro breakdown */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Macronutrient Breakdown
          </p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {[
              { id: 'macro-cal', label: 'Calories', value: result.calories, unit: 'kcal', icon: '🔥', bg: 'bg-orange-50 dark:bg-orange-950/30', text: 'text-orange-600 dark:text-orange-400' },
              { id: 'macro-prot', label: 'Protein', value: result.protein, unit: 'g', icon: '💪', bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-600 dark:text-blue-400' },
              { id: 'macro-carb', label: 'Carbohydrates', value: result.carbs, unit: 'g', icon: '🌾', bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-600 dark:text-amber-400' },
              { id: 'macro-fat', label: 'Total Fat', value: result.fat, unit: 'g', icon: '🫙', bg: 'bg-teal-50 dark:bg-teal-950/30', text: 'text-teal-600 dark:text-teal-400' },
            ].map((m) => (
              <div key={m.id} className={`${m.bg} rounded-xl p-3`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-sm">{m.icon}</span>
                  <span className={`text-2xs font-semibold uppercase tracking-wide ${m.text}`}>{m.label}</span>
                </div>
                <p className={`text-xl font-bold metric-value ${m.text}`}>
                  {m.value}<span className="text-xs font-medium ml-0.5">{m.unit}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Fiber & serving */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Leaf size={12} className="text-positive" />
                <span className="text-2xs font-semibold uppercase tracking-wide text-muted-foreground">Fiber</span>
              </div>
              <p className="text-lg font-bold metric-value text-foreground">
                {result.fiber}<span className="text-xs font-medium ml-0.5">g</span>
              </p>
            </div>
            <div className="bg-muted/50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Ruler size={12} className="text-muted-foreground" />
                <span className="text-2xs font-semibold uppercase tracking-wide text-muted-foreground">Serving</span>
              </div>
              <p className="text-sm font-bold text-foreground leading-tight">{result.servingSize}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-3 py-3 bg-muted/30 rounded-xl border border-border">
          <div className="flex items-start gap-2">
            <Info size={13} className="text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">{result.description}</p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-2xs text-muted-foreground/80 italic">
          ⚠️ Values are AI-estimated approximations for educational purposes only. Not suitable for clinical or medical use.
        </p>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          {!savedToHistory ? (
            <button
              onClick={onSave}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 btn-primary transition-all duration-150 shadow-card"
            >
              <Save size={15} />
              Save to History
            </button>
          ) : (
            <div className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-positive/10 text-positive text-sm font-semibold rounded-lg border border-positive/30">
              <CheckCircle size={15} />
              Saved to History
            </div>
          )}
          <button
            onClick={onAnalyzeAnother}
            className="flex items-center gap-2 px-4 py-2.5 border border-border text-secondary-foreground text-sm font-medium rounded-lg hover:bg-secondary transition-colors duration-150"
          >
            <RefreshCw size={14} />
            New
          </button>
        </div>
      </div>
    </div>
  );
}