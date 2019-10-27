import React from 'react';
import { LessonNew } from '../../Containers/lessons';

import './Tile.css'

export const LessonTile: React.FC<{
  lesson: LessonNew
  selectLesson: (lesson: LessonNew) => void;
}> = ({
  lesson,
  selectLesson
}) => {
  const { 
    song: {
      title,
      artist
    },
    category,
    cost,
    difficulty,
    } = lesson;

  return(
    <div className="tile" onClick={() => selectLesson(lesson)}>
      <div className="tile__imageHolder"></div>
      <div className="tile__detailInfoHolder">
        <div className="tile__detailInfo">{category}</div>
        <div className="tile__detailInfo">{title}</div>
        <div className="tile__detailInfo">{artist}</div>
        <div className="tile__detailInfo"> Moeilijkheidsgraad: {difficulty}</div>
        <div className="tile__detailInfo">{cost} credits</div>
      </div>
  </div>
  )
}