import React from 'react';
import { BookOpen } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl">
      <BookOpen size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
        <span className="font-semibold">Educational Use Only.</span>{' '}
        This application is intended for educational purposes only. Nutritional values are approximate estimates generated using AI and should not be used for medical or dietary decision-making.
      </p>
    </div>
  );
}