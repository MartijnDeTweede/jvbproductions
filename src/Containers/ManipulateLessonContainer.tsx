import React from 'react';
import { LessonForm } from '../Components/LessonForm/LessonForm';
import { LessonNew } from './lessons';
import { Button, ButtonColors } from '../Components/Buttons/Button';

export const ManipulateLessonContainer: React.FC<{
  submitUpdateLesson: (payload: LessonNew) => void
  submitDeleteSelectedLesson: () => void
  selectedLesson: LessonNew,
}> = ({
  submitUpdateLesson,
  selectedLesson,
  submitDeleteSelectedLesson,
}) => {
  return(<div>
    <div>Verwijder het geselecteerde pakket</div>
    <Button
      text="Verwijder pakket"
      onClick={() => submitDeleteSelectedLesson()}
      colour={ButtonColors.gray}
    />
    <div>Pas een pakket aan.</div>
    <LessonForm submit={(payload: LessonNew) => submitUpdateLesson(payload)} selectedLesson={selectedLesson} />
  </div>)
}