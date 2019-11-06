import React from 'react';
import { LessonForm } from '../Components/LessonForm/LessonForm';
import { LessonNew } from './lessons';

interface AddLessonContainerProps {
  submitAddLesson: (payload: LessonNew) => void
}

export const AddLessonContainer: React.FC<AddLessonContainerProps> = (
    {submitAddLesson}
  ) => {
  return(<div>
    <span>Voeg een pakket toe.</span>
    <LessonForm submit={(payload: LessonNew) => submitAddLesson(payload)} />
  </div>)
}