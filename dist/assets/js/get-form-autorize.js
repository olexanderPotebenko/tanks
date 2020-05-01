getResponse(url, { headers: { 'get-form': 'form-autorize'}, method: 'POST' }) 
  .then(
  res => {
    content.innerHTML = res.html;
    res.js.forEach(item => {
      eval(item);
    });
  },
  rej => {
    console.log('Something went wrong!!!' + rej);
  });

