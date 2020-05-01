(function () {
  let form_registration = document.getElementsByClassName('registration')[0];
  let input_user_name = form_registration.getElementsByTagName('input')[0];
  let input_password = form_registration.getElementsByTagName('input')[1];
  let button = form_registration.getElementsByTagName('button')[0];
  let valid_user_name = form_registration.getElementsByClassName('registration_input_valid')[0];
  let valid_password = form_registration.getElementsByClassName('registration_input_valid')[1];
  let user_name = '';
  let password = '';

  input_user_name.addEventListener('input', function(){
    checkValidUserName(this.value);
    user_name = this.value;
  });
  input_password.addEventListener('input', function(){
    checkValidPassword(this.value);
    password = this.value;
  });

  button.addEventListener('click', () => {

    if(checkValidUserName(user_name) && checkValidPassword(password)){
    let options = {};
    options.headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'get-form': 'form-players-room'};

    options.body = JSON.stringify({user_name: user_name, date: new Date()}); 
    options.method = 'POST';

    getResponse(url, options).then(
      data => {
        content.innerHTML = data.html;
        data.js.forEach(item => {
          eval(item)
        })
      },
      error => { console.log(error);}
    )
    }else{

    };
  });

  function checkValidPassword(user_name){
    if(user_name.length < 6){
      valid_password.innerHTML = '<div>password cannot be <br>less than six symbols!</div>';
      return false;
    }else{
      valid_password.innerHTML = '';
      return true;
    };
  };

  function checkValidUserName(password){
    if(password.length < 6){
      valid_user_name.innerHTML = '<div> user name cannot be <br>less than six symbols!<div>';
      return false;
    }else{
      valid_user_name.innerHTML = '';
      return true;
    };
  };

})();
