'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { toast } from 'sonner';
import { mockMealHistory, type MealRecord } from '@/lib/mockData';
import MealHistoryFilters from './MealHistoryFilters';
import MealHistoryTable from './MealHistoryTable';
import MealDetailModal from './MealDetailModal';
import BulkActionBar from './BulkActionBar';
import MealHistorySummary from './MealHistorySummary';

export type SortField = 'foodName' | 'calories' | 'protein' | 'carbs' | 'fat' | 'confidence' | 'analyzedAt';
export type SortDir = 'asc' | 'desc';

const ALL_CATEGORIES = ['All', 'Breakfast', 'Salad', 'Bowl', 'Pizza', 'Snack', 'Dessert', 'Tacos', 'Smoothie Bowl', 'Soup', 'Stir Fry'];

export default function MealHistoryClient() {
  const [records, setRecords] = useState<MealRecord[]>(mockMealHistory);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortField, setSortField] = useState<SortField>('analyzedAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [detailMeal, setDetailMeal] = useState<MealRecord | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let data = records;
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (r) => r.foodName.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
      );
    }
    if (category !== 'All') {
      data = data.filter((r) => r.category === category);
    }
    data = [...data].sort((a, b) => {
      const va = a[sortField];
      const vb = b[sortField];
      if (typeof va === 'string' && typeof vb === 'string') {
        return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      return sortDir === 'asc' ? (va as number) - (vb as number) : (vb as number) - (va as number);
    });
    return data;
  }, [records, search, category, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const pageData = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleSort = useCallback((field: SortField) => {
    setSortField((prev) => {
      if (prev === field) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        return prev;
      }
      setSortDir('desc');
      return field;
    });
    setPage(1);
  }, []);

  const handleSelectRow = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedIds.size === pageData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(pageData.map((r) => r.id)));
    }
  }, [selectedIds.size, pageData]);

  const handleDeleteSingle = useCallback((id: string) => {
    setDeletingIds((prev) => new Set([...prev, id]));
    setTimeout(() => {
      setRecords((prev) => prev.filter((r) => r.id !== id));
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      toast.success('Meal record deleted');
    }, 350);
  }, []);

  const handleBulkDelete = useCallback(() => {
    const ids = [...selectedIds];
    ids.forEach((id) => {
      setDeletingIds((prev) => new Set([...prev, id]));
    });
    setTimeout(() => {
      setRecords((prev) => prev.filter((r) => !ids.includes(r.id)));
      setDeletingIds(new Set());
      setSelectedIds(new Set());
      toast.success(`${ids.length} meal record${ids.length > 1 ? 's' : ''} deleted`);
    }, 400);
  }, [selectedIds]);

  return (
    <div className="space-y-4">
      <MealHistorySummary records={records} />

      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <MealHistoryFilters
          search={search}
          onSearchChange={(v) => { setSearch(v); setPage(1); }}
          category={category}
          onCategoryChange={(v) => { setCategory(v); setPage(1); }}
          categories={ALL_CATEGORIES}
          totalCount={filtered.length}
        />

        <MealHistoryTable
          data={pageData}
          sortField={sortField}
          sortDir={sortDir}
          onSort={handleSort}
          selectedIds={selectedIds}
          onSelectRow={handleSelectRow}
          onSelectAll={handleSelectAll}
          onViewDetail={setDetailMeal}
          onDelete={handleDeleteSingle}
          deletingIds={deletingIds}
          allSelected={pageData.length > 0 && selectedIds.size === pageData.length}
        />

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3 border-t border-border bg-muted/20">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Showing</span>
            <span className="font-semibold text-foreground font-mono-nums">
              {filtered.length === 0 ? 0 : (currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)}
            </span>
            <span>of</span>
            <span className="font-semibold text-foreground font-mono-nums">{filtered.length}</span>
            <span>meals</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Per page:</span>
              <select
                value={perPage}
                onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                className="text-xs border border-border rounded-lg px-2 py-1 bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                {[5, 8, 10, 20].map((n) => (
                  <option key={`pp-${n}`} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(1)}
                disabled={currentPage === 1}
                className="px-2 py-1 text-xs border border-border rounded-lg hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                «
              </button>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 text-xs border border-border rounded-lg hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                .reduce<(number | 'ellipsis')[]>((acc, p, i, arr) => {
                  if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('ellipsis');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === 'ellipsis' ? (
                    <span key={`ellipsis-${i}`} className="px-1.5 text-xs text-muted-foreground">…</span>
                  ) : (
                    <button
                      key={`page-${p}`}
                      onClick={() => setPage(p as number)}
                      className={`w-7 h-7 text-xs rounded-lg transition-colors font-medium ${
                        currentPage === p
                          ? 'bg-primary text-primary-foreground'
                          : 'border border-border hover:bg-secondary text-foreground'
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-xs border border-border rounded-lg hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ›
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-xs border border-border rounded-lg hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk action bar */}
      <BulkActionBar
        selectedCount={selectedIds.size}
        onDelete={handleBulkDelete}
        onClear={() => setSelectedIds(new Set())}
      />

      {/* Detail modal */}
      {detailMeal && (
        <MealDetailModal
          meal={detailMeal}
          onClose={() => setDetailMeal(null)}
          onDelete={() => {
            handleDeleteSingle(detailMeal.id);
            setDetailMeal(null);
          }}
        />
      )}
    </div>
  );
}