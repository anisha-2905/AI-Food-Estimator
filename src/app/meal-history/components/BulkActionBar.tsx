'use client';

import React from 'react';
import { Trash2, X } from 'lucide-react';

interface Props {
  selectedCount: number;
  onDelete: () => void;
  onClear: () => void;
}

export default function BulkActionBar({ selectedCount, onDelete, onClear }: Props) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 slide-up">
      <div className="flex items-center gap-3 px-5 py-3 bg-foreground text-background rounded-2xl shadow-card-lg">
        <span className="text-sm font-semibold">
          {selectedCount} meal{selectedCount > 1 ? 's' : ''} selected
        </span>
        <div className="w-px h-4 bg-background/20" />
        <button
          onClick={onDelete}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-negative text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity btn-primary"
        >
          <Trash2 size={13} />
          Delete Selected
        </button>
        <button
          onClick={onClear}
          className="p-1.5 rounded-lg hover:bg-background/10 transition-colors"
          aria-label="Clear selection"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}