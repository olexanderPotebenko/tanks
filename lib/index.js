
/* Использует глобальные методы. нужно это исправить и вынести класс в модуль */
class FormData {
  constructor(name, path, insertion_point){
    this.name = name;
    this.path = path;
    this.insertion_point = insertion_point;
  }

  async getAllCode(){

    let obj = {};
    obj.js = [];
    let promises = [];
    let path_files = getPathOfFilesInDir(this.path);
    let path_files_with_code = path_files.reduce((arr, item) => {
      path_files.forEach(item => console.log('path: ' + item));
      let extension = path.extname(item);
      if(extension == '.js' || extension == '.html' || extension == '.css'){
        arr.push(item);
      };

        return arr;
    }, []);

    path_files_with_code.forEach(path_str => {
      promises.push(getFileData(path_str, path.extname(path_str)));
    });

    return Promise.all(promises).then((data) => {
      for(let i = 0; i < data.length; i++){
        if(data[i].html){
          obj.html = data[i].html;
        }else if(data[i].js){
          obj.js.push(data[i].js);
        };
      };
      return obj;
    })
  }
}

class User {
  constructor(user_name, password){
    this.user_name = user_name;
    this.password = password;
  }
}

class Database{
  constructor(){
/*    throw 'attempt to create instance UserDatabase: this is abstract class!';*/
  }

  getBase(){
    return new Promise(resolve => {
      fs.readFile(this.path, 'utf-8', 
        (err, data) => {
          if(err)
            resolve(Promise.reject(err));
          else
            resolve(data);
        })
    })
  }

  async fileIsEmpty(){
    var buf = new Buffer(1024);

    return new Promise(res => {
      fs.open(this.path, 'r+', function(err, fd) {
      if (err) {
        return console.error(err);
      };

      fs.read(fd, buf, 0, 1024, 0, function(err, bytes){
        if (bytes == 0){
         console.log('hi'); 
          res(true); 
        }else res(false);
      })
    })
    })
  }

  getSizeBase() {
    return new Promise(resolve => {
      fs.stat(this.path, (err, stats) => {
        if (err) {
          console.error(err)
          resolve(Promise.reject(err));
        };
        resolve(stats.size) //1024000 //= 1MB
      });
    })
  }

  addToBase(data){
    fs.appendFile(this.path, data, (err) => {
      if(err) throw err;
      console.log('Data has been added!');
    });
  }
}

class UserBase extends Database {
  constructor(path){
    super();
    this.path = path;
  }

  async getBaseObject(){
    return this.getBase().then(
      res => {
        let obj = `{"data":"${res}"}`;
        obj = JSON.parse(obj);
        obj = JSON.stringify(obj);
        obj = JSON.parse(obj);
        return obj;
      },
      rej => { 
        console.log(rej);
        return rej;
      });
  }

  addUser(user){
    user = JSON.stringify(user);
    this.fileIsEmpty().then(
      res => {
        if(res){
          this.addToBase(user);
        }else{
          this.addToBase("," + user);
        }
      },
      error => console.log(error)
    );
  }
}
        

/* Подключаемые модули */
const http = require('http'); /*получаем модуль http*/
const fs = require('fs');/*получаем модуль работы с файлами*/
const path = require('path');

const server = http.createServer(); /*создаем сервер*/

/* Доступные формы */
const formAutorize = new FormData(
  'form-autorize',
  'dist/form-autorize',
  'content');
const formPlayersRoom = new FormData(
  'form-players-room',
  'dist/form-players-room',
  'content');
const formRegistration = new FormData(
  'form-registration',
  'dist/form-registration',
  'content');

const playersData = new UserBase('../dist/database/players-data.txt');

playersData.getBaseObject().then(res => console.log(res));
playersData.fileIsEmpty().then(res => console.log('file is empty: ' + res));
let user = new User('loh', 'aaaaaa');
playersData.addUser(user);
playersData.getBaseObject().then(res => console.log(res));



server.on('request', (req, res) => {

  assignAccessHeaders(req, res); /*Добавляем заголовки к ответу*/

  if(hasHeader(req, 'get-form')){

    let headerValue = getHeaderRequest(req, 'get-form');

    if(headerValue == 'form-autorize'){
     
      getBodyRequest(req)
        .then(data => {
        let user_data = data.user_data;
        return checkValidUserData(user_data);
      },
        error => {
          console.log(error);
          return error;
        })
      .then();
      
        
     formAutorize.getAllCode().then(data => {
       res.end(JSON.stringify(data));
     },
       error => console.log(error)
     );
      
    }else if(headerValue == 'form-registration'){
      formRegistration.getAllCode().then(data => {
        console.log(data);
        res.end(JSON.stringify(data));
      },
        error => console.log(error)
      );
      
    }else if (headerValue == 'form-players-room'){
      if(checkValidData()){
        formPlayersRoom.getAllCode().then(data => {
          res.end(JSON.stringify(data));
        },
          error => console.log(error)
        );
      }else{
        obj = formPlayersRoom.getAllCode();
        res.end('Authorization failed!!!');
      }
    }
  }else{
    if(req.url == '/'){
      res.writeHead(200, {'Content-Type': 'text/html'});
      let html = fs.readFileSync('dist' + req.url + 'index.html');
      res.end(html);
    }else if(path.extname(req.url) == '.css'){
      res.writeHead(200, {'Content-Type': 'text/css'});
      let css = fs.readFileSync('dist' + req.url);
      res.end(css);
    }else if(path.extname(req.url) == '.js'){
      res.writeHead(200, {'Content-Type': 'text/js'});
      let js = fs.readFileSync('dist' + req.url);
      res.end(js);
    }else if(path.extname(req.url) == '.ttf'){
      res.writeHead(200, {'Content-Type': 'font/ttf'});
      let js = fs.readFileSync('dist' + req.url);
      res.end(js);
    }else{
      res.end('hz');
    };
  };

}); /*подписываемся на соытие request, назначаем callback*/

server.listen(3000, '127.0.0.1', () => {
  console.log('Server run');
});

function assignAccessHeaders(req, res){

  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method == 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    /*    res.setHeader('Content-Type', 'text/plain charset=UTF-8');*/
    res.setHeader('Access-Control-Allow-Headers', '*');
  };
}

function hasHeader(req, header){
  let headers = req.headers;
  for(let key in headers){
    if(key == header) return true;
  };
  return false;
}

function getHeaderRequest(req, key){
  let headers = req.headers;
  for(let item_key in headers){
    if(item_key == key){ 
      return headers[item_key];
    };
  };
  return -1;
}

async function getBodyRequest(req){

  let data = []
  if (req.method == 'POST'){
    req.on('data', chunk => {
      data.push(chunk)
    })
    req.on('end', () => {
      return JSON.parse(data).user_name;
    });
  }else 
    return data;
}

function checkValidData(data){
  console.log(data + ': checkValidData');
  return true;
}

async function getFileData(path, extension){
  return new Promise(resolve => {
    fs.readFile(path, 'utf-8', 
      (err, data) => {
        resolve(err? err: {[extension.slice(1)]: data});
      })
  })
}

/* метод получает пути ко всем файлам. Наверное не очень хорошо, что он синхронный */
function getPathOfFilesInDir(dir, files_){
    
  files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getPathOfFilesInDir(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
};


