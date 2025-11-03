import React, { useState, useEffect } from 'react';
import { FilterState, Plan } from './types';
import { mockPlans } from './constants';
import Header from './components/Header';
import PlanGrid from './components/PlanGrid';
import FilterControls from './components/FilterControls';

const App: React.FC = () => {
  const [plans] = useState<Plan[]>(mockPlans);
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>(plans);
  
  const initialFilters: FilterState = {
    buildingType: 'all',
    floor: 'all',
    orientation: 'all',
    tsuboRange: 'all',
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  useEffect(() => {
    const applyFilters = () => {
      let result = plans;

      if (filters.buildingType !== 'all') {
        result = result.filter(plan => plan.buildingType === filters.buildingType);
      }

      if (filters.floor !== 'all') {
        result = result.filter(plan => plan.floor === filters.floor);
      }
      
      if (filters.orientation !== 'all') {
        result = result.filter(plan => plan.orientation === filters.orientation);
      }
      
      if (filters.tsuboRange !== 'all') {
        const [min, max] = filters.tsuboRange.split('-').map(Number);
        // The max value for the largest range is 999, so '< max' works for all ranges.
        result = result.filter(plan => plan.tsubo >= min && plan.tsubo < max);
      }
      
      setFilteredPlans(result);
    };

    applyFilters();
  }, [filters, plans]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <Header />
      <main className="container mx-auto p-4 lg:p-6">
        <FilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
        />
        <PlanGrid plans={filteredPlans} />
      </main>
    </div>
  );
};

export default App;
