'use client';

import { BinaryMarketParamsProps } from './types';

export default function BinaryMarketParams({
  initialLiquidity,
  setInitialLiquidity,
  spread,
  setSpread
}: BinaryMarketParamsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-text-secondary">Binary Market Parameters</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="initialLiquidity" className="block text-sm text-text-secondary mb-1">
            Initial Liquidity ($)
          </label>
          <input
            id="initialLiquidity"
            type="number"
            value={initialLiquidity}
            onChange={(e) => setInitialLiquidity(e.target.value)}
            placeholder="100"
            min="0"
            step="1"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
          <p className="mt-1 text-xs text-text-secondary">
            Higher liquidity = less price impact per trade
          </p>
        </div>
        
        <div>
          <label htmlFor="spread" className="block text-sm text-text-secondary mb-1">
            Initial Spread (%)
          </label>
          <input
            id="spread"
            type="number"
            value={spread}
            onChange={(e) => setSpread(e.target.value)}
            placeholder="5"
            min="0"
            max="100"
            step="0.1"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
          <p className="mt-1 text-xs text-text-secondary">
            Difference between buy and sell prices
          </p>
        </div>
      </div>
    </div>
  );
}
