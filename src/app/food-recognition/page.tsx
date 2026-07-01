import React from 'react';
import AppLayout from '@/components/AppLayout';
import FoodRecognitionClient from './components/FoodRecognitionClient';
import DisclaimerBanner from '../components/DisclaimerBanner';

export default function FoodRecognitionPage() {
  return (
    <AppLayout>
      <div className="space-y-5 fade-in">
        <DisclaimerBanner />
        <div>
          <h2 className="text-2xl font-bold text-foreground">Food Recognition</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Upload a food image to classify it using our AI model and get estimated nutritional information.
          </p>
        </div>
        <FoodRecognitionClient />
      </div>
    </AppLayout>
  );
}