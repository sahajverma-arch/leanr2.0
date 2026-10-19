import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { DEFAULT_ANSWERS, type Answers } from '@/data/onboarding';

type Ctx = { answers: Answers; setAnswers: (a: Answers) => void };

const AnswersContext = createContext<Ctx | null>(null);

// In-memory for now; will be saved to the user's profile once the backend exists.
export function AnswersProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Answers>(DEFAULT_ANSWERS);
  const value = useMemo(() => ({ answers, setAnswers }), [answers]);
  return <AnswersContext.Provider value={value}>{children}</AnswersContext.Provider>;
}

export function useAnswers() {
  const ctx = useContext(AnswersContext);
  if (!ctx) throw new Error('useAnswers must be used inside AnswersProvider');
  return ctx;
}
