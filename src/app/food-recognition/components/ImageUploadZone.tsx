'use client';

import React, { useCallback, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { Upload, X, Camera, Image as ImageIcon, AlertCircle } from 'lucide-react';
import type { AnalysisState } from './FoodRecognitionClient';

interface ImageUploadZoneProps {
  previewUrl: string | null;
  state: AnalysisState;
  onImageSelected: (url: string) => void;
  onReset: () => void;
  onAnalyze: () => void;
}

const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

export default function ImageUploadZone({
  previewUrl,
  state,
  onImageSelected,
  onReset,
  onAnalyze,
}: ImageUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      setFileError(null);
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setFileError('Unsupported file type. Please upload JPEG, PNG, or WebP images.');
        return;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setFileError(`File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageSelected(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    },
    [onImageSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
      if (inputRef.current) inputRef.current.value = '';
    },
    [processFile]
  );

  const isProcessing = state === 'processing';

  return (
    <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-base font-semibold text-foreground">Upload Food Image</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          JPEG, PNG, WebP up to {MAX_FILE_SIZE_MB}MB · Clear, well-lit photos give better results
        </p>
      </div>

      <div className="p-5">
        {!previewUrl ? (
          <div
            className={`
              upload-zone relative border-2 border-dashed rounded-xl p-8
              flex flex-col items-center justify-center text-center cursor-pointer
              min-h-[260px] transition-all duration-200
              ${isDragging
                ? 'border-primary bg-primary/5 shadow-upload'
                : 'border-border hover:border-primary/50 hover:bg-muted/30'
              }
            `}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
            aria-label="Upload food image"
          >
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED_TYPES.join(',')}
              className="hidden"
              onChange={handleFileChange}
              aria-label="Food image file input"
            />

            <div className={`
              w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-200
              ${isDragging ? 'bg-primary/15 scale-110' : 'bg-muted'}
            `}>
              <Upload size={28} className={isDragging ? 'text-primary' : 'text-muted-foreground'} />
            </div>

            <p className="text-sm font-semibold text-foreground mb-1">
              {isDragging ? 'Drop your food image here' : 'Drag & drop a food photo'}
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              or click to browse from your device
            </p>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg">
                <Camera size={13} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Camera Roll</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg">
                <ImageIcon size={13} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Gallery</span>
              </div>
            </div>

            <p className="text-2xs text-muted-foreground mt-4">
              Best results with clear, single-food images in good lighting
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Preview */}
            <div className="relative rounded-xl overflow-hidden bg-muted aspect-video">
              <AppImage
                src={previewUrl}
                alt="Uploaded food image preview for AI analysis"
                fill
                className="object-cover"
                unoptimized
              />
              {!isProcessing && (
                <button
                  onClick={(e) => { e.stopPropagation(); onReset(); }}
                  className="absolute top-3 right-3 w-8 h-8 bg-foreground/70 hover:bg-foreground/90 text-background rounded-full flex items-center justify-center transition-colors duration-150 backdrop-blur-sm"
                  aria-label="Remove image"
                >
                  <X size={14} />
                </button>
              )}
              {isProcessing && (
                <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center processing-pulse">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-sm font-semibold text-white">Analyzing food...</p>
                    <p className="text-xs text-white/80">AI model is classifying your image</p>
                  </div>
                </div>
              )}
            </div>

            {/* File info */}
            <div className="flex items-center justify-between px-3 py-2 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <ImageIcon size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Image uploaded successfully</span>
              </div>
              <span className="text-xs font-medium text-positive">Ready to analyze</span>
            </div>
          </div>
        )}

        {fileError && (
          <div className="mt-3 flex items-start gap-2 px-3 py-2.5 bg-negative/5 border border-negative/20 rounded-lg">
            <AlertCircle size={14} className="text-negative shrink-0 mt-0.5" />
            <p className="text-xs text-negative">{fileError}</p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="px-5 pb-5 flex gap-3">
        {previewUrl && !isProcessing && state !== 'complete' && (
          <button
            onClick={onAnalyze}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 btn-primary shadow-card transition-all duration-150"
          >
            <Camera size={16} />
            Analyze Food
          </button>
        )}
        {previewUrl && !isProcessing && (
          <button
            onClick={onReset}
            className="px-4 py-2.5 border border-border text-secondary-foreground text-sm font-medium rounded-lg hover:bg-secondary transition-colors duration-150"
          >
            Clear
          </button>
        )}
        {!previewUrl && (
          <button
            onClick={() => inputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 btn-primary transition-all duration-150"
          >
            <Upload size={16} />
            Choose Image
          </button>
        )}
      </div>
    </div>
  );
}