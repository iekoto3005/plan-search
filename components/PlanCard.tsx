import React from 'react';
import { Plan } from '../types';

interface PlanCardProps {
  plan: Plan;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const getTagColor = (type: Plan['buildingType']) => {
    switch (type) {
      case 'Turku': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Ulm': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Ams': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Lucca': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Koben': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <img className="w-full h-48 object-cover" src={plan.imageUrl} alt={plan.name} />
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate pr-2">{plan.name}</h3>
            <span className={`text-xs font-semibold mr-2 px-2.5 py-1 rounded-full whitespace-nowrap ${getTagColor(plan.buildingType)}`}>
                {plan.buildingType}
            </span>
        </div>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 py-2">
                <span>階数</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{plan.floor}</span>
            </li>
            <li className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 py-2">
                <span>方位</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{plan.orientation}向き</span>
            </li>
            <li className="flex justify-between items-center py-2">
                <span>面積</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{plan.tsubo} 坪</span>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default PlanCard;
