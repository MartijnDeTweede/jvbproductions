export enum MusicTypes {
  Jazz = 'Jazz',
  Blues = 'Blues',
  Funk = 'Funk',
  Rock = 'Rock',
}

export enum Difficulty {
  Beginner = "Beginner",
  Gevorderd = "Gevorderd",
  Expert = "Exprt",
  GitaarGod = 'Gitaar God'
}

export enum LessonType {
  Free = 'Free',
  Charged = 'Charged',
}

interface ValueText {
  value: string;
  text: string;
}

interface AllowedValues {
  lessonType: ValueText [];
  category: ValueText [];
  difficulty: ValueText [];
}

export const  allowedValues: AllowedValues = {
  lessonType: [
    {
      value: LessonType.Free,
      text: LessonType.Free,    
    },
    {
      value: LessonType.Charged,
      text:  LessonType.Charged,
    },
  ],
  category: [
    {
      value: MusicTypes.Jazz,
      text: MusicTypes.Jazz,  
    },
    {
      value: MusicTypes.Blues,
      text: MusicTypes.Blues,
    },
    {
      value: MusicTypes.Funk,
      text: MusicTypes.Funk,    
    },
    {
      value: MusicTypes.Rock,
      text: MusicTypes.Rock,
    },
  ],
  difficulty: [
    {
      value: Difficulty.Beginner,
      text: Difficulty.Beginner,  
    },
    {
      value: Difficulty.Gevorderd,
      text: Difficulty.Gevorderd,
    },
    {
      value: Difficulty.Expert, 
      text: Difficulty.Expert,    
    },
    {
      value: Difficulty.GitaarGod,
      text: Difficulty.GitaarGod,
    },
  ]
}