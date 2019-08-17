


export enum LessonTypes {
  Free = 'Free',
  Charged = 'Charged'
}

export enum MusicTypes {
  Jazz = 'Jazz',
  Blues = 'Blues',
  Funk = 'Funk',
  Rock = 'Rock',
}

interface Song {
  artist: string,
  title: string,
}

export interface LessonNew {
  song: Song,
  category: string,
  lessonType: string,
  src: string,
  const: number;
}
