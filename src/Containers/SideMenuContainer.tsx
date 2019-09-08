import React, { useState } from 'react';
import { LessonNew } from './lessons';
import { LessonList } from '../Components/LessonList/LessonList';
import { SideMenuControlPanel } from '../Components/SideMenuControlPanel/SideMenuControlPanel';
import { defaultFilters } from './filters';

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

export const updateValueForFilter = (filter: Filter, value: string): Filter => {
  return ({
    ...filter,
    values: filter.values.reduce((newValues: FilterValue[], currentVale: FilterValue) => {
      return currentVale.value === value ? [...newValues, {...currentVale, active:!currentVale.active}] : [...newValues, currentVale]
    }, [])
  })
}

export const filterLessons = (lessonData: LessonNew[], filters: Filter[]) : LessonNew[] => {
  const relevantFilters = filters.filter(filter => filter.values.some(value => !value.active));

  if(relevantFilters.length === 0) {
    return lessonData;
  }

  const newLessonData = relevantFilters.reduce((filteredLessonData: LessonNew[], currentFilter: Filter) => {
    switch(currentFilter.category) {
      case "Difficulty" : {
        return filteredLessonData.filter(lesson => {
          const currentValue = currentFilter.values.find(value => value.value === lesson.difficulty)
          return currentValue ? currentValue.active : true;
        });
      }
      case "Category" : {
        return filteredLessonData.filter(lesson => {
          const currentValue = currentFilter.values.find(value => value.value === lesson.category)
          return currentValue ? currentValue.active : true;
        });
      }
      default: {
        break;
      }
    }
    return filteredLessonData;
  }, lessonData);

  return newLessonData;
}

export const SideMenuContainer: React.FC<{
  selectLesson: (lesson: LessonNew) => void;
  lessonData: LessonNew[]
}> = ({selectLesson, lessonData}) => {

  const [activeFilters, setActiveFilters] = useState<Filter[]>(defaultFilters);

  const updateFilters = (category: string, newValue: string) => {
    const newFilters = activeFilters.reduce((accumulatedFilters: Filter[], currentFilter: Filter) => {
      return currentFilter.category === category ? [...accumulatedFilters,updateValueForFilter(currentFilter, newValue)] : [...accumulatedFilters, currentFilter]
    }, []);

    setActiveFilters(newFilters)
  }

  return (
    <div>
      <SideMenuControlPanel updateFilters={updateFilters} activeFilters={activeFilters} />
      <LessonList selectLesson={selectLesson} lessonData={filterLessons(lessonData, activeFilters)} />
    </div>
  )
}