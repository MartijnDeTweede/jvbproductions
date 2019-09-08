import React, { useState } from 'react';
import classNames from 'classnames';
import { Checkbox } from '../Checkbox/Checkbox';
import { FilterValue } from '../../Containers/SideMenuContainer';
import './filter.css'

export const FilterComponent: React.FC<{
  category: string;
  title: string
  onClick: (e: any) => void;
  isActive: boolean;
  values: FilterValue[];
  updateFilters: (category: string, newValue: string) => void
}> = ({
  category,
  title,
  isActive,
  updateFilters,
  values
}) =>{

  const [filterActive, setFilterActive ] = useState<boolean>(isActive);
return(
  <div className="filter__container">
    <button className="filter" onClick={(e) => setFilterActive(!filterActive)} >
      {title}
    </button>
    <div className={classNames( {"filter--hidden": !filterActive})}>
      {values.map(value =>(
        <div>
          <Checkbox text={value.text} value={value.value} onClick={(event) => updateFilters(category, value.value)} checked={value.active}/>
        </div>
      ))}
    </div>
  </div>
)
}