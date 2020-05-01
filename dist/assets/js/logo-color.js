let logo_elems = document.getElementsByClassName('header_logo')[0].children;
logo_elems = Array.prototype.slice.call(logo_elems);
let logo_colors = ['#4B0082', '#8B008B', '#FF4500', '#FFA500', '#32CD32'];
for(let i = 0; i < logo_elems.length; i++){
  logo_elems[i].style.color= logo_colors[i];
};
