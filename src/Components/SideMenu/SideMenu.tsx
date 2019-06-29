import React from 'react';
import { SideMenuProps, Lesson } from './SideMenu.types';
import './SideMenu.css';
import classNames from 'classnames';

interface SideMenuState {
  activeCategory?: string;
  activeMenuItems: Lesson[];
}

export class SideMenu extends React.Component<SideMenuProps, SideMenuState> {
  constructor(props: SideMenuProps) {
    super(props);

    this.state = {
      activeCategory: undefined,
      activeMenuItems: [],
    };
  }
  toggleCategory = (categoryName: string, menuItems: Lesson[]) => {
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
                {menuItem.name}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

// export const SideMenu: React.FC<SideMenuProps> = ({ categories }) => (
//   <div className="SideMenu--Wrapper">
//     {categories.map(category => (
//       <div className="SideMenu--Category">
//         <div>{category.name}</div>
//         {category.menuItems.map(menuItem => (
//           <div className="SideMenu-MenuItem">
//             <div>{menuItem.name}</div>
//           </div>
//         ))}
//       </div>
//     ))}
//   </div>
// );
