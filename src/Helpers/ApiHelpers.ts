const baseUrl = 'http://localhost:65422/api/';

export const requestAccesToVideo = (userId: string, lessonName: string)=> {
  const url = `${baseUrl}lesson/RequestLessonAccess?userId=${userId}&lessonName=${lessonName}`;
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


export const getAllLessons = ()=> {
  console.log('getAllLessons:');
  const url = `${baseUrl}lesson/GetAllLessons`;
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