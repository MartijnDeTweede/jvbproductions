import React from 'react';
import './Tile.css'

export const Tile: React.FC<{
  onClick: () => void;
  imageLink?: string;
  altText: string;
  cost: number;
  title: string;
  category: string;
  difficulty: string;
}> = (
  {
    onClick,
    imageLink,
    altText,
    cost,
    title,
    category,
    difficulty,
  }
) => {
  return(
    <div className="tile" onClick={() => onClick() }>
    {
      imageLink ? 
      <img src={imageLink} alt={altText} className="tile__imageHolder"/> :
      <div className="tile__imageHolder"></div> 
    }
    <div className="tile__cost">{cost === 0 ? "Gratis" : `${cost} Credits`}</div>
    <div className="tile__detailInfoHolder">
      <div className="tile__detailInfo">{title}</div>
      <div className="tile__detailInfo">{category}</div>
      <div className="tile__detailInfo">{difficulty}</div>
    </div>
</div>
  )
}