'use client';

import { QuestionInputProps } from './types';

export default function QuestionInput({ question, setQuestion }: QuestionInputProps) {
  return (
    <div>
      <label htmlFor="question" className="block text-sm font-medium text-text-secondary mb-1.5">
        Question
      </label>
      <textarea
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter a clear, specific question for your market..."
        className={`w-full px-3 py-2 rounded-lg border ${
          !question.trim() ? 'border-error' : 'border-border'
        } bg-background text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none min-h-[100px]`}
      />
      <p className="mt-1 text-xs text-text-secondary">
        Good questions are specific, have clear resolution criteria, and a definite end date.
      </p>
    </div>
  );
}
