
import React from 'react';
import { Plan } from '../types';
import PlanCard from './PlanCard';

interface PlanGridProps {
  plans: Plan[];
}

const PlanGrid: React.FC<PlanGridProps> = ({ plans }) => {
  if (plans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400 dark:text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xl font-semibold text-slate-600 dark:text-slate-300">条件に一致する図面がありません</p>
        <p className="text-slate-500 dark:text-slate-400 mt-1">検索条件を変更してください。</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {plans.map(plan => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
};

export default PlanGrid;
