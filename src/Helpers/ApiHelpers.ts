import { Package } from "../Containers/Package";
import { Exercise } from "../Containers/excersise";

const baseUrl = 'http://localhost:65422/api/';

export const requestAccesToVideo = (userId: string, videoName: string)=> {
  const url = `${baseUrl}lesson/RequestLessonAccess/${userId}/${videoName}`;
  const result =  fetch(url, {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
})
.then(response => {
  return response.json()
}
  );
return result;
}

export const buyResourceAccess = (userId: string, lessonName: string)=> {
  const payload = {userId: userId,lessonName: lessonName };
  const url = `${baseUrl}user/buyResource`;
  const result =  fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: JSON.stringify(payload)
})
.then(response => {
  return response.json()
}
  );
return result;
}

export const getAllLessons = async() => {
  const url = `${baseUrl}lesson/getAllLessons`;
  const result =  await fetch(url, {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
})
.then(response => {
  return response.json()
}
  );
return result;
}

export const getExcersisesForLesson = async(lessonName: string) => {
  const url = `${baseUrl}lesson/GetExcersisesForLesson/${lessonName}`;
  const result =  await fetch(url, {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
})
.then(response => {
  return response.json()
}
  );
return result;
}


export const fetchUserInfo = async(userId: string) => {
  const url = `${baseUrl}user/getUser/${userId}`;
  const result =  await fetch(url, {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
})
.then(response => {
  return response.json()
}
  );
return result;
}

export interface PackageWithCredentials {
  package: Package,
  userId: string;
}

export const submitInsertLesson = async(payload: PackageWithCredentials) => {
  const url = `${baseUrl}admin/addLesson`;
  const result =  fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: JSON.stringify(payload)
})
.then(response => {
  return response.json()
}
  );
return result;
}

export interface ExerciseWithCredentials {
  exercise: Exercise,
  userId: string;
}


export const submitInsertExercise = async(payload: ExerciseWithCredentials) => {
  const url = `${baseUrl}admin/addExercise`;
  const result =  fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: JSON.stringify(payload)
})
.then(response => {
  return response.json()
}
  );
return result;
}

export const submitUpdateLesson = async(payload: PackageWithCredentials) => {
  const url = `${baseUrl}admin/updateLesson`;
  const result =  fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: JSON.stringify(payload)
})
.then(response => {
  return response.json()
}
  );
return result;
}

export const submitDeleteLesson  = async(payload: PackageWithCredentials) => {
  const url = `${baseUrl}admin/deleteLesson`;
  const result =  fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: JSON.stringify(payload)
})
.then(response => {
  return response.json()
}
  );
return result;
}