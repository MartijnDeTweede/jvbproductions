import React from 'react';

import './SideMenuControlPanel.css';
import { FilterComponent } from '../Filter/Filter';
import { Filter } from '../../Containers/SideMenuContainer';

export const SideMenuControlPanel: React.FC<{
  updateFilters: (category: string, newValue: string) => void,
  activeFilters: Filter[]
}> = ({updateFilters, activeFilters}) =>{
  return(
  <div>
    <div className="SideMenuControlPanel__Header">Filters</div>
    {activeFilters.map(filter => (
        <FilterComponent
          category={filter.category}
          title={filter.title}
          onClick={filter.setIsExpended}
          isActive={filter.isExpended}
          updateFilters={updateFilters}
          values={filter.values}
        />
    ))}
    </div>
  )
}