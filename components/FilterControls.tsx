import React from 'react';
import { FilterState, TsuboRange, BuildingType } from '../types';
import { BUILDING_TYPES, FLOORS, ORIENTATIONS, TSUBO_RANGES } from '../constants';
import { ResetIcon } from './icons/Icons';

interface FilterControlsProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
}

// Fix: Extracted prop types into a type alias to prevent TypeScript from incorrectly including the 'key' prop in the component's props when used inside .map().
type FilterButtonProps = { label: string, value: string, activeValue: string, onClick: (value: string) => void };
// Fix: Changed component signature to use React.FC to correctly type a React functional component. This prevents TypeScript errors when using the 'key' prop inside a .map() loop.
const FilterButton: React.FC<FilterButtonProps> = ({ label, value, activeValue, onClick }) => {
  const isActive = value === activeValue;
  return (
    <button
      onClick={() => onClick(value)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 ${
        isActive
          ? 'bg-blue-600 text-white shadow'
          : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
      }`}
    >
      {label}
    </button>
  );
};

// Fix: Extracted prop types into a type alias to prevent TypeScript from incorrectly including the 'key' prop in the component's props when used inside .map().
type BuildingTypeButtonProps = { name: string, imageUrl: string, isActive: boolean, onClick: () => void };
// Fix: Changed component signature to use React.FC to correctly type a React functional component. This prevents TypeScript errors when using the 'key' prop inside a .map() loop.
const BuildingTypeButton: React.FC<BuildingTypeButtonProps> = ({ name, imageUrl, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`rounded-lg overflow-hidden border-2 text-center transition-all duration-200 transform hover:shadow-xl hover:-translate-y-1 focus:outline-none ${
            isActive ? 'border-blue-500 ring-2 ring-blue-500' : 'border-transparent dark:border-slate-700 hover:border-blue-400'
        }`}
    >
        <img src={imageUrl} alt={name} className="w-full h-20 object-cover" />
        <div className="py-2 px-1 bg-white dark:bg-slate-800">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{name}</span>
        </div>
    </button>
);


const FilterGroup = ({ title, options, filterKey, filters, onFilterChange }: { title: string, options: readonly string[] | TsuboRange[], filterKey: keyof Omit<FilterState, 'buildingType'>, filters: FilterState, onFilterChange: (newFilters: Partial<FilterState>) => void }) => {
    const handleFilterChange = (value: string) => {
        onFilterChange({ [filterKey]: value });
    };

    return (
        <div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-3">{title}</h3>
            <div className="flex flex-wrap gap-2">
                <FilterButton
                    label="すべて"
                    value="all"
                    activeValue={filters[filterKey]}
                    onClick={handleFilterChange}
                />
                {options.map((option) => {
                    const label = typeof option === 'string' ? option : option.label;
                    const value = typeof option === 'string' ? option : option.value;
                    return (
                        <FilterButton
                            key={value}
                            label={label}
                            value={value}
                            activeValue={filters[filterKey]}
                            onClick={handleFilterChange}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const FilterControls: React.FC<FilterControlsProps> = ({ filters, onFilterChange, onReset }) => {
  return (
    <div className="p-6 mb-8 bg-white dark:bg-slate-800/50 rounded-xl shadow-lg space-y-6 backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          絞り込み検索
        </h2>
        <button
          onClick={onReset}
          className="flex items-center text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
        >
          <ResetIcon className="w-4 h-4 mr-1.5" />
          リセット
        </button>
      </div>
      
      <div className="space-y-8">
        <div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-3">建物タイプ</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                 <button
                    onClick={() => onFilterChange({ buildingType: 'all' })}
                    className={`rounded-lg border-2 flex items-center justify-center transition-all duration-200 transform hover:shadow-xl hover:-translate-y-1 focus:outline-none ${
                         filters.buildingType === 'all' ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-50 dark:bg-slate-700' : 'border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-400 bg-slate-50 dark:bg-slate-800'
                    }`}
                >
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 p-4">すべて</span>
                </button>
                {BUILDING_TYPES.map(type => (
                    <BuildingTypeButton
                        key={type.name}
                        name={type.name}
                        imageUrl={type.imageUrl}
                        isActive={filters.buildingType === type.name}
                        onClick={() => onFilterChange({ buildingType: type.name })}
                    />
                ))}
            </div>
        </div>

        <FilterGroup title="階数" options={FLOORS} filterKey="floor" filters={filters} onFilterChange={onFilterChange} />
        <FilterGroup title="方位" options={ORIENTATIONS} filterKey="orientation" filters={filters} onFilterChange={onFilterChange} />
        <FilterGroup title="坪数" options={TSUBO_RANGES} filterKey="tsuboRange" filters={filters} onFilterChange={onFilterChange} />
      </div>
    </div>
  );
};

export default FilterControls;