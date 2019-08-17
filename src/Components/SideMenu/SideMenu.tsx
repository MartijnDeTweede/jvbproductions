import React, {useState} from 'react';
import './SideMenu.css';
import classNames from 'classnames';
import { LessonNew } from '../../Containers/lessons';

export interface Category {
  name: string;
  menuItems: LessonNew[];
}


export const SideMenu: React.FC<{
  categories: Category[];
  selectLesson: (lesson: LessonNew) => void;
}> = ({
  categories,
  selectLesson
}) => {
 const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
const [activeMenuItems, setActiveMenuItems] = useState<LessonNew[]>([])

  const toggleCategory = (categoryName: string, menuItems: LessonNew[]) => {
    setActiveCategory(categoryName);
    setActiveMenuItems(menuItems)
  };

  return (
    <div className="SideMenu--Wrapper">
      {categories.map(category => (
        <div>
          <button
            className="SideMenu--Category"
            onClick={() =>
              toggleCategory(category.name, category.menuItems)
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