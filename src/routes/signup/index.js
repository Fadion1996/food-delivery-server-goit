const qs = require('querystring');
const fs = require("fs");
let path = '';



const saveUser = user => {
  let dir = './src/db/users/';
  !fs.existsSync(dir) && fs.mkdirSync(dir);

  path = `./src/db/users/${user.user.username}.txt`;
  fs.writeFile(path, JSON.stringify(user), ()=> {
      console.log(`Write file: ${user.user.username}.txt`);
  });
  
  // получить файл с юзером
  // найти путь папки users
  // сохранить туда файл
};

const signupRoute = (request, response) => {
  // Взять данные что пришли

  if (request.method === 'POST') {
    let body = '';
    request.on('data', data => {
      body = body + data;
      const parseBody = JSON.parse(body);
      
      const result = {
        status: 'success',
        user: {
          username: parseBody.username,
          telephone: parseBody.telephone,
          password:  parseBody.password,
          email: parseBody.email,
        }
      };
      responseUser(result);
      saveUser(result);
    });

    request.on('end', () => {
      const post = qs.parse(body);
    });
  }

  responseUser = (userData) => {
    const userName = userData.user.username;
    fs.writeFile(`./src/db/users/${userName}.json`, JSON.stringify(userData), (err, data) => {
      response.writeHead(200, {"Content-Type": "application/json"});
      response.end(JSON.stringify(userData));
    })
  }
  
  // Взять username с данных, сохранить в переменную

  // Сохраняем данные в <username>.json

  // Сохранить <username>.json в папку users

  // Отправляем файл в ответе с данными юзера
  // использовать response
    
};

module.exports = signupRoute;