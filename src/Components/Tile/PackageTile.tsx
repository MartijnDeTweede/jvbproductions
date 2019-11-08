import React, { useState, useEffect } from 'react';
import { Package } from '../../Containers/Package';

import './Tile.css'

export const getDifficultyDescription = (difficulty: string) => {
switch(difficulty) {
  case "1": return "Beginner";
  case "2": return  "Gevorderd";
  case "3": return "Expert";
  case "4": return "Gitaar god";
  default: return "";
  }
}

export const PackageTile: React.FC<{
  lesson: Package
  selectLesson: (lesson: Package) => void;
  getImageLink: (imageName: string)  => Promise<string | void>;
}> = ({
  lesson,
  selectLesson,
  getImageLink
}) => {
  const { 
    song: {
      title,
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
      <div className="tile__cost">{cost === 0 ? "Gratis" : `${cost} Credits`}</div>
      <div className="tile__detailInfoHolder">
        <div className="tile__detailInfo">{title}</div>
        <div className="tile__detailInfo">{category}</div>
        <div className="tile__detailInfo"> {getDifficultyDescription(difficulty)}</div>
      </div>
  </div>
  )
}