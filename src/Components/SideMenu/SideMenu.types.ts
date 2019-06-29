export interface Lesson {
  name: string;
  linkToVideo: string;
  artist: string;
}

export interface Category {
  name: string;
  menuItems: Lesson[];
}

export interface SideMenuProps {
  categories: Category[];
  selectLesson: (lesson: Lesson) => void;
}
