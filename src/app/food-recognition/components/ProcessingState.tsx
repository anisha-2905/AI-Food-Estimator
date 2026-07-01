import React from 'react';

const processingSteps = [
  { id: 'ps-resize', label: 'Resizing & normalizing image', done: true },
  { id: 'ps-extract', label: 'Extracting visual features', done: true },
  { id: 'ps-classify', label: 'Running food classification model', done: false },
  { id: 'ps-confidence', label: 'Computing prediction confidence', done: false },
  { id: 'ps-lookup', label: 'Fetching nutritional data', done: false },
];

export default function ProcessingState() {
  return (
    <div className="bg-card border border-primary/20 rounded-xl p-6 min-h-[420px] flex flex-col justify-center">
      <div className="text-center mb-8">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="w-20 h-20 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🍽️</span>
          </div>
        </div>
        <h3 className="text-base font-bold text-foreground mb-1">Analyzing Your Food</h3>
        <p className="text-sm text-muted-foreground">AI model is classifying the image...</p>
      </div>
      <div className="space-y-3">
        {processingSteps?.map((step, i) => (
          <div key={step?.id} className="flex items-center gap-3">
            <div
              className={`
                w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-2xs font-bold
                ${step?.done ? 'bg-positive text-white' : i === 2 ? 'bg-primary/20 border-2 border-primary animate-pulse' : 'bg-muted'}
              `}
            >
              {step?.done ? '✓' : ''}
            </div>
            <span className={`text-xs ${step?.done ? 'text-foreground font-medium' : i === 2 ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
              {step?.label}
            </span>
            {i === 2 && (
              <div className="ml-auto flex gap-0.5">
                {[0, 1, 2]?.map((dot) => (
                  <div
                    key={`dot-${dot}`}
                    className="w-1 h-1 rounded-full bg-primary animate-pulse"
                    style={{ animationDelay: `${dot * 200}ms` }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-2/5 animate-pulse" />
      </div>
      <p className="text-2xs text-muted-foreground text-center mt-2">Estimated time: ~3 seconds</p>
    </div>
  );
}