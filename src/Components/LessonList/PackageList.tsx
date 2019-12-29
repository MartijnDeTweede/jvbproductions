import React from 'react';
import './PackageList.css';
import classNames from 'classnames';
import { Package } from '../../Containers/Package';


export const PackageList: React.FC<{
  lessonData: Package[];
  selectLesson: (lesson: Package) => void;
}> = ({
  selectLesson,
  lessonData
}) => {

  return (
    <div className="PackageList__Wrapper">
          <div className="PackageList__Header">Paketten</div>
          {lessonData.map(menuItem => (
            <button
              id={menuItem.song.title}
              className={classNames(
                'PackageList-MenuItem',
              )}
              onClick={() => selectLesson(menuItem)}
            >
              <div>{menuItem.song.title}</div>
            </button>
          ))}
    </div>
  );
}