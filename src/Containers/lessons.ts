import { Source, VideoSourceType } from "react-video-play";


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
  category: MusicTypes,
  lessonType: LessonTypes,
  src: Source [],
}

export const lessonsSet: LessonNew[] = [
  {
    song: {
      artist: 'Gary Moore',
      title: 'Still got the blues',
    },
    category: MusicTypes.Blues,
    lessonType: LessonTypes.Free,
    src: [{
      name: 'Still got the blues',
      source: [{
        source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4',
        type: VideoSourceType.video_mp4
      }, {
        source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm',
        type: VideoSourceType.video_webm
      }, {
        source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.ogv',
        type: VideoSourceType.video_ogg
      }]     
    }]
  },
  {
    song: {
      artist: 'Guns n Roses',
      title: 'Sweet Child O Mine',
    },
    category: MusicTypes.Rock,
    lessonType: LessonTypes.Free,
    src: [{
      name: 'Sweet Child O Mine',
      source: [{
        source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4',
        type: VideoSourceType.video_mp4
      }, {
        source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm',
        type: VideoSourceType.video_webm
      }, {
        source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.ogv',
        type: VideoSourceType.video_ogg
      }]     
    }]
  },
  {
    song: {
      artist: 'Miles Davis',
      title: 'Blues minor',
    },
    category: MusicTypes.Jazz,
    lessonType: LessonTypes.Charged,
    src: [{
      name: 'Blues minor',
      source: [{
        source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4',
        type: VideoSourceType.video_mp4
      }, {
        source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm',
        type: VideoSourceType.video_webm
      }, {
        source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.ogv',
        type: VideoSourceType.video_ogg
      }]     
    }]
  },
  {
    song: {
      artist: 'Mothers Finest',
      title: 'Baby love',
    },
    category: MusicTypes.Funk,
    lessonType: LessonTypes.Charged,
    src: [{
      name: 'Still got the blues',
      source: [{
        source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4',
        type: VideoSourceType.video_mp4
      }, {
        source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm',
        type: VideoSourceType.video_webm
      }, {
        source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.ogv',
        type: VideoSourceType.video_ogg
      }]     
    }]
  }
]