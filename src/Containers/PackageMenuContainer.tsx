import React from 'react';
import { Package } from './Package';
import { PackageTile } from '../Components/Tile/PackageTile';
import { Exercise } from './excersise';
import { ExerciseTile } from '../Components/Tile/ExeriseTile';
import { Button, ButtonColors } from '../Components/Buttons/Button';
import { Wrapper } from '../Components/Wrapper/Wrapper';

  export const PackageMenuContainer: React.FC<{
    lessonData: Package[];
    exerciseData: Exercise[];
    selectedLesson: Package | undefined;
    selectExercise: (exercise: Exercise) => void;
    selectLesson: (lesson: Package) => void;
    handleBackButton: () => void;
    getImageLink: (imageName: string) => Promise<string | void>;
  }> = ({
    lessonData,
    exerciseData,
    selectedLesson,
    selectExercise,
    selectLesson,
    handleBackButton,
    getImageLink,
  }) => {    
    return (
      <div>
        {
          selectedLesson &&
          <Button 
            text="Terug naar Paketten"
            onClick={() => handleBackButton()}
            colour={ButtonColors.Gray}
          />
        }
          <Wrapper>
          {
            !selectedLesson ?
            lessonData.map(lesson => (
              <div key={`${lesson.song.artist}-${lesson.song.title}`}>
                <PackageTile lesson={lesson} selectLesson={selectLesson} getImageLink={getImageLink}/>
              </div>
            )) :
              exerciseData.map(exercise => (
                <div key={`${exercise.lessonName}-${exercise.exerciseName}`}>
                  <ExerciseTile exercise={exercise} selectExercise={selectExercise} getImageLink={getImageLink}/>
                </div>
              ))
          }            
          </Wrapper>
        </div>
    );
  }