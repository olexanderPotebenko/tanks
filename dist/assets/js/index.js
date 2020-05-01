const content = document.getElementsByClassName('content')[0];
const url = 'http://127.0.0.1:3000';


async function getResponse(url, options){
  let res = await fetch(url, options);
  if(res.ok){
    let json = await res.json();
    return json;
  }else{
    console.log('ERROR HTTP: ' + res.status);
    return res.status;
  };
}

