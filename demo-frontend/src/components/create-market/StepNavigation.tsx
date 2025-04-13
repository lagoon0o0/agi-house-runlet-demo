'use client';

import { StepNavigationProps } from './types';

export default function StepNavigation({
  activeStep,
  prevStep,
  nextStep,
  isStepValid,
  isLastStep,
  isSubmitting
}: StepNavigationProps) {
  return (
    <div className="flex items-center justify-between p-6 bg-background border-t border-border">
      {activeStep > 1 ? (
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 text-sm font-medium text-text-primary bg-background border border-border rounded-lg hover:bg-border/50 transition-colors"
        >
          Back
        </button>
      ) : (
        <div></div> // Empty div to maintain layout
      )}
      
      {isLastStep ? (
        <button
          type="submit"
          disabled={!isStepValid || isSubmitting}
          className={`px-6 py-2 rounded-lg text-sm font-medium ${
            !isStepValid || isSubmitting
              ? 'bg-primary/50 text-white cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90'
          } transition-colors`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </div>
          ) : (
            'Create Market'
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={nextStep}
          disabled={!isStepValid}
          className={`px-6 py-2 rounded-lg text-sm font-medium ${
            !isStepValid
              ? 'bg-primary/50 text-white cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90'
          } transition-colors`}
        >
          Continue
        </button>
      )}
    </div>
  );
}
