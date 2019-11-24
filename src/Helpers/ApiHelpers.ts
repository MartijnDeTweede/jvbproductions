import { Package } from "../Containers/Package";
import { Exercise } from "../Containers/excersise";

const baseUrl = 'http://localhost:65422/api/';

export const requestAccesToVideo = (userId: string, videoName: string)=> {
  const url = `${baseUrl}lesson/RequestResourceAccess/${userId}/${videoName}`;
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

export const getAllPackages = async() => {
  const url = `${baseUrl}lesson/getAllPackages`;
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

export const GetExcersisesForPackage = async(packageName: string) => {
  const url = `${baseUrl}lesson/GetExcersisesForPackage/${packageName}`;
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

export const getProductsByCategory = async(category: string) => {
  const url = `${baseUrl}products/getProductsForCategory/${category}`;
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

export const submitAddPackage = async(payload: PackageWithCredentials) => {
  const url = `${baseUrl}admin/addPackage`;
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


export const submitAddExercise = async(payload: ExerciseWithCredentials) => {
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

export const submitUpdatePackage = async(payload: PackageWithCredentials) => {
  const url = `${baseUrl}admin/updatePackage`;
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

export const submitUpdateExercise = async(payload: ExerciseWithCredentials) => {
  const url = `${baseUrl}admin/updateExercise`;
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

export const submitDeletePackage  = async(payload: PackageWithCredentials) => {
  const url = `${baseUrl}admin/deletePackage`;
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

export const submitDeleteExercise  = async(payload: ExerciseWithCredentials) => {
  const url = `${baseUrl}admin/deleteExercise`;
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