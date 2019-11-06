import React from 'react';
import './LessonList.css';
import classNames from 'classnames';
import { LessonNew } from '../../Containers/lessons';


export const LessonList: React.FC<{
  lessonData: LessonNew[];
  selectLesson: (lesson: LessonNew) => void;
}> = ({
  selectLesson,
  lessonData
}) => {

  return (
    <div className="LessonList__Wrapper">
          <div className="LessonList__Header">Paketten</div>
          {lessonData.map(menuItem => (
            <button
              className={classNames(
                'LessonList-MenuItem',
              )}
              onClick={() => selectLesson(menuItem)}
            >
              <div>{menuItem.song.title}</div>
            </button>
          ))}
    </div>
  );
}