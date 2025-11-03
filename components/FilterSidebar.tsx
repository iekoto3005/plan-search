
import React from 'react';
import { FilterState } from '../types';
// Fix: Import BUILDING_TYPES instead of non-existent PLAN_TYPES.
import { BUILDING_TYPES, FLOORS, ORIENTATIONS } from '../constants';
// Fix: Add FilterIcon to exports in Icons.tsx to resolve import error.
import { FilterIcon } from './icons/Icons';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
  maxArea: number;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange, onReset, maxArea }) => {
  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onFilterChange({ areaRange: [value, filters.areaRange[1]] });
  };
    
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
        <FilterIcon className="w-6 h-6 mr-2 text-slate-500" />
        絞り込み検索
      </h2>

      <div className="space-y-4">
        <div>
          {/* Fix: Use 'buildingType' to match FilterState type. */}
          <label htmlFor="buildingType" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">プラン種別</label>
          <select
            id="buildingType"
            value={filters.buildingType}
            onChange={(e) => onFilterChange({ buildingType: e.target.value })}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="all">すべて</option>
            {/* Fix: Use BUILDING_TYPES. */}
            {BUILDING_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="floor" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">階数</label>
          <select
            id="floor"
            value={filters.floor}
            onChange={(e) => onFilterChange({ floor: e.target.value })}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="all">すべて</option>
            {FLOORS.map(floor => <option key={floor} value={floor}>{floor}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="orientation" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">方位</label>
          <select
            id="orientation"
            value={filters.orientation}
            onChange={(e) => onFilterChange({ orientation: e.target.value })}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="all">すべて</option>
            {ORIENTATIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <div>
            <label htmlFor="area" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                面積 (m²)
            </label>
            <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>{filters.areaRange[0]}</span>
                <span>{maxArea}</span>
            </div>
            <input
                id="area"
                type="range"
                min="0"
                max={maxArea}
                value={filters.areaRange[0]}
                onChange={handleAreaChange}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
            />
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full text-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
      >
        リセット
      </button>
    </div>
  );
};

export default FilterSidebar;