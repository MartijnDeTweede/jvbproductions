import React from 'react';
import { SideMenu } from '../SideMenu/SideMenu';
import { SideMenuProps } from '../SideMenu/SideMenu.types';
import './ClassRoom.css';
interface ClassRoomProps {
  sideMenuProps: SideMenuProps;
  content: string;
}

export const ClassRoom: React.FC<ClassRoomProps> = ({
  sideMenuProps,
  content,
}) => {
  return (
    <div className="ClassRoom-Wrapper">
      <SideMenu {...sideMenuProps} />
      <div>{content}</div>
    </div>
  );
};
