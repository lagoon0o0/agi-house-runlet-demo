'use client';

import { CategoricalMarketFieldsProps } from './types';

export default function CategoricalMarketFields({
  labels,
  updateLabel,
  addLabel,
  removeLabel
}: CategoricalMarketFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-text-secondary">Outcome Labels</h3>
      
      <div className="space-y-3">
        {labels.map((label, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={label}
              onChange={(e) => updateLabel(index, e.target.value)}
              placeholder={`Outcome ${index + 1}`}
              className={`flex-1 px-3 py-2 rounded-lg border ${
                !label.trim() ? 'border-error' : 'border-border'
              } bg-background text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
            />
            
            {labels.length > 1 && (
              <button
                type="button"
                onClick={() => removeLabel(index)}
                className="p-2 text-text-secondary hover:text-error transition-colors"
                aria-label="Remove outcome"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
      
      <button
        type="button"
        onClick={addLabel}
        className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add Outcome
      </button>
      
      <p className="text-xs text-text-secondary">
        Add all possible outcomes for your market. Each outcome should be mutually exclusive.
      </p>
    </div>
  );
}
