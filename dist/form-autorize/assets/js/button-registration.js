(function(){
  let form_autorize = document.getElementsByClassName('autorize')[0];
  let button_registration = form_autorize.getElementsByClassName('autorize_button_registration')[0]; 

  button_registration.addEventListener('click', () => {
    getResponse(url, { 
      headers: {
        'Content-Type': 'application/json;charset=utf=8',
        'get-form': 'form-registration'},
      method: 'POST'
    }).then(
      data => {
        content.innerHTML = data.html;
        data.js.forEach(item => {
          eval(item)
        })
      },
      error => { console.log(error);}
    );
  });
})();

