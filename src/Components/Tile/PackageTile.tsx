import React, { useState, useEffect } from 'react';
import { Package } from '../../Containers/Package';
import { Tile } from './Tile';

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
    <Tile
      onClick={() => selectLesson(lesson)}
      imageLink={imageLink}
      altText={altText}
      cost={cost}
      title={title}
      category={category}
      difficulty={difficulty}
     />
  )
}