//    ГЕНЕРАЦИЯ ТАБЛИЦЫ
'use strict';
var X = 40, Y = 40;
let background = "#090909";
let tBody = document.body.getElementsByTagName('tbody')[0];
let arrDotBarriers = {x: [], y: []};
function tableGen(){
  for(let i = 0; i <= Y; i++){ 
    var line = tBody.appendChild(document.createElement('tr'));
    for(let j = 0; j <= X; j++){
      line.appendChild(document.createElement('td'))
    };
  };

  for(let i = 6; i <= 34; i++){
    arrDotBarriers.x.push(i);
    arrDotBarriers.y.push(6);
    arrDotBarriers.x.push(i);
    arrDotBarriers.y.push(34);
    tBody.rows[6].cells[i].style.background = 'green';
    tBody.rows[34].cells[i].style.background = 'green';
  };
}

function tableDrow(){
  for(let i = 0; i <= Y; i++){ 
    for(let j = 0; j <= X; j++){
      tBody.rows[i].cells[j].style.background = "black";
    };
  };

  for(let i = 6; i <= 34; i++){
    tBody.rows[6].cells[i].style.background = 'green';
    tBody.rows[34].cells[i].style.background = 'green';
  };
};

tableGen();
