(function () {
  let form_autorize = document.getElementsByClassName('autorize')[0];
  console.log(form_autorize.innerHTML);
  let input_user_name = form_autorize.getElementsByTagName('input')[0];
  let input_password = form_autorize.getElementsByTagName('input')[1];
  let button = form_autorize.getElementsByTagName('button')[0];
  let valid_user_name = form_autorize.getElementsByClassName('autorize_input_valid')[0];
  let valid_password = form_autorize.getElementsByClassName('autorize_input_valid')[1];
  let user_name = '';
  let password = '';

  button.addEventListener('click', () => {

    let options = {};
    options.headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'get-form': 'form-players-room'};

    options.body = JSON.stringify({user_name: user_name, date: new Date()}); 
    options.method = 'POST';

    console.log(options.body);

    getResponse(url, options).then(
      data => {
        console.log(data);
        content.innerHTML = data.html;
        data.js.forEach(item => {
          eval(item)
        })
      },
      error => { console.log(error);}
    )
  });

  

})();
