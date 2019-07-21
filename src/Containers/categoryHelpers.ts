import { LessonNew, LessonTypes } from "./lessons";

export const getLessonsByLessonType = (lessons: LessonNew[], lessonType: LessonTypes) => (
  lessons.filter(lesson => lesson.lessonType === lessonType)
)


export const populateCategories = (categories: string[], lessons: LessonNew[]) => (
  categories.map(category => ({
    name: category,
    menuItems: lessons.filter(lesson => lesson.category === category)
  }))
)