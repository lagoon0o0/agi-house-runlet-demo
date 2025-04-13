'use client';

import { DatePickerProps } from './types';

export default function DatePicker({
  estimatedCloseDate,
  setEstimatedCloseDate
}: DatePickerProps) {
  return (
    <div>
      <label htmlFor="estimatedCloseDate" className="block text-sm font-medium text-text-secondary mb-1.5">
        Estimated Close Date
      </label>
      <input
        id="estimatedCloseDate"
        type="date"
        value={estimatedCloseDate}
        onChange={(e) => setEstimatedCloseDate(e.target.value)}
        className={`w-full px-3 py-2 rounded-lg border ${
          !estimatedCloseDate ? 'border-error' : 'border-border'
        } bg-background text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
      />
      <p className="mt-1 text-xs text-text-secondary">
        The date when you expect this market to be resolved.
      </p>
    </div>
  );
}
