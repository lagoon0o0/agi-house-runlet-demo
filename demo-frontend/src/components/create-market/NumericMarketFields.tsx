'use client';

import { NumericMarketFieldsProps } from './types';

export default function NumericMarketFields({
  numericMin,
  setNumericMin,
  numericMax,
  setNumericMax,
  numSegments,
  setNumSegments
}: NumericMarketFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-text-secondary">Numeric Range</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="numericMin" className="block text-sm text-text-secondary mb-1">
            Minimum Value
          </label>
          <input
            id="numericMin"
            type="number"
            value={numericMin}
            onChange={(e) => setNumericMin(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div>
          <label htmlFor="numericMax" className="block text-sm text-text-secondary mb-1">
            Maximum Value
          </label>
          <input
            id="numericMax"
            type="number"
            value={numericMax}
            onChange={(e) => setNumericMax(e.target.value)}
            placeholder="100"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="numSegments" className="block text-sm text-text-secondary mb-1">
          Number of Segments
        </label>
        <input
          id="numSegments"
          type="number"
          value={numSegments}
          onChange={(e) => setNumSegments(e.target.value)}
          placeholder="100"
          min="1"
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        />
        <p className="mt-1 text-xs text-text-secondary">
          Divides the range into equal segments. More segments = higher precision but lower liquidity per segment.
        </p>
      </div>
    </div>
  );
}
