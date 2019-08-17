


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
}

// export const lessonsSet: LessonNew[] = [
//   {
//     song: {
//       artist: 'Gary Moore',
//       title: 'Still got the blues',
//     },
//     category: MusicTypes.Blues,
//     lessonType: LessonTypes.Free,
//     src: 'test_file_storage.mp4',
//   },
//   {
//     song: {
//       artist: 'Guns n Roses',
//       title: 'Sweet Child O Mine',
//     },
//     category: MusicTypes.Rock,
//     lessonType: LessonTypes.Free,
//     src: 'test_file_storage.mp4',
//   },
//   {
//     song: {
//       artist: 'Miles Davis',
//       title: 'Blues minor',
//     },
//     category: MusicTypes.Jazz,
//     lessonType: LessonTypes.Charged,
//     src: 'test_file_storage.mp4',
//   },
//   {
//     song: {
//       artist: 'Mothers Finest',
//       title: 'Baby love',
//     },
//     category: MusicTypes.Funk,
//     lessonType: LessonTypes.Charged,
//     src: 'test_file_storage.mp4',
//   }
// ]