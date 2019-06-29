import React from 'react';
import { SideMenuProps } from './SideMenu.types';
import './SideMenu.css';

export const SideMenu: React.FC<SideMenuProps> = ({ categories }) => (
  <div className="SideMenu--Wrapper">
    {categories.map(category => (
      <div className="SideMenu--Category">
        <div>{category.name}</div>
        {category.menuItems.map(menuItem => (
          <div className="SideMenu-MenuItem">
            <div>{menuItem.name}</div>
          </div>
        ))}
      </div>
    ))}
  </div>
);
