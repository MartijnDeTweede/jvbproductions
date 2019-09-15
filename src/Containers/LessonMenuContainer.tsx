import React from 'react';
import { LessonNew } from './lessons';
import { Tile } from '../Components/Tile/Tile';
import "./LessonMenuContainer.css";

  export const LessonMenuContainer: React.FC<{
    lessonData: LessonNew[];
    selectLesson: (lesson: LessonNew) => void;
  }> = ({
    selectLesson,
    lessonData
  }) => {
  
    return (
      <div>
        <div className="lessonMenuContainer__Wrapper">
          {lessonData.map(lesson => (
            <Tile lesson={lesson} selectLesson={selectLesson} />
          ))}
        </div>
      </div>
    );
  }