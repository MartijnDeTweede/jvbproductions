import React from 'react';
import { PackageForm } from '../Components/LessonForm/PackageForm';
import { Package } from './Package';

interface AddLessonContainerProps {
  submitAddLesson: (payload: Package) => void
}

export const AddPackageContainer: React.FC<AddLessonContainerProps> = (
    {submitAddLesson}
  ) => {
  return(<div>
    <span>Voeg een pakket toe.</span>
    <PackageForm submit={(payload: Package) => submitAddLesson(payload)} />
  </div>)
}