const baseUrl = 'http://localhost:65422/api/';

export const requestAccesToVideo = (userId: string, lessonName: string)=> {
  const url = `${baseUrl}lesson/RequestLessonAccess?userId=${userId}&lessonName=${lessonName}`;
  const result =  fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors',
    credentials: 'same-origin',
    // headers: {
    //     // 'Content-Type': 'application/json',
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    // },
})
.then(response => {
  console.log('response: ', response);
  response.json()

}
  ); // parses JSON response into native JavaScript objects 
return false;
}