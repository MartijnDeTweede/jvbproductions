import React from 'react';
import { SideMenuProps } from './SideMenu.types';
import './SideMenu.css';
import classNames from 'classnames';
import { LessonNew } from '../../Containers/lessons';

interface SideMenuState {
  activeCategory?: string;
  activeMenuItems: LessonNew[];
}

export class SideMenu extends React.Component<SideMenuProps, SideMenuState> {
  constructor(props: SideMenuProps) {
    super(props);

    this.state = {
      activeCategory: undefined,
      activeMenuItems: [],
    };
  }
  toggleCategory = (categoryName: string, menuItems: LessonNew[]) => {
    this.setState({ activeCategory: categoryName, activeMenuItems: menuItems });
  };

  render() {
    const { categories, selectLesson } = this.props;
    const { activeCategory } = this.state;
    return (
      <div className="SideMenu--Wrapper">
        {categories.map(category => (
          <div>
            <button
              className="SideMenu--Category"
              onClick={() =>
                this.toggleCategory(category.name, category.menuItems)
              }
            >
              {category.name}
            </button>
            {category.menuItems.map(menuItem => (
              <button
                className={classNames(
                  'SideMenu-MenuItem',
                  activeCategory === category.name
                    ? 'SideMenu-MenuItem--shown'
                    : 'SideMenu-MenuItem--hidden'
                )}
                onClick={() => selectLesson(menuItem)}
              >
                {menuItem.song.title}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }
}