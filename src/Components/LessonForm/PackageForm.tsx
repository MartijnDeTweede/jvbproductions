
import React, { useState } from 'react';

import './PackageForm.css';
import { Package } from '../../Containers/Package';
import { allowedValues, MusicTypes, LessonType, Difficulty } from '../../fixtures/AllowedValues';

export const PackageForm: React.FC<{
  submit: (event: Package) => void
  selectedLesson?: Package
}> = ({
  submit,
  selectedLesson = {
    id: 0,
    song: {
      artist: "",
      title: "",
    },
    category: MusicTypes.Blues,
    lessonType: LessonType.Free,
    difficulty: Difficulty.Beginner,
    src: "",
    image: "",
    altText: "",
    cost: 0,
  }
}) => {

  const [artist, setArtist ] = useState<string>(selectedLesson.song.artist);
  const [title, setTitle ] = useState<string>(selectedLesson.song.title);
  const [category, setCategory ] = useState<string>(selectedLesson.category);
  const [lessonType, setLessonType ] = useState<string>(selectedLesson.lessonType);
  const [difficulty, setDifficulty ] = useState<string>(selectedLesson.difficulty);
  const [src, setSrc ] = useState<string>(selectedLesson.src);
  const [image, setImage ] = useState<string>(selectedLesson.image);
  const [altText, setAltText ] = useState<string>(selectedLesson.altText);
  const [cost, setCost ] = useState<number>(selectedLesson.cost);

  return(
    <div>
      <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
          id: selectedLesson.id,
          song: {
            artist,
            title,
          },
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
          <label className="PackageForm__label" htmlFor="Artist">Artist</label>
          <input type="text" name="Artist" defaultValue={artist} onBlur={(event) => setArtist(event.target.value)}/>
        </div>
        <div>
        <label className="PackageForm__label"  htmlFor="Title">Title</label>
          <input type="text" name="Title" defaultValue={title} onBlur={(event) => setTitle(event.target.value)}/>
        </div>
        <label className="PackageForm__label"  htmlFor="Category">Category</label>
          <select className="PackageForm__Select" name="Category" defaultValue={category} onBlur={(event) => setCategory(event.target.value)}>
            {allowedValues.category.map(option => (<option value={option.value}>{option.text}</option>))}
          </select>
        <div>
        <label className="PackageForm__label"  htmlFor="LessonType">LessonType</label>
          <select className="PackageForm__Select" name="LessonType" defaultValue={lessonType} onBlur={(event) => setLessonType(event.target.value)}>
            {allowedValues.lessonType.map(option => (<option value={option.value}>{option.text}</option>))}
          </select>
        </div>
        <div>
        <label className="PackageForm__label"  htmlFor="Difficulty">Difficulty</label>
          <select className="PackageForm__Select" name="Difficulty" defaultValue={difficulty} onBlur={(event) => setDifficulty(event.target.value)}>
            {allowedValues.difficulty.map(option => (<option value={option.value}>{option.text}</option>))}
          </select>
        </div>
        <div>
        <label className="PackageForm__label"  htmlFor="Src">Src</label>
          <input type="text" name="Src" defaultValue={src} onBlur={(event) => setSrc(event.target.value)}/>
        </div>
        <div>
        <label className="PackageForm__label"  htmlFor="Image">Image</label>
          <input type="text" name="Image" defaultValue={image} onBlur={(event) => setImage(event.target.value)}/>
        </div>
        <div>
        <label className="PackageForm__label"  htmlFor="AltText">AltText</label>
          <input type="text" name="AltText" defaultValue={altText} onBlur={(event) => setAltText(event.target.value)}/>
        </div>
        <div>
        <label className="PackageForm__label"  htmlFor="Cost">Cost</label>
          <input type="number" min="0" step="1" name="Cost" defaultValue={cost.toString()} onBlur={(event) => setCost(parseInt(event.target.value))}/>
        </div>
        <input className="PackageForm__Submit" type="submit" value="Verzenden" />
      </form>
    </div>
  )
}