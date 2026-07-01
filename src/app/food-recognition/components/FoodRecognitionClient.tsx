'use client';

import React, { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import ImageUploadZone from './ImageUploadZone';
import AnalysisResultPanel from './AnalysisResultPanel';
import ProcessingState from './ProcessingState';
import { foodClassificationResults, type MealRecord } from '@/lib/mockData';

export type AnalysisState = 'idle' | 'uploaded' | 'processing' | 'complete' | 'error';

export interface AnalysisResult {
  foodName: string;
  confidence: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  servingSize: string;
  category: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

// Backend integration: replace this with POST /api/analyze-food with FormData containing the image

function simulateAnalysis(imageUrl: string): Promise<AnalysisResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomResult = foodClassificationResults[Math.floor(imageUrl.length % foodClassificationResults.length)];
      resolve({
        ...randomResult,
        imageUrl,
        imageAlt: 'User uploaded food image for AI analysis',
      });
    }, 2800);
  });
}

export default function FoodRecognitionClient() {
  const [state, setState] = useState<AnalysisState>('idle');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [savedToHistory, setSavedToHistory] = useState(false);

  const handleImageSelected = useCallback((url: string) => {
    setPreviewUrl(url);
    setResult(null);
    setSavedToHistory(false);
    setState('uploaded');
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!previewUrl) return;
    setState('processing');
    try {
      const analysisResult = await simulateAnalysis(previewUrl);
      setResult(analysisResult);
      setState('complete');
    } catch {
      setState('error');
      toast.error('Analysis failed. Please try uploading the image again.');
    }
  }, [previewUrl]);

  const handleSaveToHistory = useCallback(() => {
    if (!result) return;
    // Backend integration: POST /api/meals with result payload to persist to database
    setSavedToHistory(true);
    toast.success(`${result.foodName} saved to meal history!`);
  }, [result]);

  const handleReset = useCallback(() => {
    setState('idle');
    setPreviewUrl(null);
    setResult(null);
    setSavedToHistory(false);
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
      {/* Left panel: upload */}
      <div className="space-y-4">
        <ImageUploadZone
          previewUrl={previewUrl}
          state={state}
          onImageSelected={handleImageSelected}
          onReset={handleReset}
          onAnalyze={handleAnalyze}
        />
        {/* AI Workflow Steps */}
        <AIWorkflowSteps currentState={state} />
      </div>

      {/* Right panel: results */}
      <div>
        {state === 'idle' && <EmptyResultPanel />}
        {state === 'uploaded' && <UploadedHint />}
        {state === 'processing' && <ProcessingState />}
        {(state === 'complete' || state === 'error') && result && (
          <AnalysisResultPanel
            result={result}
            onSave={handleSaveToHistory}
            savedToHistory={savedToHistory}
            onAnalyzeAnother={handleReset}
          />
        )}
        {state === 'error' && !result && (
          <div className="bg-negative/5 border border-negative/20 rounded-xl p-6 text-center">
            <p className="text-sm font-semibold text-negative mb-2">Analysis Failed</p>
            <p className="text-xs text-muted-foreground mb-4">
              The AI model could not classify this image. Please ensure the image clearly shows food.
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-negative text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyResultPanel() {
  return (
    <div className="bg-card border border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center text-center min-h-[420px]">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">Results appear here</h3>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
        Upload a food image and click Analyze to get AI-powered nutritional estimates.
      </p>
    </div>
  );
}

function UploadedHint() {
  return (
    <div className="bg-card border border-primary/20 rounded-xl p-10 flex flex-col items-center justify-center text-center min-h-[420px]">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5">
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">Image ready for analysis</h3>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
        Click the <span className="font-semibold text-primary">Analyze Food</span> button to start AI classification.
      </p>
    </div>
  );
}

const workflowSteps = [
  { id: 'step-upload', label: 'Upload Image', states: ['uploaded', 'processing', 'complete'] },
  { id: 'step-preprocess', label: 'Image Preprocessing', states: ['processing', 'complete'] },
  { id: 'step-classify', label: 'Food Classification', states: ['processing', 'complete'] },
  { id: 'step-confidence', label: 'Prediction Confidence', states: ['complete'] },
  { id: 'step-nutrition', label: 'Nutrition Lookup', states: ['complete'] },
  { id: 'step-display', label: 'Display Results', states: ['complete'] },
];

function AIWorkflowSteps({ currentState }: { currentState: AnalysisState }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
        AI Workflow Pipeline
      </p>
      <div className="space-y-2">
        {workflowSteps.map((step, i) => {
          const isActive = step.states.includes(currentState);
          const isProcessing = currentState === 'processing' && step.states[0] === 'processing' && i < 3;
          return (
            <div key={step.id} className="flex items-center gap-3">
              <div
                className={`
                  w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-2xs font-bold
                  transition-all duration-300
                  ${isActive
                    ? 'bg-primary text-primary-foreground'
                    : isProcessing
                    ? 'bg-amber-100 text-amber-600 animate-pulse' :'bg-muted text-muted-foreground'
                  }
                `}
              >
                {isActive ? '✓' : i + 1}
              </div>
              <span className={`text-xs font-medium transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                {step.label}
              </span>
              {currentState === 'processing' && i === 2 && (
                <span className="text-2xs text-amber-500 font-medium animate-pulse ml-auto">Running...</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}