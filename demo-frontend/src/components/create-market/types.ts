import { Dispatch, SetStateAction } from 'react';

export type MarketType = 'numeric' | 'categorical' | 'binary';

export interface MarketTypeProps {
  marketType: MarketType;
  setMarketType: Dispatch<SetStateAction<MarketType>>;
}

export interface QuestionInputProps {
  question: string;
  setQuestion: Dispatch<SetStateAction<string>>;
}

export interface NumericMarketFieldsProps {
  numericMin: string;
  setNumericMin: Dispatch<SetStateAction<string>>;
  numericMax: string;
  setNumericMax: Dispatch<SetStateAction<string>>;
  numSegments: string;
  setNumSegments: Dispatch<SetStateAction<string>>;
}

export interface CategoricalMarketFieldsProps {
  labels: string[];
  updateLabel: (index: number, value: string) => void;
  addLabel: () => void;
  removeLabel: (index: number) => void;
}

export interface BinaryMarketParamsProps {
  initialLiquidity: string;
  setInitialLiquidity: Dispatch<SetStateAction<string>>;
  spread: string;
  setSpread: Dispatch<SetStateAction<string>>;
}

export interface OtherMarketParamsProps {
  alpha: string;
  setAlpha: Dispatch<SetStateAction<string>>;
  tickSize: string;
  setTickSize: Dispatch<SetStateAction<string>>;
}

export interface RulesEditorProps {
  rules: string;
  setRules: Dispatch<SetStateAction<string>>;
  isPreview: boolean;
  setIsPreview: Dispatch<SetStateAction<boolean>>;
}

export interface DatePickerProps {
  estimatedCloseDate: string;
  setEstimatedCloseDate: Dispatch<SetStateAction<string>>;
}

export interface ProgressStepsProps {
  activeStep: number;
  steps: string[];
}

export interface StepNavigationProps {
  activeStep: number;
  prevStep: () => void;
  nextStep: () => void;
  isStepValid: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
}
