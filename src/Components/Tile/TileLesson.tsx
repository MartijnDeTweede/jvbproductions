import React, { useState, useEffect } from 'react';
import { LessonNew } from '../../Containers/lessons';

import './Tile.css'

export const LessonTile: React.FC<{
  lesson: LessonNew
  selectLesson: (lesson: LessonNew) => void;
  getImageLink: (imageName: string)  => Promise<string | void>;
}> = ({
  lesson,
  selectLesson,
  getImageLink
}) => {
  const { 
    song: {
      title,
      artist
    },
    category,
    cost,
    difficulty,
    image,
    altText,
    } = lesson;

    const [imageLink, setImageLink] = useState<string | undefined>(undefined);

    const handleSetImageLink = (link: string) => setImageLink(link);
  
    useEffect(() => {
        getImageLink(image).then((link) => {
          if(link) {
            handleSetImageLink(link);
          }
        });
    }
    ,[getImageLink, image])

  return(
    <div className="tile" onClick={() => selectLesson(lesson)}>
      {
        imageLink ? 
        <img src={imageLink} alt={altText} className="tile__imageHolder"/> :
        <div className="tile__imageHolder"></div> 
      }
      <div className="tile__detailInfoHolder">
        <div className="tile__detailInfo">{category}</div>
        <div className="tile__detailInfo">{title}</div>
        <div className="tile__detailInfo">{artist}</div>
        <div className="tile__detailInfo"> Moeilijkheidsgraad: {difficulty}</div>
        <div className="tile__detailInfo">{cost === 0 ? "Gratis" : `${cost} Credits`}</div>
      </div>
  </div>
  )
}