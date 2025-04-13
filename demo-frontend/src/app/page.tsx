'use client';

import { useState } from 'react';
import { callRPC } from '@/utils/rpc';
import {
  MarketType,
  MarketTypeSelector,
  QuestionInput,
  NumericMarketFields,
  CategoricalMarketFields,
  BinaryMarketParams,
  OtherMarketParams,
  RulesEditor,
  DatePicker,
  ProgressSteps,
  StepNavigation
} from '@/components/create-market';

// Steps for the progress indicator
const STEPS = ['Basic Info', 'Market Details', 'Rules & Settings'];

export default function CreateMarket() {
  // Form state
  const [marketType, setMarketType] = useState<MarketType>('binary');
  const [question, setQuestion] = useState('');
  const [alpha, setAlpha] = useState('0.1');
  const [tickSize, setTickSize] = useState('0.001');
  const [rules, setRules] = useState('');
  const [estimatedCloseDate, setEstimatedCloseDate] = useState('');
  
  // Binary market specific state
  const [initialLiquidity, setInitialLiquidity] = useState('100');
  const [spread, setSpread] = useState('5');
  
  // Numeric market specific state
  const [numericMin, setNumericMin] = useState('0');
  const [numericMax, setNumericMax] = useState('100');
  const [numSegments, setNumSegments] = useState('100');
  
  // Categorical market specific state
  const [labels, setLabels] = useState(['']);
  
  // UI state
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle adding/removing categorical labels
  const addLabel = () => {
    setLabels([...labels, '']);
  };

  const removeLabel = (index: number) => {
    setLabels(labels.filter((_, i) => i !== index));
  };

  const updateLabel = (index: number, value: string) => {
    const newLabels = [...labels];
    newLabels[index] = value;
    setLabels(newLabels);
  };

  // Generate initial q vector based on market type
  const generateQ = () => {
    if (marketType === 'numeric') {
      const segments = parseInt(numSegments);
      return Array(segments).fill(1); // Equal initial probability
    } else if (marketType === 'binary') {
      return [1, 1]; // Equal probability for Yes/No
    } else {
      return Array(labels.length).fill(1); // Equal probability for all outcomes
    }
  };

  // Generate labels based on market type
  const generateLabels = () => {
    if (marketType === 'numeric') {
      const min = parseFloat(numericMin);
      const max = parseFloat(numericMax);
      const segments = parseInt(numSegments);
      const step = (max - min) / segments;
      return Array(segments).fill(0).map((_, i) => 
        `${(min + i * step).toFixed(2)} - ${(min + (i + 1) * step).toFixed(2)}`
      );
    } else if (marketType === 'binary') {
      return ['Yes', 'No'];
    } else {
      return labels;
    }
  };

  // Navigation functions
  const nextStep = () => {
    if (activeStep < STEPS.length) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  // Validate current step
  const isStepValid = () => {
    if (activeStep === 1) {
      return !!question.trim();
    } else if (activeStep === 2) {
      if (marketType === 'binary') {
        return parseFloat(initialLiquidity) > 0 && parseFloat(spread) > 0;
      } else if (marketType === 'numeric') {
        return (
          parseFloat(numericMin) < parseFloat(numericMax) &&
          parseInt(numSegments) > 0 &&
          parseFloat(alpha) > 0 &&
          parseFloat(tickSize) > 0
        );
      } else if (marketType === 'categorical') {
        return (
          labels.length > 0 && 
          labels.every(label => !!label.trim()) &&
          parseFloat(alpha) > 0 &&
          parseFloat(tickSize) > 0
        );
      }
    } else if (activeStep === 3) {
      // Require rules and estimated close date for all market types
      return !!rules.trim() && !!estimatedCloseDate.trim();
    }
    return false;
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      // Validation
      if (!question.trim()) {
        throw new Error('Question is required');
      }

      // Common validation for all market types
      if (!rules.trim()) {
        throw new Error('Rules are required');
      }
      if (!estimatedCloseDate.trim()) {
        throw new Error('Estimated close date is required');
      }

      if (marketType === 'binary') {
        // Binary market validation
        if (parseFloat(spread) <= 0) {
          throw new Error('Spread must be positive');
        }
        if (parseFloat(initialLiquidity) <= 0) {
          throw new Error('Initial liquidity must be positive');
        }

        // Create binary market
        const result = await callRPC('create_binary_market', {
          question,
          rules,
          spread: parseFloat(spread) / 100, // Convert percentage to decimal
          estimated_close_date: estimatedCloseDate,
          initial_liquidity: parseFloat(initialLiquidity)
        });

        setSuccessMessage(`Binary market created successfully with ID: ${result}`);
      } else {
        // Validation for other market types
        if (marketType === 'categorical' && labels.some(label => !label.trim())) {
          throw new Error('All labels must be filled');
        }
        if (parseFloat(alpha) <= 0) {
          throw new Error('Alpha must be positive');
        }

        const q = generateQ();
        const finalLabels = generateLabels();

        // Create market
        const result = await callRPC('initialize_market', {
          q,
          alpha: parseFloat(alpha),
          question,
          labels: finalLabels,
          market_type: marketType,
          tick_size: parseFloat(tickSize),
          rules: rules || undefined,
          estimated_close_date: estimatedCloseDate || undefined
        });

        setSuccessMessage(`${marketType.charAt(0).toUpperCase() + marketType.slice(1)} market created successfully with ID: ${result}`);
      }

      // Reset form
      setQuestion('');
      setRules('');
      setEstimatedCloseDate('');
      setActiveStep(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create market');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto pt-12 pb-20 px-4">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Create New Market</h1>
          <p className="text-text-secondary">Set up a new prediction market in just a few steps</p>
        </div>
        
        {/* Progress Steps */}
        <ProgressSteps activeStep={activeStep} steps={STEPS} />
        
        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-error/10 border border-error text-error">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-green-500/10 border border-green-500 text-green-500">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          {/* Step 1: Basic Info */}
          <div className={activeStep === 1 ? 'block' : 'hidden'}>
            <div className="p-8 border-b border-border">
              <h2 className="text-xl font-bold text-text-primary mb-6">Basic Information</h2>
              
              <div className="space-y-6">
                <MarketTypeSelector 
                  marketType={marketType} 
                  setMarketType={setMarketType} 
                />
                
                <QuestionInput 
                  question={question} 
                  setQuestion={setQuestion} 
                />
              </div>
            </div>
            
            <StepNavigation
              activeStep={activeStep}
              prevStep={prevStep}
              nextStep={nextStep}
              isStepValid={isStepValid()}
              isLastStep={activeStep === STEPS.length}
              isSubmitting={isSubmitting}
            />
          </div>
          
          {/* Step 2: Market Details */}
          <div className={activeStep === 2 ? 'block' : 'hidden'}>
            <div className="p-8 border-b border-border">
              <h2 className="text-xl font-bold text-text-primary mb-6">Market Details</h2>
              
              <div className="space-y-6">
                {/* Numeric Market Fields */}
                {marketType === 'numeric' && (
                  <>
                    <NumericMarketFields
                      numericMin={numericMin}
                      setNumericMin={setNumericMin}
                      numericMax={numericMax}
                      setNumericMax={setNumericMax}
                      numSegments={numSegments}
                      setNumSegments={setNumSegments}
                    />
                    
                    <OtherMarketParams
                      alpha={alpha}
                      setAlpha={setAlpha}
                      tickSize={tickSize}
                      setTickSize={setTickSize}
                    />
                  </>
                )}

                {/* Categorical Market Fields */}
                {marketType === 'categorical' && (
                  <>
                    <CategoricalMarketFields
                      labels={labels}
                      updateLabel={updateLabel}
                      addLabel={addLabel}
                      removeLabel={removeLabel}
                    />
                    
                    <OtherMarketParams
                      alpha={alpha}
                      setAlpha={setAlpha}
                      tickSize={tickSize}
                      setTickSize={setTickSize}
                    />
                  </>
                )}

                {/* Binary Market Parameters */}
                {marketType === 'binary' && (
                  <BinaryMarketParams
                    initialLiquidity={initialLiquidity}
                    setInitialLiquidity={setInitialLiquidity}
                    spread={spread}
                    setSpread={setSpread}
                  />
                )}
              </div>
            </div>
            
            <StepNavigation
              activeStep={activeStep}
              prevStep={prevStep}
              nextStep={nextStep}
              isStepValid={isStepValid()}
              isLastStep={activeStep === STEPS.length}
              isSubmitting={isSubmitting}
            />
          </div>
          
          {/* Step 3: Rules & Settings */}
          <div className={activeStep === 3 ? 'block' : 'hidden'}>
            <div className="p-8 border-b border-border">
              <h2 className="text-xl font-bold text-text-primary mb-6">Rules & Settings</h2>
              
              <div className="space-y-6">
                <RulesEditor
                  rules={rules}
                  setRules={setRules}
                  isPreview={isPreview}
                  setIsPreview={setIsPreview}
                />
                
                <DatePicker
                  estimatedCloseDate={estimatedCloseDate}
                  setEstimatedCloseDate={setEstimatedCloseDate}
                />
              </div>
            </div>
            
            <StepNavigation
              activeStep={activeStep}
              prevStep={prevStep}
              nextStep={nextStep}
              isStepValid={isStepValid()}
              isLastStep={activeStep === STEPS.length}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
