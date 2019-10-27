
interface Song {
  artist: string;
  title: string;
}

export interface LessonNew {
  song: Song;
  category: string;
  lessonType: string;
  difficulty: string;
  src: string;
  image: string;
  altText: string;
  cost: number;
}
