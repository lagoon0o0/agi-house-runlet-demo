'use client';

import { RulesEditorProps } from './types';

export default function RulesEditor({
  rules,
  setRules,
  isPreview,
  setIsPreview
}: RulesEditorProps) {
  // Simplified version without the rules generator functionality
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-medium text-text-secondary">
          Rules
        </label>
        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className="px-3 py-1 rounded-lg text-xs font-medium bg-background border border-border text-text-primary hover:bg-border/50 transition-all"
        >
          {isPreview ? 'Edit' : 'Preview'}
        </button>
      </div>
      
      <div
        className={`p-4 rounded-lg border ${
          !rules.trim()
            ? 'border-error'
            : 'border-border'
        } bg-background min-h-[200px]`}
      >
        {isPreview ? (
          <div className="prose prose-sm max-w-none text-text-primary">
            {rules || <span className="text-text-secondary italic">No rules defined yet.</span>}
          </div>
        ) : (
          <textarea
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            placeholder="Enter market rules..."
            className="w-full h-full min-h-[200px] bg-transparent text-text-primary resize-none focus:outline-none"
          />
        )}
      </div>
      
      <p className="mt-1 text-xs text-text-secondary">
        Define clear rules for how this market will be resolved.
      </p>
    </div>
  );
}
