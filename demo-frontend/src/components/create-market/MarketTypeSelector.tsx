'use client';

import { MarketTypeProps } from './types';

export default function MarketTypeSelector({ marketType, setMarketType }: MarketTypeProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-1.5">
        Market Type
      </label>
      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => setMarketType('binary')}
          className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
            marketType === 'binary'
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 hover:bg-background'
          } transition-all`}
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-medium text-text-primary">Binary</span>
          <span className="text-xs text-text-secondary mt-1">Yes/No outcomes</span>
        </button>
        
        <button
          type="button"
          onClick={() => setMarketType('categorical')}
          className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
            marketType === 'categorical'
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 hover:bg-background'
          } transition-all`}
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <span className="font-medium text-text-primary">Categorical</span>
          <span className="text-xs text-text-secondary mt-1">Multiple outcomes</span>
        </button>
        
        <button
          type="button"
          onClick={() => setMarketType('numeric')}
          className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
            marketType === 'numeric'
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 hover:bg-background'
          } transition-all`}
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h6a1 1 0 100-2H3zm0 4a1 1 0 100 2h8a1 1 0 100-2H3zm10-4a1 1 0 100 2h1a1 1 0 100-2h-1z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-medium text-text-primary">Numeric</span>
          <span className="text-xs text-text-secondary mt-1">Range of values</span>
        </button>
      </div>
    </div>
  );
}
