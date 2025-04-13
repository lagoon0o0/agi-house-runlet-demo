'use client';

import { ProgressStepsProps } from './types';

export default function ProgressSteps({ activeStep, steps }: ProgressStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            {/* Step circle */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                index + 1 < activeStep
                  ? 'bg-primary text-white'
                  : index + 1 === activeStep
                  ? 'bg-primary text-white'
                  : 'bg-background border border-border text-text-secondary'
              }`}
            >
              {index + 1 < activeStep ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            
            {/* Step label */}
            <span
              className={`ml-2 text-sm font-medium ${
                index + 1 <= activeStep ? 'text-text-primary' : 'text-text-secondary'
              }`}
            >
              {step}
            </span>
            
            {/* Connector line (except for last step) */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-4 ${
                  index + 1 < activeStep ? 'bg-primary' : 'bg-border'
                }`}
                style={{ minWidth: '60px' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
