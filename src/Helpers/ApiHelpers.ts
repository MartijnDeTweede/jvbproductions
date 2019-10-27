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