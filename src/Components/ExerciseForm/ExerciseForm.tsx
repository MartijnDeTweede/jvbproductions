
import React, { useState } from 'react';

import './ExcerciseForm.css';
import { allowedValues, MusicTypes, LessonType, Difficulty } from '../../fixtures/AllowedValues';
import { Exercise } from '../../Containers/excersise';

export const ExerciseForm: React.FC<{
  submit: (event: Exercise) => void;
  selectedExercise?: Exercise;
  selectedLessonName: string;
}> = ({
  submit,
  selectedExercise = {
    id: 0,
    exerciseName: "",
    category: MusicTypes.Blues,
    lessonType: LessonType.Free,
    difficulty: Difficulty.Beginner,
    src: "",
    image: "",
    altText: "",
    cost: 0,
  },
  selectedLessonName,
}) => {

  const [lessonName, setLessonName ] = useState<string>(selectedLessonName);
  const [exerciseName, setExerciseName ] = useState<string>(selectedExercise.exerciseName);
  const [category, setCategory ] = useState<string>(selectedExercise.category);
  const [lessonType, setLessonType ] = useState<string>(selectedExercise.lessonType);
  const [difficulty, setDifficulty ] = useState<string>(selectedExercise.difficulty);
  const [src, setSrc ] = useState<string>(selectedExercise.src);
  const [image, setImage ] = useState<string>(selectedExercise.image);
  const [altText, setAltText ] = useState<string>(selectedExercise.altText);
  const [cost, setCost ] = useState<number>(selectedExercise.cost);

  return(
    <div>
      <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
          id: selectedExercise.id,
          lessonName,
          exerciseName,
          category,
          lessonType,
          difficulty,
          src,
          image,
          altText,
          cost
        }
        submit(payload);
        }}>
        <div>
          <label className="ExerciseForm__label" htmlFor="LessonName">LessonName</label>
          <input type="text" name="LessonName" defaultValue={lessonName} onBlur={(event) => setLessonName(event.target.value)}/>
        </div>
        <div>
        <label className="ExerciseForm__label"  htmlFor="ExerciseName">ExerciseName</label>
          <input type="text" name="ExerciseName" defaultValue={exerciseName} onBlur={(event) => setExerciseName(event.target.value)}/>
        </div>
        <label className="ExerciseForm__label"  htmlFor="Category">Category</label>
          <select className="ExerciseForm__Select" name="Category" defaultValue={category} onBlur={(event) => setCategory(event.target.value)}>
            {allowedValues.category.map(option => (<option value={option.value}>{option.text}</option>))}
          </select>
        <div>
        <label className="ExerciseForm__label"  htmlFor="LessonType">LessonType</label>
          <select className="ExerciseForm__Select" name="LessonType" defaultValue={lessonType} onBlur={(event) => setLessonType(event.target.value)}>
            {allowedValues.lessonType.map(option => (<option value={option.value}>{option.text}</option>))}
          </select>
        </div>
        <div>
        <label className="ExerciseForm__label"  htmlFor="Difficulty">Difficulty</label>
          <select className="ExerciseForm__Select" name="Difficulty" defaultValue={difficulty} onBlur={(event) => setDifficulty(event.target.value)}>
            {allowedValues.difficulty.map(option => (<option value={option.value}>{option.text}</option>))}
          </select>
        </div>
        <div>
        <label className="ExerciseForm__label"  htmlFor="Src">Src</label>
          <input type="text" name="Src" defaultValue={src} onBlur={(event) => setSrc(event.target.value)}/>
        </div>
        <div>
        <label className="ExerciseForm__label"  htmlFor="Image">Image</label>
          <input type="text" name="Image" defaultValue={image} onBlur={(event) => setImage(event.target.value)}/>
        </div>
        <div>
        <label className="ExerciseForm__label"  htmlFor="AltText">AltText</label>
          <input type="text" name="AltText" defaultValue={altText} onBlur={(event) => setAltText(event.target.value)}/>
        </div>
        <div>
        <label className="ExerciseForm__label"  htmlFor="Cost">Cost</label>
          <input type="number" min="0" step="1" name="Cost" defaultValue={cost.toString()} onBlur={(event) => setCost(parseInt(event.target.value))}/>
        </div>
        <input className="ExerciseForm__Submit" type="submit" value="Verzenden" />
      </form>
    </div>
  )
}