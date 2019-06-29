import React from 'react';
import { SideMenu } from '../SideMenu/SideMenu';
import { SideMenuProps, Lesson, Category } from '../SideMenu/SideMenu.types';
import './ClassRoom.css';
interface ClassRoomProps {
  categories: Category[];
  content: string;
}

interface classRoomState {
  selectedLesson?: Lesson;
}
export class ClassRoom extends React.Component<ClassRoomProps, classRoomState> {
  constructor(props: ClassRoomProps) {
    super(props);
    this.state = {
      selectedLesson: undefined,
    };
  }
  selectLesson = (lesson: Lesson) => {
    this.setState({ selectedLesson: lesson });
  };

  render() {
    const { categories, content } = this.props;
    const { selectedLesson } = this.state;
    return (
      <div className="ClassRoom-Wrapper">
        <SideMenu selectLesson={this.selectLesson} categories={categories} />
        <div>{content}</div>
        {selectedLesson ? (
          <div>
            <span>Liedje: {selectedLesson.name}</span>
            <span>Artiest: {selectedLesson.name}</span>
          </div>
        ) : (
          <div>
            <span>selecteer een les</span>
          </div>
        )}
      </div>
    );
  }
}
