import React from 'react';

import './SideMenuControlPanel.css';
import { FilterComponent } from '../Filter/Filter';
import { Filter } from '../../Containers/filters';

export const SideMenuControlPanel: React.FC<{
  updateFilters: (category: string, newValue: string) => void,
  activeFilters: Filter[]
}> = ({updateFilters, activeFilters}) =>{
  return(
  <div className="SideMenuControlPanel">
    <div className="SideMenuControlPanel__Header">Filters</div>
    {activeFilters.map(filter => (
      <div
      key={filter.title}>
        <FilterComponent
          category={filter.category}
          title={filter.title}
          onClick={filter.setIsExpended}
          isActive={filter.isExpended}
          updateFilters={updateFilters}
          values={filter.values}
        />
      </div>
    ))}
    </div>
  )
}