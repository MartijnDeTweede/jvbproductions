import { MusicTypes } from "../fixtures/AllowedValues";

export interface FilterValue {
  text: string;
  value: string;
  active: boolean;
}

export interface Filter {
  category: string;
  isExpended: boolean,
  setIsExpended: (isExpended:boolean) => boolean,
  title: string;
  values: FilterValue[];
}


export const defaultFilters: Filter[] = [
  {
    category: 'Difficulty',
    title: 'Moelijkheidsgraad',
    isExpended: false,
    setIsExpended: (isExpended: boolean) => (!isExpended),
    values: [
      {
        text: 'Beginner',
        value: '1',
        active: true,
      },
      {
        text: 'Gevorderd',
        value: '2',
        active: true,
      },
      {
        text: 'Expert',
        value: '3',
        active: true,
      },
      {
        text: 'Gitaar god',
        value: '4',
        active: true,
      }
    ]
  },
  {
    category: 'Category',
    title: 'Categorie',
    isExpended: false,
    setIsExpended: (isExpended: boolean) => (!isExpended),
    values: [
      {
        text: MusicTypes.Rock,
        value:  MusicTypes.Rock,
        active: true,
      },
      {
        text:  MusicTypes.Jazz,
        value: MusicTypes.Jazz,
        active: true,
      },
      {
        text: MusicTypes.Blues,
        value: MusicTypes.Blues,
        active: true,
      },
      {
        text: MusicTypes.Funk,
        value: MusicTypes.Funk,
        active: true,
      }
    ]
  }
]