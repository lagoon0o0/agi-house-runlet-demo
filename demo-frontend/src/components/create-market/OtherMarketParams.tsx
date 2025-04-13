'use client';

import { OtherMarketParamsProps } from './types';

export default function OtherMarketParams({
  alpha,
  setAlpha,
  tickSize,
  setTickSize
}: OtherMarketParamsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-text-secondary">Market Parameters</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="alpha" className="block text-sm text-text-secondary mb-1">
            Alpha
          </label>
          <input
            id="alpha"
            type="number"
            value={alpha}
            onChange={(e) => setAlpha(e.target.value)}
            placeholder="0.1"
            min="0.001"
            step="0.001"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
          <p className="mt-1 text-xs text-text-secondary">
            Controls price sensitivity to trades
          </p>
        </div>
        
        <div>
          <label htmlFor="tickSize" className="block text-sm text-text-secondary mb-1">
            Tick Size
          </label>
          <input
            id="tickSize"
            type="number"
            value={tickSize}
            onChange={(e) => setTickSize(e.target.value)}
            placeholder="0.001"
            min="0.0001"
            step="0.0001"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
          <p className="mt-1 text-xs text-text-secondary">
            Minimum price increment
          </p>
        </div>
      </div>
    </div>
  );
}
