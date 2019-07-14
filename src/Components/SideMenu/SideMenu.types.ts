import { LessonNew } from "../../Containers/lessons";


export interface Category {
  name: string;
  menuItems: LessonNew[];
}

export interface SideMenuProps {
  categories: Category[];
  selectLesson: (lesson: LessonNew) => void;
}
